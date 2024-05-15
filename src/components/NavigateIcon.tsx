import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

interface NavigateIconProps {
    color: string;
    size?: number;
    rotate?: number;
};

export default function NavigateIcon(props: NavigateIconProps) {
    const transform : Transform = {
        rotate: -45 + (props.rotate || 0),
    };
    return (
        <FontAwesomeIcon
            icon={faLocationArrow}
            size={props.size || 50}
            color={props.color}
            transform={transform}
        />
    );
};
