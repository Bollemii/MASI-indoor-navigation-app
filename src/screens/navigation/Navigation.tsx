import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { routes } from "@/router/routes";
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
import { useNavigationContext } from "@/context/navigationContext";
import { layout } from "@/styles/layout";

export default function Navigation() {
    const navigation = useNavigation();
    const { navigationCtx, setPath } = useNavigationContext();
    const [waypointResult, waypointLoading, runWaypointQuery] = useLazyCypher();
    const [pathResult, pathLoading, runPathQuery] = useLazyCypher();
    const magnetometer = useMagnetometer();
    const [orientation, setOrientation] = useState<number | undefined>(undefined);
    const [stage, setStage] = useState<StageChange | undefined>(undefined);
    const [idScanned, setIdScanned] = useState("");
    const [id, setId] = useState(0);

    const handleScan = (result) => {
        if (!result.data) {
            console.error("QR code is empty");
            return;
        }

        setIdScanned(result.data);

        const waypointQuery = getWaypointQuery(result.data);
        runWaypointQuery(waypointQuery.query, waypointQuery.params);
    };

    useEffect(() => {
        if (!navigationCtx) {
            console.error("Navigation context is not set");
            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.home);
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
        const path = navigationCtx.path[id];
        if (WaypointTypeStages.includes(path.start.properties.type) && WaypointTypeStages.includes(path.end.properties.type)) {
            setStage(path.relationship.properties.stageChange);
            setOrientation(undefined);
        } else {
            setOrientation(path.relationship.properties.orientation)
            setStage(undefined);
        }
    }, [id, navigationCtx.path]);
    useEffect(() => {
        if (!idScanned) return;

        if (!waypointResult || waypointResult.length === 0) {
            console.log("Waypoint doesn't exist");
            return;
        }

        const waypoint = waypointResult[0]._fields[0].properties;
        if (waypoint.id === navigationCtx.end.id) {
            console.log("Destination reached");

            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.navigation.end);
            return;
        }

        if (waypoint.id !== navigationCtx.path[id].end.properties.id) {
            console.log("Wrong QR code scanned");
            
            const query = getShortestPathQuery(waypoint.id, navigationCtx.end.id);
            runPathQuery(query.query, query.params);
        } else {
            setId(id + 1)
        }
    }, [waypointResult]);
    useEffect(() => {
        if (!idScanned) return;

        const path = pathResult[0]._fields[0].segments
        if (!path || path.length === 0) {
            console.error("Path doesn't exist");
            Toast.show("Il n'y a pas de chemin entre le point de départ et la destination", {
                position: Toast.positions.CENTER,
            });
            return;
        }

        setPath(path);
        setId(0);
    }, [pathResult]);

    if (orientation) {
        return (
            <View style={styles.container}>
                <Loader loading={waypointLoading || pathLoading}/>
                <QrScanner
                    instructions="Suivez les indications.\nScannez le QR code du prochain point de passage."
                    handleScan={handleScan}
                />
                <NavigateIcon
                    orientation={orientation}
                    color={colors.blue}
                    magnetometerAngle={magnetometer}
                />
            </View>
        );
    } else if (stage) {
        return (
            <View style={styles.container}>
                <Loader loading={waypointLoading || pathLoading}/>
                <QrScanner
                    instructions="Suivez les indications.\nScannez le QR code du prochain point de passage."
                    handleScan={handleScan}
                />
                <View style={styles.stageInstructions}>
                    {stage === StageChange.UP ? (
                        <Text>Montez d'un étage</Text>
                    ) : (
                        <Text>Descendez d'un étage</Text>
                    )}
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Loader loading={true}/>
                <QrScanner
                    instructions="Suivez les indications.\nScannez le QR code du prochain point de passage."
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
