import { View, Text, StyleSheet } from 'react-native';

import { routes } from '@/router/routes';
import { i18n } from '@/locales/i18n';
import { fonts } from '@/styles/fonts';
import BackButton from '@/components/BackButton';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <BackButton text={i18n.t("back")} pageRedirect={routes.HOME}/>
            <Text style={styles.title}>{i18n.t("notFound")}</Text>
        </View>
    ); 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: fonts.size.title,
    },
});
