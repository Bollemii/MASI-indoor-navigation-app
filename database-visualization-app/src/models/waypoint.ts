import { WaypointType } from "./waypointType";

export class Waypoint {
    private _id: string = "";
    private _name: string = "";
    private _type?: WaypointType;

    constructor(id: string, name: string, type: WaypointType) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    get id() : string {
        return this._id;
    }

    set id(id : string) {
        this._id = id;
    }

    get name() : string {
        return this._name;
    }

    set name(name : string) {
        this._name = name;
    }

    get type() : WaypointType {
        if (!this._type) {
            throw new Error("Type is not set");
        }
        return this._type;
    }

    set type(type : WaypointType) {
        if (!type) {
            throw new Error("Type is required");
        }
        this._type = type;
    }
}
