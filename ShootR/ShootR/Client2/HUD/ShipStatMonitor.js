/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Ships/Ship.ts" />
/// <reference path="../Ships/ShipLifeController.ts" />
var ShootR;
(function (ShootR) {
    var ShipStatMonitor = (function () {
        function ShipStatMonitor() {
            this._speedHolder = $("#Speed");
            this._healthHolder = $("#IncreasedHealth");
            this._damageHolder = $("#IncreasedDamage");
        }
        ShipStatMonitor.prototype.Update = function (ship) {
            var speed = Math.round(Math.sqrt(Math.pow(ship.MovementController.Velocity.X, 2) + Math.pow(ship.MovementController.Velocity.Y, 2))), increasedLife = ship.LifeController.MaxHealth - ShootR.ShipLifeController.START_LIFE, increasedDamage = Math.round((ship.LevelManager.Level - 1) * ShootR.Ship.DAMAGE_INCREASE_RATE * 10) / 10;

            this._speedHolder.text(speed.toString());
            this._healthHolder.text(increasedLife.toString());
            this._damageHolder.text(increasedDamage.toString());
        };
        return ShipStatMonitor;
    })();
    ShootR.ShipStatMonitor = ShipStatMonitor;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipStatMonitor.js.map
