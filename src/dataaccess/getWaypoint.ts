import { QueryProps } from "./database";

export const getWaypointQuery = (id: string) : QueryProps => {
    return {
        query: "MATCH (w:Waypoint) WHERE w.id = $id RETURN w",
        params: { id }
    };
};
