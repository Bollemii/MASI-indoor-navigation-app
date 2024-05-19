import { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import QrScanner from "@/components/QrScanner";
import Loader from "@/components/Loader";
import { getWaypointQuery } from "@/dataaccess/getWaypoint";
import { useLazyCypher } from "@/hooks/useLazyCypher";

export default function StartScan() {
    const navigation = useNavigation();
    const [result, loading, runQuery] = useLazyCypher();

    const handleScan = (result) => {
        console.log("Scanned QR code", result.data);
        
        const query = getWaypointQuery(result.data);
        runQuery(query.query, query.params);
    };

    useEffect(() => {
        console.log("Result", result);
        
        if (result && result.length > 0) {
            console.log("Waypoint found");
            console.log("Properties", result[0]._fields[0].properties);
            
            const waypoint = result._fields;
            if (waypoint) {
                // @ts-expect-error: navigation type is not well defined
                navigation.navigate(routes.navigation.destination);
            }
        }
    }, [result]);

    return (
        <View style={{flex:1}}>
            <Loader loading={loading}/>
            <QrScanner
                instructions="Scannez le QR code où vous vous trouvez."
                handleScan={loading ? () => {} : handleScan}
            />
        </View>
    );
};
