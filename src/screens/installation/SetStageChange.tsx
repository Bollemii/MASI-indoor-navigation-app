import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import { i18n } from '@/locales/i18n';
import { colors } from "@/styles/colors";
import { layout } from "@/styles/layout";
import { fonts } from "@/styles/fonts";
import { StageChange } from "@/models/neighbor";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import { useNeighborContext } from "@/context/neighborContext";
import { useWaypointContext } from "@/context/waypointContext";

export default function SetStageChange() {
    const navigation = useNavigation();
    const { waypointCtx, setWaypointCtx } = useWaypointContext();
    const { neighborCtx, setNeighborCtx } = useNeighborContext();

    const handlePress = (stageChange : StageChange) => {
        const neighbor = neighborCtx;
        neighbor.fromStage = stageChange;
        neighbor.toStage = -stageChange;
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
            console.error("Neighbor is not defined");
            navigation.navigate(routes.ADD_NEIGHBOR);
        }
    }, []);

    return (
        <View style={styles.container}>
            <BackButton text={i18n.t("cancel")} pageRedirect={routes.ADD_NEIGHBOR}/>
            <Text style={styles.title}>{i18n.t("waypointConnection")}</Text>
            <Text style={styles.text}>{i18n.t("toJoinNeighbor")}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    text={i18n.t('neighbor.up')}
                    onPress={() => {handlePress(StageChange.UP)}}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
                <Button
                    text={i18n.t('neighbor.down')}
                    onPress={() => {handlePress(StageChange.DOWN)}}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>
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
    text: {
        fontSize: fonts.size.high,
        color: colors.white,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        height: 70,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: layout.borderRadius.normal,
    },
    buttonText: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 16,
    },
});
