import { Neighbor } from "@/models/neighbor";
import { createContext, useContext, useState } from "react";

export const NeighborContext = createContext<{ neighborCtx: Neighbor | null, setNeighborCtx: (neighbor: Neighbor) => void }>({ neighborCtx: null, setNeighborCtx: () => {} });

export default function NeighborContextProvider({ children }) {
    const [neighborCtx, setNeighborCtx] = useState<Neighbor | null>(null);

    return (
        <NeighborContext.Provider value={{ neighborCtx, setNeighborCtx }}>
            {children}
        </NeighborContext.Provider>
    );
};

export function useNeighborContext() {
    return useContext(NeighborContext);
}
