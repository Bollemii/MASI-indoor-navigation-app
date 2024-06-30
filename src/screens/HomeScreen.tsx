import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { routes } from '@/router/routes';
import { t } from '@/locales/i18n';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { layout } from '@/styles/layout';
import Button from '@/components/Button';
import { useWaypointContext } from '@/context/waypointContext';
import { useNeighborContext } from '@/context/neighborContext';
import { useNavigationContext } from '@/context/navigationContext';

export default function HomeScreen() {
    const navigation = useNavigation();
    const { setWaypointCtx } = useWaypointContext();
    const { setNeighborCtx } = useNeighborContext();
    const { setNavigationCtx } = useNavigationContext();

    useEffect(() => {
        setWaypointCtx(null);
        setNeighborCtx(null);
        setNavigationCtx(null);
    }, []);

    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>{t("navigationApp")}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    text={t("installation")}
                    onPress={() => (navigation.navigate(routes.ADD_POINT))}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
                <Button
                    text={t("navigation")}
                    onPress={() => {navigation.navigate(routes.START_SCAN)}}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.brown,
    },
    title: {
        fontSize: fonts.size.title,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.white,
    },
    buttonContainer: {
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        height: 70,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: layout.borderRadius.normal,
    },
    buttonText: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 16,
    },
});
