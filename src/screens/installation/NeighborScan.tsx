import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import QrScanner from "@/components/QrScanner";

export default function NeighborScan() {
    const navigation = useNavigation();

    const handleScan = (result) => {
        console.log(result);
        // @ts-expect-error: navigation type is not well defined
        navigation.navigate(routes.installation.newOrientation);
    };

    return (
        <QrScanner
            instructions="Scannez le QR code du point de passage voisin"
            handleScan={handleScan}
            backRedirect={routes.installation.addNeighbor}
        />
    );
}
