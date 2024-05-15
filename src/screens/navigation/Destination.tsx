import { StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import BackButton from "@/components/BackButton";
import NextButton from "@/components/NextButton";
import { useState } from "react";

export default function Destination() {
    const navigation = useNavigation();
    const [destination, setDestination] = useState("");

    const handleChange = (value: string) => {
        setDestination(value);
    }
    const handlePress = () => {
        // @ts-expect-error: navigation type is not well defined
        navigation.navigate(routes.navigation.navigation);
    }

    return (
        <View style={styles.container}>
            <BackButton text="Quitter" pageRedirect={routes.home}/>
            <Text style={styles.title}>Destination</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>La destination</Text>
                <TextInput placeholder="Entrez la destination" onChangeText={handleChange} style={styles.input}/>
            </View>
            <NextButton text="Terminer" onPress={handlePress}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.brown,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.white,
    },
    inputContainer: {
        width: '80%',
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 5,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: colors.gray,
        padding: 10,
    },
});
