import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

import { getPreference, setPreference, PREFERENCES_KEYS } from '@/dataaccess/preferencesDB';

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
    i18n.defaultLocale = 'en';
    let deviceLanguage = getLocales()[0].languageCode;
    if (!AVAILABLE_LANGUAGES.includes(deviceLanguage)) {
        deviceLanguage = null;
    }
    i18n.locale = deviceLanguage ?? process.env.EXPO_PUBLIC_LOCALE ?? 'en';
}

export function changeLanguage(language: string) {
    if (!AVAILABLE_LANGUAGES.includes(language)) {
        throw new Error(`Language ${language} is not available`);
    }
    i18n.locale = language;
    setPreference(PREFERENCES_KEYS.LANGUAGE, language);
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
