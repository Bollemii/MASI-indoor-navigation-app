import { createContext, useContext, useState } from "react";
import { Waypoint } from "@/models/waypoint";
import { StageChange } from "@/models/neighbor";

type Path = {
    start: { properties: Waypoint }
    end: { properties: Waypoint }
    relationship: { properties: { distance: number, orientation?: number, stageChange?: StageChange } }
};
type NavigationContextType = {
    start: Waypoint | null;
    end: Waypoint | null;
    path: Path[] | null;
};

export const NavigationContext = createContext<{
    navigationCtx: NavigationContextType | null,
    setStart: (start: Waypoint) => void,
    setEnd: (end: Waypoint) => void,
    setPath: (path: Path[]) => void,
    setNavigationCtx: (navigation: NavigationContextType | null) => void }>
    ({ navigationCtx: null, setStart: () => {}, setEnd: () => {}, setPath: () => {}, setNavigationCtx: () => {} });

export default function NavigationContextProvider({ children }) {
    const [navigationCtx, setNavigationCtx] = useState<NavigationContextType | null>(null);

    const createNavigationCtx = () => {
        setNavigationCtx({ start: null, end: null, path: null });
    }

    const setPath = (path: Path[]) => {
        if (!navigationCtx) createNavigationCtx();

        setNavigationCtx({ ...navigationCtx, path});
    };
    const setStart = (start: Waypoint) => {
        if (!navigationCtx) createNavigationCtx();
        
        setNavigationCtx({ ...navigationCtx, start });
    };
    const setEnd = (end: Waypoint) => {
        if (!navigationCtx) createNavigationCtx();
        
        setNavigationCtx({ ...navigationCtx, end });
    };

    return (
        <NavigationContext.Provider value={{ navigationCtx, setStart, setEnd, setPath, setNavigationCtx }}>
            {children}
        </NavigationContext.Provider>
    );
};

export function useNavigationContext() {
    return useContext(NavigationContext);
}
