/// <reference path="../Ship/ShipController.ts" />
/// <reference path="../Space/Map.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
var EnvironmentMonitor = (function () {
    function EnvironmentMonitor(_myShip) {
        this._myShip = _myShip;
        this._latency = $("#Latency");
        this._worldTargets = $("#WorldTargets");
        this._worldBullets = $("#WorldBullets");
        this._area = $("#Area");
        this._areaLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    }
    EnvironmentMonitor.prototype.Update = function (payload) {
        var mapSize = Map2.WIDTH, areaSize = Math.max(Math.round(mapSize / 26), 1000);

        this._latency.html(this._myShip.LatencyResolver.Latency);
        this._worldBullets.html(payload.BulletsInWorld);
        this._worldTargets.html(payload.ShipsInWorld);
    };
    return EnvironmentMonitor;
})();
