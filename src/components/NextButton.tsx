import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";
import { fonts } from '@/styles/fonts';
import { layout } from "@/styles/layout";
import Button from "@/components/Button";

interface NextButtonProps {
    text: string;
    onPress: () => void;
};

export default function NextButton(props: NextButtonProps) {
    return (
        <Button
            text={props.text}
            onPress={props.onPress}
            buttonStyle={styles.button}
            colorButton={colors.blue}
            colorPressedButton={colors.darkblue}
            textStyle={styles.text}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        bottom: layout.emptyBorder+5,
        borderRadius: layout.borderRadius.normal,
    },
    text: {
        color: colors.white,
        fontSize: fonts.size.normal,
    },
});
