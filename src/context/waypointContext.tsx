import { Waypoint } from "@/models/waypoint";
import { createContext, useContext, useState } from "react";

export const WaypointContext = createContext<{waypointCtx: Waypoint | null, setWaypointCtx: (waypoint: Waypoint) => void}>({waypointCtx: null, setWaypointCtx: () => {}});

export default function WaypointContextProvider({ children }) {
    const [waypointCtx, setWaypointCtx] = useState<Waypoint | null>(null);

    return (
        <WaypointContext.Provider value={{waypointCtx, setWaypointCtx}}>
            {children}
        </WaypointContext.Provider>
    );
};

export function useWaypointContext() {
    return useContext(WaypointContext);
}
