export class Neighbor {
    private _id: string;
    private _distance: number;
    private _fromOrientation: number;
    private _toOrientation: number;

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