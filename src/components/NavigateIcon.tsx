import { StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

interface NavigateIconProps {
    color: string;
    size?: number;
    orientation?: number;
    magnetometerAngle?: number;
};

export default function NavigateIcon(props: NavigateIconProps) {
    const size = props.size || 100;
    
    const getRotation = (): number => {
        if (props.magnetometerAngle !== undefined && props.orientation !== undefined) {
            return (props.orientation - props.magnetometerAngle) % 360;
        } else if (props.orientation) {
            return props.orientation;
        } else {
            return 0;
        }
    }
    const transform : Transform = {rotate: -45 + getRotation()};

    return (
        <View style={styles.container}>
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
    },
});
