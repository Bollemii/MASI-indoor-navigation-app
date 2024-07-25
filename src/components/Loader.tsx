import { StyleSheet, Text, View } from "react-native";

import { t } from "@/locales/i18n";
import { colors } from "@/styles/colors";
import { layout } from "@/styles/layout";

type LoaderProps = {
    loading: boolean;
};

export default function Loader(props: LoaderProps) {
    return (
        props.loading ? (
            <View style={[styles.container, {transform: [{translateX: -100}, {translateY: -40}]}]}>
                <Text>{t("loading")}</Text>
            </View>
        ) : null
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.gray,
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 200,
        height: 80,
        borderRadius: layout.borderRadius.normal,
    },
});
