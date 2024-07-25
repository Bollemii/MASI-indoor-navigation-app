import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

// Locale priority: 
// 1. Device locale
// 2. Env locale
// 3. EN (default)

const AVAILABLE_LANGUAGES = ['en', 'fr', 'nl'];

const i18n = new I18n();

function setupI18n() {
    i18n.translations = {
        en: require('./en.json'),
        fr: require('./fr.json'),
        nl: require('./nl.json'),
    };
    let deviceLanguage = getLocales()[0].languageCode;
    if (!AVAILABLE_LANGUAGES.includes(deviceLanguage)) {
        deviceLanguage = null;
    }
    i18n.defaultLocale = 'en';
    i18n.locale = deviceLanguage ?? process.env.EXPO_PUBLIC_LOCALE ?? 'en';
    console.log(`Device language: ${deviceLanguage}`);
    console.log(`Current language: ${i18n.locale}`);
}

export function changeLanguage(language: string) {
    if (!AVAILABLE_LANGUAGES.includes(language)) {
        console.error(`Language ${language} is not available`);
        return;
    }
    i18n.locale = language;
};

export function getCurrentLanguage() {
    return i18n.locale;
};

export function t(key: string, options?: any) {
    return i18n.t(key, options);
};

export function getAvailableLanguages() {
    return AVAILABLE_LANGUAGES;
};

setupI18n();
