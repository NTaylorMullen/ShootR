/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
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

            if (this._lastSpeed !== speed) {
                this._speedHolder[0].innerHTML = speed.toString();
                this._lastSpeed = speed;
            }

            if (this._lastIncreasedLife !== increasedLife) {
                this._healthHolder[0].innerHTML = increasedLife.toString();
                this._lastIncreasedLife = increasedLife;
            }

            if (this._lastDamage !== increasedDamage) {
                this._damageHolder[0].innerHTML = increasedDamage.toString();
                this._lastDamage = increasedDamage;
            }
        };
        return ShipStatMonitor;
    })();
    ShootR.ShipStatMonitor = ShipStatMonitor;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipStatMonitor.js.map
