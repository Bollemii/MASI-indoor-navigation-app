export enum StageChange {
    UP = 1,
    DOWN = -1
};

export class Neighbor {
    private _id: string;
    private _distance: number;
    private _fromStage?: StageChange;
    private _fromOrientation?: number; // waypoint -> neighbor
    private _toOrientation?: number; // neighbor -> waypoint

    constructor() {}

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get distance() {
        return this._distance;
    }

    set distance(distance) {
        this._distance = distance;
    }

    get fromStage() {
        return this._fromStage;
    }

    set fromStage(fromStage) {
        this._fromStage = fromStage;
    }

    get fromOrientation() {
        return this._fromOrientation;
    }

    set fromOrientation(fromOrientation) {
        this._fromOrientation = fromOrientation;
    }

    get toOrientation() {
        return this._toOrientation;
    }

    set toOrientation(toOrientation) {
        this._toOrientation = toOrientation;
    }
}