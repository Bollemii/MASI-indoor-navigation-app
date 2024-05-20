import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import { colors } from "@/styles/colors";
import { fonts } from '@/styles/fonts';
import NextButton from "@/components/NextButton";
import { useEffect } from "react";
import { useNavigationContext } from "@/context/navigationContext";

export default function End() {
    const navigation = useNavigation();
    const { navigationCtx } = useNavigationContext();

    const handlePress = () => {
        // @ts-expect-error: navigation type is not well defined
        navigation.navigate(routes.home);
    };

    useEffect(() => {
        if (!navigationCtx) {
            console.error("Navigation context is not defined");
            // @ts-expect-error: navigation type is not well defined
            navigation.navigate(routes.home);
            return;
        }
    }, []);

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
        fontSize: fonts.size.title,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'center',
    },
});
