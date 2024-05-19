import { Neighbor } from "@/models/neighbor";
import { names, QueryProps } from "./database";

export const addNeighborQuery = (waypointId: string, neighbor: Neighbor) : QueryProps => {
    return {
        query: `MATCH (w1:${names.node.name} {${names.node.properties.id}: $waypointId}), (w2:${names.node.name} {${names.node.properties.id}: $neighborId}) CREATE (w1)-[:${names.relationship.name} {${names.relationship.properties.distance}: $distance, ${names.relationship.properties.orientation}: $fromOrientation}]->(w2), (w2)-[:${names.relationship.name} {${names.relationship.properties.distance}: $distance, ${names.relationship.properties.orientation}: $toOrientation}]->(w1)`,
        params: { waypointId, neighborId: neighbor.id, distance: neighbor.distance, fromOrientation: neighbor.fromOrientation, toOrientation: neighbor.toOrientation}
    };
};
