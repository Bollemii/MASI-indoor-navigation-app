import { QueryProps } from "./database";

export const getWaypointNeighborsQuery = (id: string) : QueryProps => {
    return {
        query: "MATCH (w:Waypoint {id: $id})-[:CONNECTED_TO]->(n) RETURN n",
        params: { id }
    };
};
