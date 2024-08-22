import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { DeviceMotion, Magnetometer } from "expo-sensors";

import { routes } from "@/router/routes";
import { t } from "@/locales/i18n";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { layout } from "@/styles/layout";
import Button from "@/components/Button";
import NavigateIcon from "@/components/NavigateIcon";
import NextButton from "@/components/NextButton";
import BackButton from "@/components/BackButton";
import { useMagnetometer } from "@/hooks/useMagnetometer";
import { usePermission } from "@/hooks/usePermission";
import { useDeviceGravityAcceleration, GRAVITY_ACCELERATION } from "@/hooks/useDeviceGravityAcceleration";
import { useWaypointContext } from "@/context/waypointContext";
import { useNeighborContext } from "@/context/neighborContext";

const ACC_THRESHOLD = 0.8;

export default function NeighborOrientation() {
    const navigation = useNavigation();
    const { waypointCtx } = useWaypointContext();
    const { setWaypointCtx } = useWaypointContext();
    const { neighborCtx, setNeighborCtx } = useNeighborContext();
    const [motionPermission, requestMotionPermission] = usePermission(DeviceMotion);
    const [magnetometerPermission, requestMagnetometerPermission] = usePermission(Magnetometer);
    const { z } = useDeviceGravityAcceleration();
    const [orientation, setOrientation] = useState(-1);
    const magnetometerAngle = useMagnetometer();

    const handlePress = () => {
        setOrientation(magnetometerAngle)
    };
    const handlePressDone = () => {
        if (orientation === -1) {
            console.log("Orientation is not defined");
            Toast.show(t("toast.defineOrientation"), {
                position: Toast.positions.CENTER,
            });
            return;
        }

        const neighbor = neighborCtx;
        neighbor.fromOrientation = orientation
        const waypoint = waypointCtx;
        waypoint.addNeighbor(neighbor);
        setWaypointCtx(waypoint);
        setNeighborCtx(null)

        navigation.navigate(routes.ADD_NEIGHBOR)
    };

    useEffect(() => {
        if (!waypointCtx) {
            console.error("Waypoint context is not defined");
            navigation.navigate(routes.HOME);
        } else if (!neighborCtx) {
            console.error("Neighbor context is not defined");
            navigation.navigate(routes.ADD_NEIGHBOR);
        }

        if (!motionPermission?.granted) {
            requestMotionPermission();
        }
        if (!magnetometerPermission?.granted) {
            requestMagnetometerPermission();
        }
    }, []);
    useEffect(() => {
        if (z + GRAVITY_ACCELERATION > ACC_THRESHOLD) {
            Toast.show(t("toast.holdPhoneHorizontally"), {
                position: Toast.positions.CENTER,
                duration: Toast.durations.SHORT,
            });
        }
    }, [z]);

    return (
        <View style={styles.container}>
            <BackButton text={t("cancel")} pageRedirect={routes.ADD_NEIGHBOR}/>
            <Text style={styles.title}>{t("waypointConnection")}</Text>
            <Button
                text={t("neighborIsThere")}
                onPress={handlePress}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />
            <NavigateIcon
                color={colors.black}
                orientation={orientation === -1 ? undefined : orientation}
                magnetometerAngle={magnetometerAngle}
            />
            <NextButton text={t("save")} onPress={handlePressDone}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.brown,
    },
    title: {
        fontSize: fonts.size.title,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'center',
        marginBottom: 100,
        marginTop: 170,
    },
    button: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: layout.padding,
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.white,
    },
});
