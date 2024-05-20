import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import NavigateIcon from "@/components/NavigateIcon";
import QrScanner from "@/components/QrScanner";
import { useNavigationContext } from "@/context/navigationContext";
import { useMagnetometer } from "@/hooks/useMagnetometer";

export default function Navigation() {
    const navigation = useNavigation();
    const { navigationCtx } = useNavigationContext();
    const magnetometer = useMagnetometer();
    const [orientation, setOrientation] = useState(0);

    const handleScan = (result) => {
        console.log(result);

        if (orientation >= 270) {
            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.navigation.end);
        }

        setOrientation(orientation + 90);
    };

    useEffect(() => {
        if (!navigationCtx) {
            console.error("Navigation context is not set");
            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.home);
        }

        setOrientation(0) // orientation to next neighbor
    }, []);

    return (
        <View style={styles.container}>
            <QrScanner
                instructions="Suivez les indications.\nScannez le QR code du prochain point de passage."
                handleScan={handleScan}
            />
            <NavigateIcon orientation={orientation} color={colors.blue}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
