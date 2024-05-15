import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";
import Button from "./Button";

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
            textStyle={{color: colors.white}}
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
        bottom: 25,
        borderRadius: 30,
    },
});
