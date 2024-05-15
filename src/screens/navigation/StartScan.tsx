import { useNavigation } from "@react-navigation/native";

import { routes } from "@/router/routes";
import QrScanner from "@/components/QrScanner";

export default function StartScan() {
    const navigation = useNavigation();
    const handleScan = (result) => {
        console.log(result);

        // check if the scanned QR code is the correct one
        // if it is, navigate to the next screen
        // else, show toast

        // @ts-expect-error: navigation type is not well defined
        navigation.navigate(routes.navigation.destination);
    };

    return (
        <QrScanner
            instructions="Scannez le QR code où vous vous trouvez."
            handleScan={handleScan}
        />
    );
};
