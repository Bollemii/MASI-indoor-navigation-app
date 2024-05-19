import { Waypoint } from "@/models/waypoint";
import { names, QueryProps } from "./database";

export const createWaypointQuery = (waypoint: Waypoint) : QueryProps => {
    return {
        query: `CREATE (w:${names.node.name} {${names.node.properties.id}: $id, ${names.node.properties.name}: $name, ${names.node.properties.type}: $type}) RETURN w`,
        params: { id: waypoint.id, name: waypoint.name, type: waypoint.type }
    };
};
