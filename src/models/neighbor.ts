import { WaypointType } from "./waypointType";

export enum StageChange {
    UP = 1,
    DOWN = -1
};

export class Neighbor {
    private _id: string;
    private _type: WaypointType;
    private _distance: number;
    private _fromStage?: StageChange; // waypoint -> neighbor
    private _toStage?: StageChange; // neighbor -> waypoint
    private _fromOrientation?: number; // waypoint -> neighbor
    private _toOrientation?: number; // neighbor -> waypoint

    constructor() {}

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get type(): WaypointType {
        return this._type;
    }

    set type(type: WaypointType) {
        this._type = type;
    }

    get distance(): number {
        return this._distance;
    }

    set distance(distance: number) {
        this._distance = distance;
    }

    get fromStage(): StageChange {
        return this._fromStage;
    }

    set fromStage(fromStage: StageChange) {
        this._fromStage = fromStage;
    }

    get toStage(): StageChange {
        return this._toStage;
    }

    set toStage(toStage: StageChange) {
        this._toStage = toStage;
    }

    get fromOrientation(): number {
        return this._fromOrientation;
    }

    set fromOrientation(fromOrientation: number) {
        this._fromOrientation = fromOrientation;
    }

    get toOrientation(): number {
        return this._toOrientation;
    }

    set toOrientation(toOrientation: number) {
        this._toOrientation = toOrientation;
    }
}