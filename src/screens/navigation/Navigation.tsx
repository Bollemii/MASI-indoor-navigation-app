import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import NavigateIcon from "@/components/NavigateIcon";
import QrScanner from "@/components/QrScanner";

export default function Navigation() {
    const navigation = useNavigation();
    const [orientation, setOrientation] = useState(0);

    const handleScan = (result) => {
        console.log(result);

        if (orientation >= 270) {
            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.navigation.end);
        }

        setOrientation(orientation + 90);
    };

    return (
        <View style={styles.container}>
            <QrScanner
                instructions="Suivez les indications.\nScannez le QR code du prochain point de passage."
                handleScan={handleScan}
            />
            <View style={styles.iconContainer}>
                <NavigateIcon rotate={orientation} color={colors.blue} size={100}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconContainer: {
        position: 'absolute',
        bottom: 80,
        left: "50%",
        transform: [{translateX: -50}],
    },
});
