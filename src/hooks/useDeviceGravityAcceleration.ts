import { useEffect, useState } from "react";
import { Subscription } from 'expo-modules-core';
import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";

export const GRAVITY_ACCELERATION = DeviceMotion.Gravity;

export const useDeviceGravityAcceleration = (interval: number = 1000) => {
    const [data, setData] = useState<DeviceMotionMeasurement>();
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    useEffect(() => {
        DeviceMotion.setUpdateInterval(interval);
        setSubscription(DeviceMotion.addListener(setData));
        return () => {
            subscription && subscription.remove();
            setSubscription(null);
        }
    }, []);

    return data?.accelerationIncludingGravity || { x: 0, y: 0, z: 0 };
};
