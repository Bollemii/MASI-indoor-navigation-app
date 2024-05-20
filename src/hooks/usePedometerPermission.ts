import { useEffect, useState } from 'react';
import { PermissionResponse } from 'expo-modules-core';
import { Pedometer } from 'expo-sensors';

export default function usePodometerPermission() {
    const [permission, setPermission] = useState<PermissionResponse | null>(null);

    const requestPermission = async () => {
        const response = await Pedometer.requestPermissionsAsync();
        setPermission(response);
    };

    useEffect(() => {
        Pedometer.getPermissionsAsync().then((response) => {
            setPermission(response);
        });
    });

    return [permission, requestPermission] as const;
};
