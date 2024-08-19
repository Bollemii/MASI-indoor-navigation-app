import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import { StyleSheet, Text, View } from 'react-native';

import Router from '@/router/Router';
import ContextsProvider from '@/context';
import { colors } from '@/styles/colors';
import useInternetConnection from '@/hooks/useInternetConnection';
import { useEffect } from 'react';
import Toast from 'react-native-root-toast';
import { t } from '@/locales/i18n';

export default function App() {
    const isConnectionAvailable = useInternetConnection();

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

    useEffect(() => {
        if (!isConnectionAvailable) {
            console.error("No internet connection available.");
            Toast.show(t("toast.noInternet"), {
                position: Toast.positions.CENTER,
            });
        }
    }, [isConnectionAvailable]);

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
