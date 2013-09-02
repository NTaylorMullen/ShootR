/// <reference path="../TouchController.ts" />
var TouchAdapter = (function () {
    function TouchAdapter(_proxy, _handleStart, _handleMove, _handleStop) {
        this._proxy = _proxy;
        this._handleStart = _handleStart;
        this._handleMove = _handleMove;
        this._handleStop = _handleStop;
    }
    TouchAdapter.prototype.Start = function (e) {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            this._handleStart.call(this._proxy, touch);
        }
    };

    TouchAdapter.prototype.Move = function (e) {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            this._handleMove.call(this._proxy, touch);
        }
    };

    TouchAdapter.prototype.Stop = function (e) {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            this._handleStop.call(this._proxy, touch);
        }
    };
    return TouchAdapter;
})();
//# sourceMappingURL=TouchAdapter.js.map
