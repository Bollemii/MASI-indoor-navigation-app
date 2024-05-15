import QrScanner from "@/components/QrScanner";

export default function AddPoint() {
    return (
        <QrScanner
            instructions="Scannez le QR code du point de passage à ajouter"
            handleScan={(result) => {console.log(result)}}
        />
    )
};
