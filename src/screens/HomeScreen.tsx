import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { routes } from '@/router/routes';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { layout } from '@/styles/layout';
import Button from '@/components/Button';

export default function HomeScreen() {
    const navigation = useNavigation();

    const navigateTo = (screen: string) => {
        // @ts-expect-error: navigation type is not well defined
        navigation.navigate(screen);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Application{"\n"}de navigation</Text>
            <View style={styles.buttonContainer}>
                <Button
                    text='Ajouter un nouveau\npoint de passage'
                    onPress={() => (navigateTo(routes.installation.addPoint))}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
                <Button
                    text='Navigation'
                    onPress={() => {navigateTo(routes.navigation.startScan)}}
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
