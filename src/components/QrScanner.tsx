import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
//import Toast from "react-native-root-toast";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import BackButton from "@/components/BackButton";
import NextButton from "@/components/NextButton";

interface QrScannerProps {
    instructions: string;
    handleScan: (result: BarcodeScanningResult) => void;
}

// It is only for testing
const automaticScan = false;

export default function QrScanner(props: QrScannerProps) {
    const [permission, requestPermission] = useCameraPermissions();
    const [wantScanned, setWantScanned] = useState(false);

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    const instructions = props.instructions.split("\\n");

    const handlePress = () => {
        setWantScanned(true);
    }

    return (
        <CameraView
            style={styles.camera}
            barcodeScannerSettings={{barcodeTypes:["qr"]}}
            onBarcodeScanned={automaticScan || wantScanned ? (result) => {props.handleScan(result); setWantScanned(false)} : undefined}
        >
            <BackButton text="Retour" pageRedirect={routes.home}/>
            <View style={styles.instructionsArea}>
                {instructions.map((instruction, index) => (
                    <Text key={index} style={styles.instructions}>{instruction}</Text>
                ))}
            </View>
            <NextButton text="Scanner" onPress={handlePress}/>
        </CameraView>
    );
};

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        alignItems: 'center',
    },
    instructionsArea: {
        position: 'absolute',
        top: 70,
        height: 60,
        width: '90%',
        borderRadius: 10,
        backgroundColor: colors.gray,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    instructions: {
        textAlign: 'center',
        fontSize: 14,
        color: colors.black,
    },
});
