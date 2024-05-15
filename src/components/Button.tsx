import { Text, Pressable, StyleSheet } from 'react-native';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { layout } from '@/styles/layout';

interface ButtonProps {
    text: string;
    onPress: () => void;
    buttonStyle?: object;
    colorButton?: string;
    colorPressedButton?: string;
    textStyle?: object;
};

/**
 * Button component with custom style and text
 * 
 * ButtonProps : `text`, `onPress`, `buttonStyle?`, `colorButton?`, `colorPressedButton?`, `textStyle?`
 * 
 * Break lines support with `\n` in text
 * 
 * @param props ButtonProps
 * @returns 
 */
export default function Button(props: ButtonProps) {
    const buttonStyle = props.buttonStyle || styles.defaultButton;
    const colorButton = { backgroundColor: props.colorButton || colors.blue };
    const colorPressedButton = { backgroundColor: props.colorPressedButton || colors.darkblue };
    const textStyle = props.textStyle || styles.textButton;
    const text = props.text.replace('\\n', '\n');
    
    return (
        <Pressable 
            onPress={props.onPress}
            style={(state) => state.pressed ? [buttonStyle, colorPressedButton] : [buttonStyle, colorButton]}
        >
            <Text style={textStyle}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    defaultButton: {
        height: 30,
        alignItems: 'center',
        paddingHorizontal: layout.padding,
        paddingVertical: 5,
        borderRadius: 50,
    },
    textButton: {
        color: colors.white,
        fontSize: fonts.size.normal,
        textAlign: 'center',
    },
});
