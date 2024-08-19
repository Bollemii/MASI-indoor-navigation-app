import { useState } from "react";
import { Neo4jError, Session } from "neo4j-driver";

import { driver } from "@/dataaccess/database";

const MAX_RETRIES = 4;

export const useLazyCypher = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const runQuery = async (cypher: string, params: object) => {
        setLoading(true);
        const session = driver.session();
        try {
            const records = await exponentialRetry(cypher, params, session);            
            setResult(records);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
            session.close();
        }
    };

    return [result, error as Neo4jError, loading, runQuery] as const;
};

const exponentialRetry = async (cypher: string, params: object, session: Session, depth: number = 0) => {
    const delay = (Math.pow(5, depth) + Math.random() * depth) * depth;
    try {
        const { records } = await session.run(cypher, params);
        return records;
    } catch (error) {
        if (depth >= MAX_RETRIES) {            
            throw error;
        } else if (error.code === 'ServiceUnavailable') {
            await new Promise(resolve => setTimeout(resolve, delay));
            return exponentialRetry(cypher, params, session, depth + 1);
        } else {
            throw error;
        }
    }
}
