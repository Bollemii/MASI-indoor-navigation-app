import { useEffect, useState } from "react";
import { Magnetometer, MagnetometerMeasurement } from 'expo-sensors';

export const useMagnetometer = (): number => {
    const [magnetometerAngle, setMagnetometer] = useState(0);

    useEffect(() => {
        Magnetometer.addListener((data) => {
            setMagnetometer(_angle(data));
        });

        return () => {
            Magnetometer.removeAllListeners();
        };
    }, []);

    // Function to calculate the magnetometer angle
    // Credit: https://github.com/rahulhaque/compass-react-native-expo/blob/master/App.js
    const _angle = (data: MagnetometerMeasurement) => {
        let angle = 0;
        if (data) {
            let { x, y } = data;
            angle = Math.atan2(y, x) * (180 / Math.PI);
            if (angle < 0) {
                angle = angle + 360;
            }
        }
        return Math.round(angle);
    };

    return magnetometerAngle;
}
