import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';

import Router from '@/router/Router';

export default function App() {
    return (
        <RootSiblingParent>
            <Router/>
            <StatusBar hidden={true}/>
        </RootSiblingParent>
    );
}
