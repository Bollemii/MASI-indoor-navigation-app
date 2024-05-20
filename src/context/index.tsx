import NavigationContextProvider from "./navigationContext";
import NeighborContextProvider from "./neighborContext";
import WaypointContextProvider from "./waypointContext";

export default function ContextsProvider({ children }) {
    return (
        <WaypointContextProvider>
            <NeighborContextProvider>
                <NavigationContextProvider>
                    {children}
                </NavigationContextProvider>
            </NeighborContextProvider>
        </WaypointContextProvider>
    );
}
