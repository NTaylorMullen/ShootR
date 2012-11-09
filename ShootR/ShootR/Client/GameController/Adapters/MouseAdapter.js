var MouseAdapter = (function () {
    function MouseAdapter(_proxy, _handleStart, _handleMove, _handleStop) {
        this._proxy = _proxy;
        this._handleStart = _handleStart;
        this._handleMove = _handleMove;
        this._handleStop = _handleStop;
        this._guid = 0;
        this._currentGUID = 0;
    }
    MouseAdapter.prototype.Start = function (e) {
        e.preventDefault();
        e.identifier = this._currentGUID = this._guid++;
        this._handleStart.call(this._proxy, e);
    };
    MouseAdapter.prototype.Move = function (e) {
        e.preventDefault();
        e.identifier = this._currentGUID;
        this._handleMove.call(this._proxy, e);
    };
    MouseAdapter.prototype.Stop = function (e) {
        e.preventDefault();
        e.identifier = this._currentGUID;
        this._handleStop.call(this._proxy, e);
    };
    return MouseAdapter;
})();
//@ sourceMappingURL=MouseAdapter.js.map
