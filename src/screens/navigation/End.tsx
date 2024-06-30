import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import { i18n } from '@/locales/i18n';
import { colors } from "@/styles/colors";
import { fonts } from '@/styles/fonts';
import NextButton from "@/components/NextButton";
import { useEffect } from "react";
import { useNavigationContext } from "@/context/navigationContext";

export default function End() {
    const navigation = useNavigation();
    const { navigationCtx } = useNavigationContext();

    const handlePress = () => {
        navigation.navigate(routes.HOME);
    };

    useEffect(() => {
        if (!navigationCtx) {
            console.error("Navigation context is not defined");
            navigation.navigate(routes.HOME);
            return;
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{i18n.t("youAreArrived")}</Text>
            <NextButton text={i18n.t("finish")} onPress={handlePress}/>
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
