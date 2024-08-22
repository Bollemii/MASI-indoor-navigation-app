import { useEffect, useState } from 'react';
import { PermissionResponse } from 'expo-modules-core';

export const usePermission = (sensor: any) => {
    const [permission, setPermission] = useState<PermissionResponse | null>(null);

    if (!sensor.getPermissionsAsync) {
        console.error("This sensor does not have getPermissionsAsync method");
        return [permission, () => {}] as const;
    }
    if (!sensor.requestPermissionsAsync) {
        console.error("This sensor does not have requestPermissionsAsync method");
        return [permission, () => {}] as const;
    }

    const requestPermission = async () => {
        const response = await sensor.requestPermissionsAsync();
        setPermission(response);
    };

    useEffect(() => {
        sensor.getPermissionsAsync().then((response : PermissionResponse) => {
            setPermission(response);
        });
    });

    return [permission, requestPermission] as const;
}
