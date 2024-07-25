import { useEffect, useState } from "react";

import { getPreference, PREFERENCES_KEYS } from "@/dataaccess/preferencesDB";

export default function useSavedLocale() {
    const [locale, setLocale] = useState<string | null>(null);

    useEffect(() => {
        const getLocale = async () => {
            const savedLocale = await getPreference(PREFERENCES_KEYS.LANGUAGE);
            if (savedLocale) {
                setLocale(savedLocale);
            }
        };

        getLocale();
    }, []);

    return locale;
};
