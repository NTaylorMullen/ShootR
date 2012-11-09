/// <reference path="../TouchController.ts" />

class TouchAdapter {
    constructor (private _proxy: TouchController, private _handleStart: Function, private _handleMove: Function, private _handleStop: Function) {
    }

    public Start(e: any): void {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            this._handleStart.call(this._proxy, touch);
        }
    }

    public Move(e: any): void {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            this._handleMove.call(this._proxy, touch);
        }
    }

    public Stop(e: any): void {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            this._handleStop.call(this._proxy, touch)
        }
    }
}