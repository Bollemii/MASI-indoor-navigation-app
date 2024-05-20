import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import { fonts } from '@/styles/fonts';
import { layout } from "@/styles/layout";
import { Waypoint } from "@/models/waypoint";
import { getNavigableWaypointsQuery } from "@/dataaccess/getNavigabledWaypoints";
import BackButton from "@/components/BackButton";
import NextButton from "@/components/NextButton";
import Loader from "@/components/Loader";
import { useLazyCypher } from "@/hooks/useLazyCypher";
import { useNavigationContext } from "@/context/navigationContext";
import Toast from "react-native-root-toast";
import { getShortestPathQuery } from "@/dataaccess/getShortestPath";

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
            Toast.show("La destination n'est pas définie", {
                position: Toast.positions.CENTER,
            });
            return;
        }

        const end = waypoints.find((waypoint) => waypoint.id === destination);
        if (!end) {
            console.error("Destination is not found");
            Toast.show("La destination entrée n'existe pas", {
                position: Toast.positions.CENTER,
            });
            return;
        }

        if (destination === navigationCtx.start.id) {
            console.error("Destination is the same as the start");
            Toast.show("Vous ne pouvez pas choisir le même point de passage comme destination", {
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
            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.home);
            return;
        }

        const query = getNavigableWaypointsQuery();
        runWaypointsQuery(query.query, query.params);
    }, []);
    useEffect(() => {
        if (waypointsResult && waypointsResult.length > 0) {
            const waypoints = waypointsResult.map((waypoint: any) => {
                return waypoint._fields[0].properties as Waypoint;
            }).sort((a: Waypoint, b: Waypoint) => a.name.localeCompare(b.name));
            
            setWaypoints(waypoints);
        }
    }, [waypointsResult]);
    useEffect(() => {
        if (pathResult && pathResult.length > 0) {
            const path = pathResult[0]._fields[0].segments
            if (!path || path.length === 0) {
                console.error("Path doesn't exist");
                Toast.show("Il n'y a pas de chemin entre le point de départ et la destination", {
                    position: Toast.positions.CENTER,
                });
                return;
            }
            setPath(path);

            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.navigation.navigation);
        }
    }, [pathResult]);

    return (
        <View style={styles.container}>
            <Loader loading={waypointsLoading || pathLoading}/>
            <BackButton text="Quitter" pageRedirect={routes.home}/>
            <Text style={styles.title}>Destination</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>La destination</Text>
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
            <NextButton text="Terminer" onPress={handlePress}/>
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
