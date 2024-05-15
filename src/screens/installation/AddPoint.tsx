import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import QrScanner from "@/components/QrScanner";

export default function AddPoint() {
    const navigation = useNavigation();

    const handleScan = (result) => {
        console.log(result);
        // @ts-expect-error: navigation type is not well defined
        navigation.navigate(routes.installation.informations);
    };

    return (
        <QrScanner
            instructions="Scannez le QR code du nouveau point de passage"
            handleScan={handleScan}
        />
    );
};
