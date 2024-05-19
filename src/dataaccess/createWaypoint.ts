import { Waypoint } from "@/models/waypoint";
import { QueryProps } from "./database";

export const createWaypointQuery = (waypoint: Waypoint) : QueryProps => {
    return {
        query: "CREATE (w:Waypoint {id: $id, name: $name, type: $type}) RETURN w",
        params: { id: waypoint.id, name: waypoint.name, type: waypoint.type }
    };
};
