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

export default function AddPoint() {
    const navigation = useNavigation();
    const [id, setId] = useState("");
    const [result, loading, runQuery] = useLazyCypher();

    const handleScan = (result) => {
        setId(result.data);
        // check if waypoint doesn't exists
        const query = getWaypointQuery(result.data);
        runQuery(query.query, query.params);
    };

    useEffect(() => {
        if (!id) return;

        if (result && result.length > 0) {
            const waypoint = result[0]._fields[0].properties as Waypoint;
            if (waypoint) {
                console.log("Waypoint already exists and is named :", waypoint.name);
                Toast.show(`Le point de passage existe déjà et est nommé "${waypoint.name}"`, {
                    position: Toast.positions.CENTER,
                });
            }
        } else {
            const newWaypoint = new Waypoint(id);

            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.installation.informations, { waypoint: newWaypoint});
        }
    }, [result]);

    return (
        <View style={{flex:1}}>
            <Loader loading={loading}/>
            <QrScanner
                instructions="Scannez le QR code du nouveau point de passage"
                handleScan={handleScan}
            />
        </View>
    );
};
