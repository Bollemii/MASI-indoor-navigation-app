import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

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
import { useWaypointContext } from "@/context/waypointContext";
import { useNeighborContext } from "@/context/neighborContext";

export default function NewOrientation() {
    const navigation = useNavigation();
    const { waypointCtx } = useWaypointContext();
    const { neighborCtx, setNeighborCtx } = useNeighborContext();
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
        neighbor.toOrientation = orientation
        setNeighborCtx(neighbor)

        navigation.navigate(routes.NEIGHBOR_ORIENTATION)
    };

    useEffect(() => {
        if (!waypointCtx) {
            console.error("Waypoint context is not defined");
            navigation.navigate(routes.HOME);
        } else if (!neighborCtx) {
            console.error("Neighbor is not defined");
            navigation.navigate(routes.ADD_NEIGHBOR);
        }
    }, []);

    return (
        <View style={styles.container}>
            <BackButton text={t("cancel")} pageRedirect={routes.ADD_NEIGHBOR}/>
            <Text style={styles.title}>{t("waypointConnection")}</Text>
            <Button
                text={t("newIsThere")}
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
