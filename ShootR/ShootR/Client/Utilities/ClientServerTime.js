var ClientServerTime = (function () {
    function ClientServerTime() {
        this.Delta = 0;
    }
    ClientServerTime.prototype.GetServerTime = function (serverTime) {
        return serverTime + this.Delta;
    };
    ClientServerTime.prototype.ToServerTime = function (time) {
        return time - this.Delta;
    };
    return ClientServerTime;
})();
//@ sourceMappingURL=ClientServerTime.js.map
