/// <reference path="../TouchController.ts" />

class MouseAdapter {
    private _guid: number = 0;
    private _currentGUID: number = 0;

    constructor (private _proxy: TouchController, private _handleStart: Function, private _handleMove: Function, private _handleStop: Function) {
    }

    public Start(e: any): void {
        e.preventDefault();

        e.identifier = this._currentGUID = this._guid++;
        this._handleStart.call(this._proxy, e);
    }

    public Move(e: any): void {
        e.preventDefault();

        e.identifier = this._currentGUID;
        this._handleMove.call(this._proxy, e);
    }

    public Stop(e: any): void {
        e.preventDefault();

        e.identifier = this._currentGUID;
        this._handleStop.call(this._proxy, e);
    }
}