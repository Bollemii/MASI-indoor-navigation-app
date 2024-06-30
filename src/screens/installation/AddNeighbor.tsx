import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { routes } from "@/router/routes";
import { i18n } from "@/locales/i18n";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { layout } from "@/styles/layout";
import { getWaypointsNumber } from "@/dataaccess/getWaypointsNumber";
import { createWaypointQuery } from "@/dataaccess/createWaypoint";
import { addNeighborQuery } from "@/dataaccess/addNeighbor";
import Button from "@/components/Button";
import NextButton from "@/components/NextButton";
import BackButton from "@/components/BackButton";
import Loader from "@/components/Loader";
import { useLazyCypher } from "@/hooks/useLazyCypher";
import { useWaypointContext } from "@/context/waypointContext";
import { useNeighborContext } from "@/context/neighborContext";

export default function AddNeighbor() {
    const navigation = useNavigation();
    const { waypointCtx, setWaypointCtx } = useWaypointContext();
    const { setNeighborCtx } = useNeighborContext();
    const [getNumberResult, getNumberloading, runGetNumberQuery] = useLazyCypher();
    const [createResult, createLoading, runCreateQuery] = useLazyCypher();
    const [neighborResult, neighborLoading, runNeighborQuery] = useLazyCypher();
    const [waypointsNumber, setWaypointsNumber] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [neighborsCreated, setNeighborsCreated] = useState<string[]>([]);

    const handlePress = () => {
        if (waypointsNumber === 0) {
            console.log("You are creating the first waypoint. It is not possible to connect it to a neighbor. You can finish the installation.");
            Toast.show(i18n.t("toast.firstWaypoint"), {
                position: Toast.positions.CENTER,
            });
            return;
        }

        navigation.navigate(routes.NEIGHBOR_SCAN);
    };
    const rejectFinish = () => {
        console.log("You must connect the waypoint to at least one neighbor before finishing the installation.");
        Toast.show(i18n.t("toast.connectAtLeastOneNeighbor"), {
            position: Toast.positions.CENTER,
        });
    };
    const handlePressFinish = () => {
        if (!isFinished && waypointsNumber > 0 && waypointCtx.neighbors.length === 0) {
            rejectFinish();
            return;
        }

        if (!waypointCtx.id || !waypointCtx.name || !waypointCtx.type) {
            console.log("Waypoint is not fully defined");
            Toast.show(i18n.t("toast.waypointIsNotDefined"), {
                position: Toast.positions.CENTER,
            });
            return;
        }

        const createQuery = createWaypointQuery(waypointCtx);
        runCreateQuery(createQuery.query, createQuery.params);
    };
    const finish = () => {
        setIsFinished(true);
        setWaypointCtx(null);
        setNeighborCtx(null);

        navigation.navigate(routes.HOME);
    }

    useEffect(() => {
        if (isFinished) return;

        if (!waypointCtx) {
            console.error("Waypoint context is not defined");
            navigation.navigate(routes.HOME);
            return;
        }

        setNeighborCtx(null);
        const getNumberQuery = getWaypointsNumber();
        runGetNumberQuery(getNumberQuery.query, getNumberQuery.params);
    }, [waypointCtx]);
    useEffect(() => {
        if (process.env.EXPO_PUBLIC_VERBOSE || false) {
            console.log("Waypoint context", waypointCtx);
        }
    }, [waypointCtx.neighbors.length]);
    useEffect(() => {
        if (getNumberResult && getNumberResult.length > 0) {
            setWaypointsNumber(getNumberResult[0]._fields[0].low);
        }
    }, [getNumberResult]);
    useEffect(() => {
        if (createResult && createResult.length > 0) {
            if (waypointsNumber === 0) {
                console.log("Waypoint created", createResult[0]._fields[0].properties);
                Toast.show(i18n.t("toast.waypointIsCreated"), {
                    position: Toast.positions.CENTER,
                });
                finish();
            } else {
                waypointCtx.neighbors.forEach((neighbor) => {
                    const neighborQuery = addNeighborQuery(waypointCtx, neighbor);
                    runNeighborQuery(neighborQuery.query, neighborQuery.params);
                });
            }
        }
    }, [createResult]);
    useEffect(() => {
        if (isFinished) return;

        if (neighborResult && neighborResult.length > 0) {
            const neighborId = neighborResult[0]._fields[0].properties.id;
            if (neighborsCreated.includes(neighborId)) return;
            setNeighborsCreated([...neighborsCreated, neighborId]);
            
            if ([...neighborsCreated, neighborId].length === waypointCtx.neighbors.length) {
                console.log("Waypoint created", createResult[0]._fields[0].properties);
                Toast.show(i18n.t("toast.waypointIsCreated"), {
                    position: Toast.positions.CENTER,
                });
                finish();
            }
        }
    }, [neighborResult]);

    return (
        <View style={styles.container}>
            <Loader loading={getNumberloading || createLoading || neighborLoading}/>
            <BackButton text={i18n.t("cancel")} pageRedirect={routes.HOME}/>
            <Text style={styles.title}>{i18n.t("newWaypoint")}</Text>
            <Button
                text={i18n.t("connectNeighbor")}
                onPress={handlePress}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />
            <NextButton text={i18n.t("finish")} onPress={handlePressFinish}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.brown,
    },
    title: {
        fontSize: fonts.size.title,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'center',
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
