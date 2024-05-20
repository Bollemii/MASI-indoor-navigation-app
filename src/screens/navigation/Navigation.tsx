import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import NavigateIcon from "@/components/NavigateIcon";
import QrScanner from "@/components/QrScanner";
import { useNavigationContext } from "@/context/navigationContext";
import { useMagnetometer } from "@/hooks/useMagnetometer";
import Toast from "react-native-root-toast";

export default function Navigation() {
    const navigation = useNavigation();
    const { navigationCtx } = useNavigationContext();
    const magnetometer = useMagnetometer();
    const [orientation, setOrientation] = useState(0);
    const [idScanned, setIdScanned] = useState("");
    const [id, setId] = useState(0);

    const handleScan = (result) => {
        setIdScanned(result.data);

        if (result.data !== navigationCtx.path[id].end.properties.id) {
            console.log("Wrong QR code scanned");
            Toast.show("Vous n'êtes pas au bon endroit", {
                position: Toast.positions.CENTER,
            });
            return;
        }

        if (result.data === navigationCtx.end.id) {
            console.log("Destination reached");

            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.navigation.end);
            return;
        }

        setId(id + 1)
    };

    useEffect(() => {
        if (!navigationCtx) {
            console.error("Navigation context is not set");
            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.home);
        }
    }, []);
    useEffect(() => {
        if (!idScanned) {
            setOrientation(navigationCtx.path[0].relationship.properties.orientation)
        } else {
            setOrientation(navigationCtx.path[id].relationship.properties.orientation)
        }
    }, [id]);

    return (
        <View style={styles.container}>
            <QrScanner
                instructions="Suivez les indications.\nScannez le QR code du prochain point de passage."
                handleScan={handleScan}
            />
            <NavigateIcon
                orientation={orientation}
                color={colors.blue}
                magnetometerAngle={magnetometer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
