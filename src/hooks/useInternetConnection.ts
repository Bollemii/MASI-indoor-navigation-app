import { getNetworkStateAsync } from "expo-network";
import { useEffect, useState } from "react";

export default function useInternetConnection() {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        getNetworkStateAsync().then((networkState) => {
            setIsConnected(networkState.isInternetReachable);
        });
    }, []);

    return isConnected;
}
