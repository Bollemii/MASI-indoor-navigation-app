import { StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

interface NavigateIconProps {
    color: string;
    size?: number;
    rotate?: number;
};

export default function NavigateIcon(props: NavigateIconProps) {
    const size = props.size || 100;
    const transform : Transform = {
        rotate: -45 + (props.rotate || 0),
    };

    return (
        <View style={[styles.container, {transform: [{translateX: -(size/2)}],}]}>
            <FontAwesomeIcon
                icon={faLocationArrow}
                size={size}
                color={props.color}
                transform={transform}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 80,
        left: "50%",
    },
});
