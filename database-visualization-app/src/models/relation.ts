export class Relation {
    private _start: string = "";
    private _end: string = "";

    constructor(start: string, end: string) {
        this.start = start;
        this.end = end;
    }

    get start() : string {
        return this._start;
    }

    set start(start : string) {
        this._start = start;
    }

    get end() : string {
        return this._end;
    }

    set end(end : string) {
        this._end = end;
    }
};
