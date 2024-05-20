import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { layout } from "@/styles/layout";
import { Neighbor } from "@/models/neighbor";
import Button from "@/components/Button";
import NavigateIcon from "@/components/NavigateIcon";
import NextButton from "@/components/NextButton";
import BackButton from "@/components/BackButton";
import { useWaypointContext } from "@/context/waypointContext";
import { useNeighborContext } from "@/context/neighborContext";

export default function NeighborOrientation() {
    const navigation = useNavigation();
    const { waypointCtx } = useWaypointContext();
    const { setNeighborCtx } = useNeighborContext();
    const [orientation, setOrientation] = useState(0);

    const handlePress = () => {
        setOrientation(0)
    };
    const handlePressDone = () => {
        const neighbor = new Neighbor()
        neighbor.fromOrientation = orientation
        setNeighborCtx(neighbor)

        // @ts-expect-error: navigation type is not well defined
        navigation.navigate(routes.installation.neighborScan)
    };

    useEffect(() => {
        if (!waypointCtx) {
            console.error("Waypoint context is not defined");
            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.home);
        }
    }, []);

    return (
        <View style={styles.container}>
            <BackButton text="Annuler" pageRedirect={routes.installation.addNeighbor}/>
            <Text style={styles.title}>Connexion avec un point de passage voisin</Text>
            <Button
                text="Le voisin est par là !"
                onPress={handlePress}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />
            <NavigateIcon color={colors.black} rotate={orientation}/>
            <NextButton text="Enregistrer" onPress={handlePressDone}/>
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
