import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { routes } from "@/router/routes";
import { i18n } from "@/locales/i18n";
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

export default function NeighborOrientation() {
    const navigation = useNavigation();
    const { waypointCtx } = useWaypointContext();
    const { setWaypointCtx } = useWaypointContext();
    const { neighborCtx, setNeighborCtx } = useNeighborContext();
    const [orientation, setOrientation] = useState(-1);
    const magnetometerAngle = useMagnetometer();

    const handlePress = () => {
        setOrientation(magnetometerAngle)
    };
    const handlePressDone = () => {
        if (orientation === -1) {
            console.log("Orientation is not defined");
            Toast.show(i18n.t("toast.defineOrientation"), {
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
    }, []);

    return (
        <View style={styles.container}>
            <BackButton text={i18n.t("cancel")} pageRedirect={routes.ADD_NEIGHBOR}/>
            <Text style={styles.title}>{i18n.t("waypointConnection")}</Text>
            <Button
                text={i18n.t("neighborIsThere")}
                onPress={handlePress}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />
            <NavigateIcon
                color={colors.black}
                orientation={orientation === -1 ? undefined : orientation}
                magnetometerAngle={magnetometerAngle}
            />
            <NextButton text={i18n.t("save")} onPress={handlePressDone}/>
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
