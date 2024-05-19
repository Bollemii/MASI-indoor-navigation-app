import { QueryProps, names } from "./database";

export const getWaypointsNumber = () : QueryProps => {
    return {
        query: `MATCH (w:${names.node.name}) RETURN count(*) as count`,
        params: {}
    };
}
