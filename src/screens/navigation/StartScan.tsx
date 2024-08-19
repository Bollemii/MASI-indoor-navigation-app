import { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { routes } from "@/router/routes";
import { t } from '@/locales/i18n';
import { Waypoint } from "@/models/waypoint";
import { getWaypointQuery } from "@/dataaccess/getWaypoint";
import QrScanner from "@/components/QrScanner";
import Loader from "@/components/Loader";
import { useLazyCypher } from "@/hooks/useLazyCypher";
import { useNavigationContext } from "@/context/navigationContext";

export default function StartScan() {
    const navigation = useNavigation();
    const { setStart, setNavigationCtx } = useNavigationContext();
    const [result, error, loading, runQuery] = useLazyCypher();
    const [id, setId] = useState("");

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

        if (!result || result.length === 0) {
            console.log("Waypoint doesn't exist");
            Toast.show(t("toast.waypointDoesNotExist"), {
                position: Toast.positions.CENTER,
            });
        } else {
            setNavigationCtx(null);
            const waypoint = result[0]._fields[0].properties as Waypoint;
            if (waypoint) {
                setStart(waypoint);
                navigation.navigate(routes.DESTINATION);
            }
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
                instructions={t("instructions.scanQRYouAre")}
                handleScan={loading ? () => {} : handleScan}
            />
        </View>
    );
};
