import neo4j from 'neo4j-driver';

const URI = process.env.REACT_APP_NEO4J_URI || process.env.NEO4J_URI;
const USER = process.env.REACT_APP_NEO4J_USER || process.env.NEO4J_USER;
const PASSWORD = process.env.REACT_APP_NEO4J_PASSWORD || process.env.NEO4J_PASSWORD;

if (!URI || !USER || !PASSWORD) {
    throw new Error('Missing environment variables for Neo4j');
}

const driver = neo4j.driver(
    URI,
    neo4j.auth.basic(USER, PASSWORD),
);
export { driver };

export type QueryProps = {
    query: string;
    params: object;
};

export namespace names {
    export const node = {
        name: "Waypoint",
        properties: {
            id: "id",
            name: "name",
            type: "type"
        },
    };
    export const relationship = {
        name: "CONNECTED_TO",
        properties: {
            distance: "distance",
            orientation: "orientation",
            stageChange: "stage"
        }
    };
};