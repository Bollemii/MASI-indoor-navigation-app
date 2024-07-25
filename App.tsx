import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import { StyleSheet, Text, View } from 'react-native';

import Router from '@/router/Router';
import ContextsProvider from '@/context';
import { colors } from '@/styles/colors';

export default function App() {
    const requiredEnvVars = [
        process.env.EXPO_PUBLIC_NEO4J_URI,
        process.env.EXPO_PUBLIC_NEO4J_USER,
        process.env.EXPO_PUBLIC_NEO4J_PASSWORD,
    ];
    if (requiredEnvVars.includes(undefined)) {
        console.error("Environment variables not set. Check .env.example file for more information.");
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Environment variables not set.</Text>
                <Text style={styles.text}>Check .env.example file for more information.</Text>
            </View>
        );
    }

    return (
        <RootSiblingParent>
            <ContextsProvider>
                <Router/>
                <StatusBar hidden={true}/>
            </ContextsProvider>
        </RootSiblingParent>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        marginVertical: 10,
        fontSize: 16,
        color: colors.red,
    }
});
