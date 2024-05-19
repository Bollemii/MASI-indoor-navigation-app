import { WaypointType } from "@/models/waypointType";
import { names, QueryProps } from "./database";

export const getNavigableWaypointsQuery = () : QueryProps => {
    return {
        query: `MATCH (w:${names.node.name}) WHERE w.${names.node.properties.type} = $type1 OR w.${names.node.properties.type} = $type2 RETURN w`,
        params: { type1: WaypointType.ROOM, type2: WaypointType.ENTRY_EXIT }
    };
};
