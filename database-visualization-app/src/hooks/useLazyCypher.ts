import { useState } from "react";
import { Record, RecordShape } from "neo4j-driver";

import { driver } from "../dataaccess/database";

export const useLazyCypher = () => {
    const [result, setResult] = useState<null | Record<RecordShape, PropertyKey, RecordShape<PropertyKey, number>>[]>(null);
    const [loading, setLoading] = useState(false);

    const runQuery = async (cypher: string, params: object) => {
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