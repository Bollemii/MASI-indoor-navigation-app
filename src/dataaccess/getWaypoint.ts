import { names, QueryProps } from "./database";

export const getWaypointQuery = (id: string) : QueryProps => {
    return {
        query: `MATCH (w:${names.node.name}) WHERE w.${names.node.properties.id} = $id RETURN w`,
        params: { id }
    };
};
