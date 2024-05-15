import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { layout } from "@/styles/layout";
import Button from "@/components/Button";
import NextButton from "@/components/NextButton";
import BackButton from "@/components/BackButton";

export default function AddNeighbor() {
    const navigation = useNavigation();

    const handlePress = () => {
        console.log("AddNeighbor");
        // @ts-expect-error: navigation type is not well defined
        navigation.navigate(routes.installation.neighborOrientation);
    };
    const handlePressFinish = () => {
        // @ts-expect-error: navigation type is not well defined
        navigation.navigate(routes.home);
    };
    
    return (
        <View style={styles.container}>
            <BackButton text="Annuler" pageRedirect={routes.home}/>
            <Text style={styles.title}>Ajout d'un nouveau point de passage</Text>
            <Button
                text="Connecter à un point de passage voisin"
                onPress={handlePress}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />
            <NextButton text="Terminer" onPress={handlePressFinish}/>
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
