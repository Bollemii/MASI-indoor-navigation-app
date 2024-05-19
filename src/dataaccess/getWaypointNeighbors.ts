import { names, QueryProps } from "./database";

export const getWaypointNeighborsQuery = (id: string) : QueryProps => {
    return {
        query: `MATCH (w:${names.node.name} {${names.node.properties.id}: $id})-[:${names.relationship.name}]->(n) RETURN n`,
        params: { id }
    };
};
