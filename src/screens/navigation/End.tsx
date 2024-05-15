import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import NextButton from "@/components/NextButton";

export default function End() {
    const navigation = useNavigation();

    const handlePress = () => {
        // @ts-expect-error: navigation type is not well defined
        navigation.navigate(routes.home);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vous êtes arrivé{"\n"}à destination</Text>
            <NextButton text="Terminer" onPress={handlePress}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.brown,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'center',
    },
});
