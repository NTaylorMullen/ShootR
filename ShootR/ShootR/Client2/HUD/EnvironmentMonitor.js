/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Space/Map.ts" />
/// <reference path="../Space/AreaRenderer.ts" />
/// <reference path="../Ships/Ship.ts" />
/// <reference path="../User/UserShipManager.ts" />
var ShootR;
(function (ShootR) {
    var EnvironmentMonitor = (function () {
        function EnvironmentMonitor(_areaRenderer, _userShipManager) {
            this._areaRenderer = _areaRenderer;
            this._userShipManager = _userShipManager;
            this._latency = $("#Latency");
            this._worldTargets = $("#WorldTargets");
            this._worldBullets = $("#WorldBullets");
            this._area = $("#Area");
        }
        EnvironmentMonitor.prototype.LoadPayload = function (payload) {
            this._latency.text(this._userShipManager.LatencyResolver.Latency);
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
