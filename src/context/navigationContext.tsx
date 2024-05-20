import { createContext, useContext, useState } from "react";
import { Waypoint } from "@/models/waypoint";

type NavigationContextType = {
    start: Waypoint | null;
    end: Waypoint | null;
    path: Waypoint[] | null;
    id: number | null;
};

export const NavigationContext = createContext<{
    navigationCtx: NavigationContextType | null,
    setStart: (start: Waypoint) => void,
    setEnd: (end: Waypoint) => void,
    setPath: (path: Waypoint[]) => void,
    incrId: () => void,
    setNavigationCtx: (navigation: NavigationContextType | null) => void }>
    ({ navigationCtx: null, setStart: () => {}, setEnd: () => {}, setPath: () => {}, incrId: () => {}, setNavigationCtx: () => {} });

export default function NavigationContextProvider({ children }) {
    const [navigationCtx, setNavigationCtx] = useState<NavigationContextType | null>(null);

    const createNavigationCtx = () => {
        setNavigationCtx({ start: null, end: null, path: null, id: null });
    }

    const setPath = (path: Waypoint[]) => {
        if (!navigationCtx) createNavigationCtx();

        setNavigationCtx({ ...navigationCtx, path , id: 0});
    };
    const setStart = (start: Waypoint) => {
        if (!navigationCtx) createNavigationCtx();
        
        setNavigationCtx({ ...navigationCtx, start });
    };
    const setEnd = (end: Waypoint) => {
        if (!navigationCtx) createNavigationCtx();
        
        setNavigationCtx({ ...navigationCtx, end });
    };
    const incrId = () => {
        if (!navigationCtx) createNavigationCtx();
        
        setNavigationCtx({ ...navigationCtx, id: navigationCtx.id ? navigationCtx.id + 1 : 1 });
    };

    return (
        <NavigationContext.Provider value={{ navigationCtx, setStart, setEnd, setPath, incrId, setNavigationCtx }}>
            {children}
        </NavigationContext.Provider>
    );
};

export function useNavigationContext() {
    return useContext(NavigationContext);
}
