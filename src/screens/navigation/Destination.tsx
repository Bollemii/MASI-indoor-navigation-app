import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-root-toast";

import { routes } from "@/router/routes";
import { i18n } from '@/locales/i18n';
import { colors } from "@/styles/colors";
import { fonts } from '@/styles/fonts';
import { layout } from "@/styles/layout";
import { Waypoint } from "@/models/waypoint";
import { getNavigableWaypointsQuery } from "@/dataaccess/getNavigabledWaypoints";
import { getShortestPathQuery } from "@/dataaccess/getShortestPath";
import BackButton from "@/components/BackButton";
import NextButton from "@/components/NextButton";
import Loader from "@/components/Loader";
import { useLazyCypher } from "@/hooks/useLazyCypher";
import { useNavigationContext } from "@/context/navigationContext";

export default function Destination() {
    const navigation = useNavigation();
    const { navigationCtx, setPath, setEnd } = useNavigationContext();
    const [waypointsResult, waypointsLoading, runWaypointsQuery] = useLazyCypher();
    const [pathResult, pathLoading, runPathQuery] = useLazyCypher();
    const [destination, setDestination] = useState("");
    const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

    const handlePress = () => {
        if (!destination) {
            console.error("Destination is not set");
            Toast.show(i18n.t("toast.destinationIsNotSet"), {
                position: Toast.positions.CENTER,
            });
            return;
        }

        const end = waypoints.find((waypoint) => waypoint.id === destination);
        if (!end) {
            console.error("Destination is not found");
            Toast.show(i18n.t("toast.destinationDoesNotExist"), {
                position: Toast.positions.CENTER,
            });
            return;
        }

        if (destination === navigationCtx.start.id) {
            console.error("Destination is the same as the start");
            Toast.show(i18n.t("toast.cannotChooseWaypoint"), {
                position: Toast.positions.CENTER,
            });
            return;
        }

        setEnd(end);

        const query = getShortestPathQuery(navigationCtx.start.id, end.id);
        runPathQuery(query.query, query.params);
    }

    useEffect(() => {
        if (!navigationCtx || !navigationCtx.start) {
            console.error("Navigation context is not set");
            navigation.navigate(routes.HOME);
            return;
        }

        const query = getNavigableWaypointsQuery();
        runWaypointsQuery(query.query, query.params);
    }, []);
    useEffect(() => {
        if (waypointsResult && waypointsResult.length > 0) {
            const waypointsTmp = waypointsResult
                .map((waypoint: any) => {
                    return waypoint._fields[0].properties as Waypoint;
                })
                .filter((waypoint: Waypoint) => waypoint.id !== navigationCtx.start.id)
                .sort((a: Waypoint, b: Waypoint) => a.name.localeCompare(b.name));

            if (waypointsTmp.length === 0) {
                console.log("Navigation is not available because there are no waypoints");
                Toast.show(i18n.t("toast.navigationIsNotAvailable"), {
                    position: Toast.positions.CENTER,
                });
                navigation.navigate(routes.HOME);
                return;
            }

            setWaypoints(waypointsTmp);
            setDestination(waypointsTmp[0].id);
        }
    }, [waypointsResult]);
    useEffect(() => {
        if (pathResult && pathResult.length > 0) {
            const path = pathResult[0]._fields[0].segments
            if (!path || path.length === 0) {
                console.error("Path doesn't exist");
                Toast.show(i18n.t("toast.pathDoesNotExist"), {
                    position: Toast.positions.CENTER,
                });
                return;
            }
            setPath(path);

            navigation.navigate(routes.NAVIGATION);
        }
    }, [pathResult]);

    if (waypoints.length === 0) return null;
    return (
        <View style={styles.container}>
            <Loader loading={waypointsLoading || pathLoading}/>
            <BackButton text={i18n.t("quit")} pageRedirect={routes.HOME}/>
            <Text style={styles.title}>{i18n.t("destination")}</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{i18n.t("theDestination")}</Text>
                <Picker
                    style={styles.input}
                    selectedValue={destination}
                    onValueChange={(value) => setDestination(value)}
                >
                    {waypoints.map((waypoint) => {
                        return <Picker.Item key={waypoint.id} label={waypoint.name} value={waypoint.id}/>;})
                    }
                </Picker>
            </View>
            <NextButton text={i18n.t("next")} onPress={handlePress}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.brown,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    title: {
        fontSize: fonts.size.title,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.white,
    },
    inputContainer: {
        width: '80%',
    },
    inputLabel: {
        fontSize: fonts.size.normal,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 5,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: layout.borderRadius.small,
        backgroundColor: colors.gray,
        padding: layout.padding,
    },
});
