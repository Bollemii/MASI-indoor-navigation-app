import { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { routes } from "@/router/routes";
import { Waypoint } from "@/models/waypoint";
import { Neighbor } from "@/models/neighbor";
import { getWaypointQuery } from "@/dataaccess/getWaypoint";
import QrScanner from "@/components/QrScanner";
import Loader from "@/components/Loader";
import { useLazyCypher } from "@/hooks/useLazyCypher";
import usePedometer from "@/hooks/usePedometer";
import { useWaypointContext } from "@/context/waypointContext";
import { useNeighborContext } from "@/context/neighborContext";
import { WaypointTypeStages } from "@/models/waypointType";

export default function NeighborScan() {
    const navigation = useNavigation();
    const { waypointCtx } = useWaypointContext();
    const { setNeighborCtx } = useNeighborContext();
    const [result, loading, runQuery] = useLazyCypher();
    const steps = usePedometer();
    const [id, setId] = useState("");

    const handleScan = (result: string) => {
        if (!result) {
            console.error("QR code is empty");
            return;
        }
        if (id === result) return;

        setId(result);

        if (waypointCtx.id === result) {
            console.log("You cannot connect a waypoint to itself");
            Toast.show("Vous ne pouvez pas connecter un point de passage à lui-même", {
                position: Toast.positions.CENTER,
            });
            return;
        }

        const query = getWaypointQuery(result);
        runQuery(query.query, query.params);
    };

    useEffect(() => {
        if (!waypointCtx) {
            console.error("Waypoint context is not defined");
            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.home);
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
                const neighbor = new Neighbor()
                neighbor.id = id;
                neighbor.type = waypoint.type;
                neighbor.distance = steps;
                setNeighborCtx(neighbor);

                if (WaypointTypeStages.includes(waypointCtx.type) && WaypointTypeStages.includes(waypoint.type)) {
                    // @ts-expect-error: navigation type is not well defined
                    navigation.navigate(routes.installation.setStageChange);
                } else {
                    // @ts-expect-error: navigation type is not well defined
                    navigation.navigate(routes.installation.newOrientation);
                }
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
