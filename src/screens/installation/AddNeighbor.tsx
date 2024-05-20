import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

import { routes } from "@/router/routes";
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

export default function AddNeighbor() {
    const navigation = useNavigation();
    const { waypointCtx, setWaypointCtx } = useWaypointContext();
    const [getNumberResult, getNumberloading, runGetNumberQuery] = useLazyCypher();
    const [createResult, createloading, runCreateQuery] = useLazyCypher();
    const [waypointsNumber, setWaypointsNumber] = useState(0);

    const handlePress = () => {
        // @ts-expect-error: navigation type is not well defined
        navigation.navigate(routes.installation.neighborOrientation);
    };
    const rejectFinish = () => {
        console.log("You must connect the waypoint to at least one neighbor before finishing the installation.");
        Toast.show("Vous devez connecter le point de passage à au moins un voisin avant de terminer l'installation.", {
            position: Toast.positions.CENTER,
        });
    };
    const handlePressFinish = () => {
        if (waypointsNumber > 0 && waypointCtx.neighbors.length === 0) {
            rejectFinish();
            return;
        }

        if (!waypointCtx.id || !waypointCtx.name || !waypointCtx.type) {
            console.log("Waypoint is not fully defined");
            Toast.show("Le point de passage n'est pas entièrement défini", {
                position: Toast.positions.CENTER,
            });
            return;
        }

        const createQuery = createWaypointQuery(waypointCtx);
        runCreateQuery(createQuery.query, createQuery.params);
        waypointCtx.neighbors.forEach((neighbor) => {
            const neighborQuery = addNeighborQuery(waypointCtx.id, neighbor);
            runCreateQuery(neighborQuery.query, neighborQuery.params);
        });
        setWaypointCtx(null);
    };

    useEffect(() => {
        const getNumberQuery = getWaypointsNumber();
        runGetNumberQuery(getNumberQuery.query, getNumberQuery.params);
    }, []);
    useEffect(() => {
        if (getNumberResult && getNumberResult.length > 0) {
            setWaypointsNumber(getNumberResult[0]._fields[0].low);
        }
    }, [getNumberResult]);
    useEffect(() => {
        if (createResult && createResult.length > 0) {
            console.log("Waypoint created", createResult[0]._fields[0].properties);
            Toast.show("Le point de passage a été créé", {
                position: Toast.positions.CENTER,
            });

            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.home);
        }
    }, [createResult]);

    return (
        <View style={styles.container}>
            <Loader loading={getNumberloading || createloading}/>
            <BackButton text="Annuler" pageRedirect={routes.home}/>
            <Text style={styles.title}>Ajout d'un nouveau point de passage</Text>
            <Button
                text="Connecter à un point de passage voisin"
                onPress={handlePress}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />
            <NextButton text="Terminer" onPress={waypointsNumber > 0 && waypointCtx.neighbors.length === 0 ? rejectFinish : handlePressFinish}/>
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
