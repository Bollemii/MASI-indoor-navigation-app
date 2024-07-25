import AsyncStorage from "@react-native-async-storage/async-storage";

export const PREFERENCES_KEYS = {
    LANGUAGE: 'language',
};

export async function getPreference(key: string) {
    if (!Object.values(PREFERENCES_KEYS).includes(key)) {
        console.error(`Preference ${key} is not available`);
        return null;
    }

    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        console.error(`Error getting preference ${key}: ${e}`);
        return null;
    }
};

export async function setPreference(key: string, value: string) {
    if (!Object.values(PREFERENCES_KEYS).includes(key)) {
        console.error(`Preference ${key} is not available`);
        return;
    }

    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error(`Error setting preference ${key}: ${e}`);
    }
};
