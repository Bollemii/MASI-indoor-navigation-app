import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';

import Router from '@/router/Router';
import ContextsProvider from '@/context';

export default function App() {
    return (
        <RootSiblingParent>
            <ContextsProvider>
                <Router/>
                <StatusBar hidden={true}/>
            </ContextsProvider>
        </RootSiblingParent>
    );
}
