import { QueryProps, names } from "./database";

export const getShortestPathQuery = (startId: string, endId: string) : QueryProps => {
    return {
        query: `MATCH (start:${names.node.name} {${names.node.properties.id}: $startId}), (end:${names.node.name} {${names.node.properties.id}: $endId}), p = shortestPath((start)-[:${names.relationship.name}*]->(end)) RETURN p`,
        params: { startId, endId }
    };
};
