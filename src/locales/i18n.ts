import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

const AVAILABLE_LANGUAGES = ['en', 'fr'];

const i18n = new I18n({
    en: require('./en.json'),
    fr: require('./fr.json'),
});
const deviceLanguage = getLocales()[0].languageCode ?? 'en';
i18n.defaultLocale = process.env.EXPO_PUBLIC_LOCALE ?? 'en';
i18n.locale = AVAILABLE_LANGUAGES.includes(deviceLanguage) ? deviceLanguage : 'en';
export { i18n };

export function changeLanguage(language: string) {
    if (!AVAILABLE_LANGUAGES.includes(language)) {
        console.error(`Language ${language} is not available`);
        return;
    }
    i18n.locale = language;
};
