/// <reference path="ClientServerTime.ts" />
/// <reference path="UtilityFunctions.ts" />
var LatencyResolver = (function () {
    function LatencyResolver(_connection) {
        this._connection = _connection;
        this.SampleSize = 10;
        this.Latency = "...";
        this._pingCount = 0;
        this._deltas = [];
        this._CST = new ClientServerTime();
        this._requestedPingAt = false;
    }
    LatencyResolver.prototype.calculateDeltaTime = function (sentAt, serverTime) {
        var currentTime = new Date().getTime(), latency = this.CalculateLatencySince(sentAt);

        return (currentTime - serverTime + latency);
    };

    LatencyResolver.prototype.pushPingResults = function (sentAt, result) {
        this._deltas.push(this.calculateDeltaTime(sentAt, result));
    };

    LatencyResolver.prototype.RequestedPingBack = function () {
        if (!this._requestedPingAt) {
            this._requestedPingAt = new Date().getTime();
        }
    };

    LatencyResolver.prototype.ServerPingBack = function () {
        if (this._requestedPingAt) {
            this.Latency = this.CalculateLatencySince(this._requestedPingAt) + " ms";
            this._requestedPingAt = false;
        }
    };

    LatencyResolver.prototype.ResolveFromAcknowledgement = function (sentAt, serverAcknowledgedAt) {
        this.pushPingResults(sentAt, serverAcknowledgedAt);

        if (this._deltas.length === this.SampleSize) {
            this._CST.Delta = this.GenerateDeltaTime();
            this._deltas = [];
        }
    };

    LatencyResolver.prototype.CalculateLatencySince = function (sentAt) {
        return (new Date().getTime() - sentAt) / 2;
    };

    LatencyResolver.prototype.Resolve = function (callback) {
        var that = this;

        this._deltas = [];

        // Do an initial ping (this clears the network/readies the tunnel).
        this._connection.server.ping().done(GetDelta);

        function GetDelta() {
            // Calculate delta time
            var sentAt = new Date().getTime();
            this.connection.server.ping().done(function (result) {
                that.pushPingResults(sentAt, this._CST.GetServerTime(new Date(result).getTime()));

                if (++that._pingCount < that.SampleSize) {
                    GetDelta();
                } else if (that._pingCount === 1) {
                    that._CST.Delta = that._deltas[0];
                } else {
                    that._CST.Delta = that.GenerateDeltaTime();
                    that._deltas = [];
                    callback();
                }
            });
        }
    };

    LatencyResolver.prototype.GenerateDeltaTime = function () {
        this._deltas.sort();

        var standardDeviation = StandardDeviation(this._deltas), median = this._deltas[Math.floor(this._deltas.length / 2)];

        for (var i = 0; i < this._deltas.length; i++) {
            if (Math.abs(this._deltas[i] - median) >= standardDeviation) {
                this._deltas.splice(i--, 1);
            }
        }

        return Math.round(Average(this._deltas));
    };
    return LatencyResolver;
})();
//# sourceMappingURL=LatencyResolver.js.map
