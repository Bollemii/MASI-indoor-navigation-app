import { Neighbor } from "./neighbor";
import { WaypointType } from "./waypointType";

export class Waypoint {
    private _id: string;
    private _name: string;
    private _type: WaypointType;
    private _neighbors: Neighbor[];

    constructor() {}

    get id() {
        return this._id;
    }

    set id(id : string) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name : string) {
        this._name = name;
    }

    get type() {
        return this._type;
    }

    set type(type : WaypointType) {
        this._type = type;
    }

    get neighbors() {
        return this._neighbors;
    }

    addNeighbor(neighbor : Neighbor) {
        this._neighbors.push(neighbor);
    }
}
