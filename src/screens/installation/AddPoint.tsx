import QrScanner from "@/components/QrScanner";

export default function AddPoint() {
    const handleScan = (result) => {
        console.log(result);
    }
    return (
        <QrScanner
            instructions="Scannez le QR code du point de passage à ajouter"
            handleScan={handleScan}
        />
    )
};
