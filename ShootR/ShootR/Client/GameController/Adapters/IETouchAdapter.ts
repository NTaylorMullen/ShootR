/// <reference path="../TouchController.ts" />

class IETouchAdapter {

    constructor (private _proxy: TouchController, private _handleStart: Function, private _handleMove: Function, private _handleStop: Function) {
    }

    private stopAndConvert(e: any): any {
        e.preventDefault();

        var touch = e;

        touch.identifier = e.pointerId;

        return touch;
    }

    public Start(e: any): void {
        this._handleStart.call(this._proxy, this.stopAndConvert(e));
    }

    public Move(e: any): void {
        this._handleMove.call(this._proxy, this.stopAndConvert(e));
    }

    public Stop(e: any): void {
        this._handleStop.call(this._proxy, this.stopAndConvert(e))
    }
}