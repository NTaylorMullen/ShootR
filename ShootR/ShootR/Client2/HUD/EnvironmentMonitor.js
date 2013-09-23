/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Space/Map.ts" />
/// <reference path="../Space/AreaRenderer.ts" />
/// <reference path="../Ships/Ship.ts" />
var ShootR;
(function (ShootR) {
    var EnvironmentMonitor = (function () {
        function EnvironmentMonitor(_areaRenderer) {
            this._areaRenderer = _areaRenderer;
            this._latency = $("#Latency");
            this._worldTargets = $("#WorldTargets");
            this._worldBullets = $("#WorldBullets");
            this._area = $("#Area");
        }
        EnvironmentMonitor.prototype.LoadPayload = function (payload) {
            //this._latency.html(this._myShip.LatencyResolver.Latency);
            this._worldBullets.text(payload.BulletsInWorld.toString());
            this._worldTargets.text(payload.ShipsInWorld.toString());
        };

        EnvironmentMonitor.prototype.Update = function (ship) {
            this._area.text(this._areaRenderer.AreaFromPosition(ship.MovementController.Position).toString());
        };
        return EnvironmentMonitor;
    })();
    ShootR.EnvironmentMonitor = EnvironmentMonitor;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=EnvironmentMonitor.js.map
