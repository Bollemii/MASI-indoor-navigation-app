import { StatusBar } from 'expo-status-bar';

import Router from '@/router/Router';

export default function App() {
    return (
        <>
            <Router/>
            <StatusBar hidden={true}/>
        </>
    );
}
