var IETouchAdapter = (function () {
    function IETouchAdapter(_proxy, _handleStart, _handleMove, _handleStop) {
        this._proxy = _proxy;
        this._handleStart = _handleStart;
        this._handleMove = _handleMove;
        this._handleStop = _handleStop;
    }
    IETouchAdapter.prototype.stopAndConvert = function (e) {
        e.preventDefault();
        var touch = e;
        touch.identifier = e.pointerId;
        return touch;
    };
    IETouchAdapter.prototype.Start = function (e) {
        this._handleStart.call(this._proxy, this.stopAndConvert(e));
    };
    IETouchAdapter.prototype.Move = function (e) {
        this._handleMove.call(this._proxy, this.stopAndConvert(e));
    };
    IETouchAdapter.prototype.Stop = function (e) {
        this._handleStop.call(this._proxy, this.stopAndConvert(e));
    };
    return IETouchAdapter;
})();
//@ sourceMappingURL=IETouchAdapter.js.map
