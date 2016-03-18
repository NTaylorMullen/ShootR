/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Ships/Ship.ts" />
/// <reference path="../Ships/ShipLifeController.ts" />

module ShootR {

    export class ShipStatMonitor {
        private _lastSpeed: number;
        private _lastIncreasedLife: number;
        private _lastDamage: number;

        private _speedHolder: JQuery = $("#Speed");
        private _healthHolder: JQuery = $("#IncreasedHealth");
        private _damageHolder: JQuery = $("#IncreasedDamage");

        constructor() {
        }

        public Update(ship: Ship): void {
            var speed = Math.round(Math.sqrt(Math.pow(ship.MovementController.Velocity.X, 2) + Math.pow(ship.MovementController.Velocity.Y, 2))),
                increasedLife = ship.LifeController.MaxHealth - ShipLifeController.START_LIFE,
                increasedDamage = Math.round((ship.LevelManager.Level - 1) * Ship.DAMAGE_INCREASE_RATE * 10) / 10;

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
        }
    }

}