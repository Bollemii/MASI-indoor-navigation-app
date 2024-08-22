import { useEffect, useState } from 'react';
import { PermissionResponse } from 'expo-modules-core';
import { DeviceMotion } from 'expo-sensors';

export function useDeviceMotionPermission() {
    const [permission, setPermission] = useState<PermissionResponse | null>(null);

    const requestPermission = async () => {
        const response = await DeviceMotion.requestPermissionsAsync();
        setPermission(response);
    };

    useEffect(() => {
        DeviceMotion.getPermissionsAsync().then((response) => {
            setPermission(response);
        });
    });

    return [permission, requestPermission] as const;
};
