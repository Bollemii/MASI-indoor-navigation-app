import { useState } from "react";
import { driver } from "@/dataaccess/database";

export const useLazyCypher = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const runQuery = async (cypher, params) => {
        setLoading(true);
        const session = driver.session();
        try {
            const { records } = await session.run(cypher, params);
            setResult(records);
        } catch (error) {
            console.error('Read query failed', error);
        } finally {
            setLoading(false);
            session.close();
        }
    };

    return [result, loading, runQuery] as const;
};