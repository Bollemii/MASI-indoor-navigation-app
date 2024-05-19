import { Neighbor } from "@/models/neighbor";
import { QueryProps } from "./database";

export const addNeighborQuery = (waypointId: string, neighbor: Neighbor) : QueryProps[] => {
    return [
        {
            query: "MATCH (w1:Waypoint {id: $waypointId}), (w2:Waypoint {id: $neighborId}) CREATE (w1)-[:CONNECTED_TO {distance: $distance, orientation: $orientation}]->(w2)",
            params: { waypointId, neighborId: neighbor.id, distance: neighbor.distance, fromOrientation: neighbor.fromOrientation }
        },
        {
            query: "MATCH (w1:Waypoint {id: $waypointId}), (w2:Waypoint {id: $neighborId}) CREATE (w2)-[:CONNECTED_TO {distance: $distance, orientation: $orientation}]->(w1)",
            params: { waypointId, neighborId: neighbor.id, distance: neighbor.distance, toOrientation: neighbor.toOrientation }
        }
    ];
};
