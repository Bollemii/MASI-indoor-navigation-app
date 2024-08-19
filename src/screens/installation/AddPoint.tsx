import { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { routes } from "@/router/routes";
import { t } from "@/locales/i18n";
import { Waypoint } from "@/models/waypoint";
import { getWaypointQuery } from "@/dataaccess/getWaypoint";
import QrScanner from "@/components/QrScanner";
import Loader from "@/components/Loader";
import { useLazyCypher } from "@/hooks/useLazyCypher";
import { useWaypointContext } from "@/context/waypointContext";

export default function AddPoint() {
    const navigation = useNavigation();
    const { setWaypointCtx } = useWaypointContext();
    const [id, setId] = useState("");
    const [result, error, loading, runQuery] = useLazyCypher();

    const handleScan = (result: string) => {
        if (!result) {
            console.error("QR code is empty");
            return;
        }
        if (id === result) return;

        setId(result);

        const query = getWaypointQuery(result);
        runQuery(query.query, query.params);
    };

    useEffect(() => {
        if (!id) return;

        if (result && result.length > 0) {
            const waypoint = result[0]._fields[0].properties as Waypoint;
            if (waypoint) {
                console.log("Waypoint already exists and is named :", waypoint.name);
                Toast.show(t("toast.waypointAlreadyExists", {name: waypoint.name}), {
                    position: Toast.positions.CENTER,
                });
            }
        } else {
            const newWaypoint = new Waypoint(id);
            setWaypointCtx(newWaypoint);

            navigation.navigate(routes.INFORMATIONS);
        }
    }, [result]);
    useEffect(() => {
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
    }, [error]);

    return (
        <View style={{flex:1}}>
            <Loader loading={loading}/>
            <QrScanner
                instructions={t("instructions.scanNewQR")}
                handleScan={handleScan}
            />
        </View>
    );
};
