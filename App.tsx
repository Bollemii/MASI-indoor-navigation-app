import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';

import Router from '@/router/Router';
import WaypointContextProvider from '@/context/waypointContext';

export default function App() {
    return (
        <RootSiblingParent>
            <WaypointContextProvider>
                <Router/>
                <StatusBar hidden={true}/>
            </WaypointContextProvider>
        </RootSiblingParent>
    );
}
