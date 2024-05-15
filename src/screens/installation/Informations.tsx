import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import NextButton from "@/components/NextButton";
import BackButton from "@/components/BackButton";

export default function Informations() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const handlePress = () => {
        // @ts-expect-error: navigation type is not well defined
        navigation.navigate(routes.installation.addNeighbor);
    };

    return (
        <View style={styles.container}>
            <BackButton text="Annuler" pageRedirect={routes.home}/>
            <Text style={styles.title}>Ajout d'un nouveau point de passage</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nom</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nom du point de passage"
                    onChangeText={(value) => setName(value)}
                />
                <Text style={styles.label}>Type</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Type de point de passage"
                    onChangeText={(value) => setType(value)}
                />
            </View>
            <NextButton text="Suivant" onPress={handlePress}/>
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
    inputContainer: {
        width: '80%',
    },
    label: {
        fontSize: fonts.size.normal,
        fontWeight: 'bold',
        marginBottom: 5,
        color: colors.white,
    },
    input: {
        width: '100%',
        height: 40,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        backgroundColor: colors.white,
    },
});
