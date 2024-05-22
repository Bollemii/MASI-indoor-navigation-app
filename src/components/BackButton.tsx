import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors } from "@/styles/colors";
import { fonts } from '@/styles/fonts';
import { layout } from "@/styles/layout";
import Button from "@/components/Button";
import { RootStackParamList } from "@/router/routes";

interface BackButtonProps {
    text: string;
    pageRedirect: keyof RootStackParamList;
};

export default function BackButton(props: BackButtonProps) {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate(props.pageRedirect);
    };

    return <Button text={`< ${props.text || ""}`} onPress={handlePress} buttonStyle={styles.container} textStyle={styles.text}/>;
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: layout.emptyBorder,
        left: layout.emptyBorder,
        height: 35,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blue,
        paddingHorizontal: layout.padding,
        paddingVertical: 5,
        borderRadius: layout.borderRadius.normal,
    },
    text: {
        color: colors.white,
        fontSize: fonts.size.normal,
    },
});
