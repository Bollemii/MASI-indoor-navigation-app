import { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import QrScanner from "@/components/QrScanner";
import Loader from "@/components/Loader";
import { createWaypointQuery } from "@/dataaccess/createWaypoint";
import { useLazyCypher } from "@/hooks/useLazyCypher";

export default function AddPoint() {
    const navigation = useNavigation();
    const [result, loading, runQuery] = useLazyCypher();

    const handleScan = (result) => {
        console.log("Scanned QR code", result.data);

        //@TODO : not create here, it should pass id to the next screen
        const query = createWaypointQuery(result.data);
        runQuery(query.query, query.params);
    };

    useEffect(() => {
        console.log("Result", result);

        if (result && result.length > 0) {
            console.log("Waypoint creation");

            const waypoint = result.records[0].get("w").properties;
            if (waypoint) {
                // @ts-expect-error: navigation type is not well defined
                navigation.navigate(routes.installation.informations);
            }
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
