import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
//import Toast from "react-native-root-toast";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";

interface QrScannerProps {
    instructions: string;
    handleScan: (result: BarcodeScanningResult) => void;
}

// It is only for testing
const automaticScan = false;

export default function QrScanner(props: QrScannerProps) {
    const [permission, requestPermission] = useCameraPermissions();
    const [wantScanned, setWantScanned] = useState(false);

    if (!permission?.granted) {
        requestPermission();
    }

    return (
        <CameraView
            style={styles.camera}
            barcodeScannerSettings={{barcodeTypes:["qr"]}}
            onBarcodeScanned={automaticScan || wantScanned ? (result) => {props.handleScan(result); setWantScanned(false)} : undefined}
        >
            <BackButton text="Retour" pageRedirect={routes.home}/>
            <View style={styles.instructionsArea}>
                <Text style={styles.instructions}>{props.instructions}</Text>
            </View>
            <Button text="Scanner" onPress={() => {setWantScanned(true)}} buttonStyle={styles.button}/>
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
    },
    button: {
        position: 'absolute',
        bottom: 20,
        height: 40,
        width: '60%',
        borderRadius: 10,
        justifyContent: 'center',
    },
});
