/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="../Utilities/UtilityFunctions.ts" />
var ShootR;
(function (ShootR) {
    var LatencyResolver = (function () {
        function LatencyResolver(serverAdapter) {
            var _this = this;
            this._tryCount = 0;
            this._requestedAt = null;
            this._pingData = new Array();
            this.Latency = "...";

            serverAdapter.OnPingRequest.Bind(function () {
                if (_this._requestedAt) {
                    _this.AddData(new Date().getTime() - _this._requestedAt.getTime());
                    _this._requestedAt = null;
                }
            });
        }
        LatencyResolver.prototype.TryRequestPing = function () {
            if (++this._tryCount % LatencyResolver.REQUEST_PING_EVERY === 0) {
                this._requestedAt = new Date();

                return true;
            }

            return false;
        };

        LatencyResolver.prototype.AddData = function (timeElapsed) {
            if (this._pingData.length === LatencyResolver.PING_DATA_POINTS) {
                this._pingData.shift();
            }

            this._pingData.push(timeElapsed);

            this.UpdateLatency();
        };

        LatencyResolver.prototype.UpdateLatency = function () {
            var validItemCount = 0, totalValue = 0, standardDeviation = ShootR.StandardDeviation(this._pingData), baseAverage = ShootR.Average(this._pingData);

            for (var i = 0; i < this._pingData.length; i++) {
                if (Math.abs(this._pingData[i] - baseAverage) <= standardDeviation) {
                    validItemCount++;
                    totalValue += this._pingData[i];
                }
            }

            if (validItemCount > 0) {
                this.Latency = Math.round(totalValue / validItemCount).toString() + "ms";
            }
        };
        LatencyResolver.REQUEST_PING_EVERY = 5;
        LatencyResolver.PING_DATA_POINTS = 100;
        return LatencyResolver;
    })();
    ShootR.LatencyResolver = LatencyResolver;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=LatencyResolver.js.map
