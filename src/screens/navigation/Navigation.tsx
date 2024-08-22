import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { DeviceMotion, Magnetometer } from "expo-sensors";

import { routes } from "@/router/routes";
import { t } from '@/locales/i18n';
import { layout } from "@/styles/layout";
import { colors } from "@/styles/colors";
import { WaypointTypeStages } from "@/models/waypointType";
import { StageChange } from "@/models/neighbor";
import { getShortestPathQuery } from "@/dataaccess/getShortestPath";
import { getWaypointQuery } from "@/dataaccess/getWaypoint";
import NavigateIcon from "@/components/NavigateIcon";
import QrScanner from "@/components/QrScanner";
import Loader from "@/components/Loader";
import { useMagnetometer } from "@/hooks/useMagnetometer";
import { useLazyCypher } from "@/hooks/useLazyCypher";
import { usePermission } from "@/hooks/usePermission";
import { useDeviceGravityAcceleration, GRAVITY_ACCELERATION } from "@/hooks/useDeviceGravityAcceleration";
import { useNavigationContext } from "@/context/navigationContext";

const ACC_THRESHOLD = 1;

export default function Navigation() {
    const navigation = useNavigation();
    const { navigationCtx, setPath } = useNavigationContext();
    const [waypointResult, waypointError, waypointLoading, runWaypointQuery] = useLazyCypher();
    const [pathResult, pathError, pathLoading, runPathQuery] = useLazyCypher();
    const magnetometer = useMagnetometer();
    const [motionPermission, requestMotionPermission] = usePermission(DeviceMotion);
    const [magnetometerPermission, requestMagnetometerPermission] = usePermission(Magnetometer);
    const { z } = useDeviceGravityAcceleration();
    const [orientation, setOrientation] = useState<number | undefined>(undefined);
    const [stage, setStage] = useState<StageChange | undefined>(undefined);
    const [fakeLoading, setFakeLoading] = useState(false);
    const [idScanned, setIdScanned] = useState("");
    const [idPath, setIdPath] = useState(0);

    const handleScan = (result: string) => {
        if (!result) {
            console.error("QR code is empty");
            return;
        }
        if (idScanned === result) return;

        setIdScanned(result);

        if (result === navigationCtx.end.id) {
            console.log("Destination reached");

            navigation.navigate(routes.END);
            return;
        }

        if (result === navigationCtx.path[idPath].end.properties.id) {
            setIdPath(idPath + 1)
            makeFakeLoading();
        } else {
            const foundWaypoint = navigationCtx.path.find((path) => path.end.properties.id === result);
            if (foundWaypoint) {
                setIdPath(navigationCtx.path.indexOf(foundWaypoint));
                makeFakeLoading();
            } else {
                const waypointQuery = getWaypointQuery(result);
                runWaypointQuery(waypointQuery.query, waypointQuery.params);
            }
        }
    };

    const makeFakeLoading = () => {
        setFakeLoading(true);
        setTimeout(() => {
            setFakeLoading(false);
        }, 300);
    };

    useEffect(() => {
        if (!navigationCtx) {
            console.error("Navigation context is not set");
            navigation.navigate(routes.HOME);
        }

        if (!motionPermission?.granted) {
            requestMotionPermission();
        }
        if (!magnetometerPermission?.granted) {
            requestMagnetometerPermission();
        }

        if (process.env.EXPO_PUBLIC_VERBOSE || false) {
            console.log("NAVIGATION");
            navigationCtx.path.forEach((path) => {
                console.log("=============NEXT POINT=============")
                console.log("  -",path.start.properties);
                console.log("  -",path.relationship.properties);
                console.log("  -",path.end.properties);
            });
        } else {
            console.log("PATH :");
            console.log("  -",navigationCtx.start.id);
            navigationCtx.path.forEach((path) => {
                console.log("  -",path.end.properties.id);
            });
        }
    }, []);
    useEffect(() => {
        if (!orientation) return;
        if (z + GRAVITY_ACCELERATION > ACC_THRESHOLD) {
            Toast.show(t("toast.holdPhoneHorizontally"), {
                position: Toast.positions.CENTER,
                duration: Toast.durations.SHORT,
            });
        }
    }, [z]);
    useEffect(() => {
        const path = navigationCtx.path[idPath];
        if (WaypointTypeStages.includes(path.start.properties.type) && WaypointTypeStages.includes(path.end.properties.type)) {
            setStage(path.relationship.properties.stage);
            setOrientation(undefined);
        } else {
            setOrientation(path.relationship.properties.orientation)
            setStage(undefined);
        }
    }, [idPath, navigationCtx.path]);
    useEffect(() => {
        if (!idScanned) return;

        if (!waypointResult || waypointResult.length === 0) {
            console.log("Waypoint doesn't exist");
            Toast.show(t("toast.waypointDoesNotExist"), {
                position: Toast.positions.CENTER,
            });
            return;
        }

        const waypoint = waypointResult[0]._fields[0].properties;
        if (waypoint.id === navigationCtx.end.id) {
            console.log("Destination reached");

            navigation.navigate(routes.END);
            return;
        }

        if (waypoint.id === navigationCtx.path[idPath].end.properties.id) {
            setIdPath(idPath + 1)
        } else {
            console.log("Wrong QR code scanned");

            const query = getShortestPathQuery(waypoint.id, navigationCtx.end.id);
            runPathQuery(query.query, query.params);
        }
    }, [waypointResult]);
    useEffect(() => {
        if (!idScanned) return;

        const path = !pathResult || pathResult.length > 0 ? pathResult[0]._fields[0].segments : [];
        if (!path || path.length === 0) {
            console.error("Path doesn't exist");
            Toast.show(t("toast.pathDoesNotExists"), {
                position: Toast.positions.CENTER,
            });
            return;
        }

        setPath(path);
        setIdPath(0);
    }, [pathResult]);
    useEffect(() => {
        const error = waypointError || pathError;
        if (error) {
            if (error.code === "ServiceUnavailable") {
                console.log("Database is unavailable");
                Toast.show(t("toast.databaseUnavailable"), {
                    position: Toast.positions.CENTER,
                });
                navigation.navigate(routes.HOME);
            } else {
                console.error("Error while fetching waypoint :", error);
                Toast.show(t("toast.waypointDoesNotExist"), {
                    position: Toast.positions.CENTER,
                });
            }
        }
    }, [waypointError, pathError]);

    if (orientation || stage) {
        return (
            <View style={styles.container}>
                <Loader loading={waypointLoading || pathLoading || fakeLoading}/>
                <QrScanner
                    instructions={t("instructions.navigation")}
                    handleScan={handleScan}
                />
                {orientation && (
                    <NavigateIcon
                        orientation={orientation}
                        color={colors.blue}
                        magnetometerAngle={magnetometer}
                    />
                )}
                {stage && (
                    <View style={styles.stageInstructions}>
                        {stage === StageChange.UP ? (
                            <Text>Montez d'un étage</Text>
                        ) : (
                            <Text>Descendez d'un étage</Text>
                        )}
                    </View>
                )}
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Loader loading={true}/>
                <QrScanner
                    instructions={t("instructions.navigation")}
                    handleScan={() => {}}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    stageInstructions: {
        position: 'absolute',
        bottom: 80,
        width: '70%',
        height: 60,
        backgroundColor: colors.gray,
        borderRadius: layout.borderRadius.small,
        padding: layout.padding,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
