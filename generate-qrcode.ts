// Usage: node generate-qrcode.ts 5

const fs = require('fs');
const QRCode = require('qrcode');
const { v1: uuidv1 } = require('uuid');

const FOLDER = 'qr-codes';

/**
 * Generate QR codes
 * Save the QR codes in the `qr-codes` folder
 * 
 * @param {number} number - Number of QR codes to generate (default: 1)
 * 
 * @example node generate-qrcode.ts 5
 */
const args = process.argv.slice(2);
const number = parseInt(args[0]) || 1;

if (fs.existsSync(FOLDER)) {
    fs.rmSync(FOLDER, { recursive: true });
}
fs.mkdirSync(FOLDER);

for (let i = 0; i < number; i++) {
    const uuid = uuidv1();
    QRCode.toFile(`${FOLDER}/${uuid}.png`, uuid, {
        color: {
            dark: '#000',
            light: '#fff',
        },
    }, (err) => {
        if (err) {
            console.error(err);
        }
    });
}
