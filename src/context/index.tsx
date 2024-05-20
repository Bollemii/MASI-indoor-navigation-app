import NeighborContextProvider from "./neighborContext";
import WaypointContextProvider from "./waypointContext";

export default function ContextsProvider({ children }) {
    return (
        <WaypointContextProvider>
            <NeighborContextProvider>
                {children}
            </NeighborContextProvider>
        </WaypointContextProvider>
    );
}
