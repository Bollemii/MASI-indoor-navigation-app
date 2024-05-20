import { useEffect, useState } from "react";
import { Subscription } from 'expo-modules-core';
import { Pedometer } from "expo-sensors";

export default function usePedometer() {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [steps, setSteps] = useState(0);

    useEffect(() => {
        setSubscription(Pedometer.watchStepCount(result => {
            setSteps(result.steps);
        }));
        return () => {
            subscription && subscription.remove();
            setSubscription(null);
        }
    }, []);

    return steps;
};