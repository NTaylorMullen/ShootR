/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Ships/Ship.ts" />
/// <reference path="../Ships/ShipLifeController.ts" />

module ShootR {

    export class ShipStatMonitor {
        private _speedHolder: JQuery = $("#Speed");
        private _healthHolder: JQuery = $("#IncreasedHealth");
        private _damageHolder: JQuery = $("#IncreasedDamage");

        constructor() {
        }

        public Update(ship: Ship): void {
            var speed = Math.round(Math.sqrt(Math.pow(ship.MovementController.Velocity.X, 2) + Math.pow(ship.MovementController.Velocity.Y, 2))),
                increasedLife = ship.LifeController.MaxHealth - ShipLifeController.START_LIFE,
                increasedDamage = Math.round((ship.LevelManager.Level - 1) * Ship.DAMAGE_INCREASE_RATE * 10) / 10;

            this._speedHolder.text(speed.toString());
            this._healthHolder.text(increasedLife.toString());
            this._damageHolder.text(increasedDamage.toString());
        }
    }

}