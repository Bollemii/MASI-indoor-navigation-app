import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/styles/colors";
import BackButton from "@/components/BackButton";
import { routes } from "@/router/routes";
import NavigateIcon from "@/components/NavigateIcon";

export default function Navigation() {
    return (
        <View style={styles.container}>
            <BackButton text="Retour" pageRedirect={routes.home}/>
            <Text style={styles.title}>Navigation</Text>
            <NavigateIcon color={colors.black}/>
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
    },
});
