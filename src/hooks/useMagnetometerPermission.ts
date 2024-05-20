import { useEffect, useState } from 'react';
import { PermissionResponse } from 'expo-modules-core';
import { Magnetometer } from 'expo-sensors';

export default function usePodometerPermission() {
    const [permission, setPermission] = useState<PermissionResponse | null>(null);

    const requestPermission = async () => {
        const response = await Magnetometer.requestPermissionsAsync();
        setPermission(response);
    };

    useEffect(() => {
        Magnetometer.getPermissionsAsync().then((response) => {
            setPermission(response);
        });
    });

    return [permission, requestPermission] as const;
};
