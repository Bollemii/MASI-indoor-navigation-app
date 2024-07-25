import { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { routes } from "@/router/routes";
import { t } from "@/locales/i18n";
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
            Toast.show(t("toast.cannotConnectWaypointItself"), {
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
            navigation.navigate(routes.HOME);
        }
    }, []);
    useEffect(() => {
        if (!id) return;

        if (!result || result.length === 0) {
            console.log("Waypoint doesn't exist");
            Toast.show(t("toast.waypointDoesNotExist"), {
                position: Toast.positions.CENTER,
            });
        } else {
            const waypoint = result[0]._fields[0].properties as Waypoint;
            if (waypointCtx.neighbors.find((n) => n.id === id)) {
                console.log(`Waypoint is already connected to "${waypoint.name}"`);
                Toast.show(t("toast.alreadyConnected", {name: waypoint.name}), {
                    position: Toast.positions.CENTER,
                });
            } else {
                const neighbor = new Neighbor()
                neighbor.id = id;
                neighbor.type = waypoint.type;
                neighbor.distance = steps;
                setNeighborCtx(neighbor);

                if (WaypointTypeStages.includes(waypointCtx.type) && WaypointTypeStages.includes(waypoint.type)) {
                    navigation.navigate(routes.SET_STAGE_CHANGE);
                } else {
                    navigation.navigate(routes.NEW_ORIENTATION);
                }
            }
        }        
    }, [result]);

    return (
        <View style={{flex:1}}>
            <Loader loading={loading}/>
            <QrScanner
                instructions={t("instructions.scanQRNeighbor")}
                handleScan={handleScan}
                backRedirect={routes.ADD_NEIGHBOR}
            />
        </View>
    );
}
