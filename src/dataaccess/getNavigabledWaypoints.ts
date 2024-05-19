import { WaypointType } from "@/models/waypointType";
import { QueryProps } from "./database";

export const getNavigableWaypointsQuery = () : QueryProps => {
    return {
        query: "MATCH (w:Waypoint) WHERE w.type = $type1 OR w.type = $type2 RETURN w",
        params: { type1: WaypointType.ROOM, type2: WaypointType.ENTRY_EXIT }
    };
};
