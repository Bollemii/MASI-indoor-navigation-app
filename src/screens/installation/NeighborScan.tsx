import { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { routes } from "@/router/routes";
import { Waypoint } from "@/models/waypoint";
import { getWaypointQuery } from "@/dataaccess/getWaypoint";
import QrScanner from "@/components/QrScanner";
import Loader from "@/components/Loader";
import { useLazyCypher } from "@/hooks/useLazyCypher";
import usePedometer from "@/hooks/usePedometer";
import { useWaypointContext } from "@/context/waypointContext";
import { useNeighborContext } from "@/context/neighborContext";

export default function NeighborScan() {
    const navigation = useNavigation();
    const { waypointCtx } = useWaypointContext();
    const { neighborCtx, setNeighborCtx } = useNeighborContext();
    const [result, loading, runQuery] = useLazyCypher();
    const steps = usePedometer();
    const [id, setId] = useState("");

    const handleScan = (result) => {
        if (waypointCtx.id === result.data) {
            console.log("You cannot connect a waypoint to itself");
            Toast.show("Vous ne pouvez pas connecter un point de passage à lui-même", {
                position: Toast.positions.CENTER,
            });
            return;
        }

        setId(result.data);
        const query = getWaypointQuery(result.data);
        runQuery(query.query, query.params);
    };

    useEffect(() => {
        if (!waypointCtx) {
            console.error("Waypoint context is not defined");
            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.home);
        } else if (!neighborCtx) {
            console.error("Neighbor context is not defined");
            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.installation.addNeighbor);
        }
    }, []);
    useEffect(() => {
        if (!id) return;

        if (!result || result.length === 0) {
            console.log("Waypoint doesn't exist");
            Toast.show("Le point de passage n'existe pas", {
                position: Toast.positions.CENTER,
            });
        } else {
            const waypoint = result[0]._fields[0].properties as Waypoint;
            if (waypointCtx.neighbors.find((n) => n.id === id)) {
                console.log(`Waypoint is already connected to "${waypoint.name}"`);
                Toast.show(`Le point de passage est déjà connecté à "${waypoint.name}"`, {
                    position: Toast.positions.CENTER,
                });
            } else {
                const neighbor = neighborCtx
                neighbor.id = id;
                neighbor.distance = steps;
                setNeighborCtx(neighbor);

                // @ts-expect-error: navigation type is not well defined
                navigation.navigate(routes.installation.newOrientation);
            }
        }        
    }, [result]);

    return (
        <View style={{flex:1}}>
            <Loader loading={loading}/>
            <QrScanner
                instructions="Scannez le QR code du point de passage voisin"
                handleScan={handleScan}
                backRedirect={routes.installation.addNeighbor}
            />
        </View>
    );
}
