import { useEffect, useState } from "react";
import { Magnetometer, MagnetometerMeasurement } from 'expo-sensors';
import { PermissionResponse } from 'expo-modules-core';

export const useMagnetometer = () => {
    const [isAvailable, setIsAvailable] = useState(false);
    const [permission, setPermission] = useState<PermissionResponse | null>(null);
    const [magnetometerAngle, setMagnetometer] = useState(0);

    useEffect(() => {
        Magnetometer.isAvailableAsync().then((available) => {
            setIsAvailable(available);
            if (!available) {
                console.log('Magnetometer is not available on this device');
                return;
            }
        });
    }, []);
    useEffect(() => {
        if (!isAvailable) return;

        Magnetometer.getPermissionsAsync().then((response) => {
            setPermission(response);
            if (!response.granted) {
                Magnetometer.requestPermissionsAsync().then((newResponse) => {
                    setPermission(newResponse);
                });
            }
        });
    }, [isAvailable]);
    useEffect(() => {
        if (!isAvailable || !permission?.granted) return;

        Magnetometer.addListener((data) => {
            setMagnetometer(_angle(data));
        });

        return () => {
            Magnetometer.removeAllListeners();
        };
    }, [permission]);

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
