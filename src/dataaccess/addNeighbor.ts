import { Neighbor } from "@/models/neighbor";
import { names, QueryProps } from "./database";
import { Waypoint } from "@/models/waypoint";
import { WaypointTypeStages } from "@/models/waypointType";

export const addNeighborQuery = (waypoint: Waypoint, neighbor: Neighbor) : QueryProps => {
    if (WaypointTypeStages.includes(waypoint.type) && WaypointTypeStages.includes(neighbor.type)) {
        return {
            query: `MATCH (w1:${names.node.name} {${names.node.properties.id}: $waypointId}), (w2:${names.node.name} {${names.node.properties.id}: $neighborId}) CREATE (w1)-[:${names.relationship.name} {${names.relationship.properties.distance}: $fromDistance, ${names.relationship.properties.stageChange}: $fromStage}]->(w2), (w2)-[:${names.relationship.name} {${names.relationship.properties.distance}: $toDistance, ${names.relationship.properties.stageChange}: $toStage}]->(w1) RETURN w2`,
            params: { waypointId: waypoint.id, neighborId: neighbor.id, fromDistance: neighbor.distance, fromStage: neighbor.fromStage, toDistance: neighbor.distance, toStage: neighbor.toStage }
        };
    } else {
        return {
            query: `MATCH (w1:${names.node.name} {${names.node.properties.id}: $waypointId}), (w2:${names.node.name} {${names.node.properties.id}: $neighborId}) CREATE (w1)-[:${names.relationship.name} {${names.relationship.properties.distance}: $fromDistance, ${names.relationship.properties.orientation}: $fromOrientation}]->(w2), (w2)-[:${names.relationship.name} {${names.relationship.properties.distance}: $toDistance, ${names.relationship.properties.orientation}: $toOrientation}]->(w1) RETURN w2`,
            params: { waypointId: waypoint.id, neighborId: neighbor.id, fromDistance: neighbor.distance, fromOrientation: neighbor.fromOrientation, toDistance: neighbor.distance, toOrientation: neighbor.toOrientation }
        };
    }
};
