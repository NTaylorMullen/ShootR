/// <reference path="../Ship/ShipController.ts" />
/// <reference path="../Ship/Ship.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />

class ShipStatMonitor {
    private _speedHolder: JQuery = $("#Speed");
    private _healthHolder: JQuery = $("#IncreasedHealth");
    private _damageHolder: JQuery = $("#IncreasedDamage");

    constructor (private _myShip: ShipController) {
    }

    public Update(): void {
        var speed = Math.round(Math.sqrt(Math.pow(this._myShip.MovementController.Velocity.X, 2) + Math.pow(this._myShip.MovementController.Velocity.Y, 2))),
            increasedLife = this._myShip.MaxLife - Ship.START_LIFE,
            increasedDamage = Math.round((this._myShip.Level - 1) * Ship.DAMAGE_INCREASE_RATE * 10) / 10;

        this._speedHolder.html(speed.toString());
        this._healthHolder.html(increasedLife.toString());
        this._damageHolder.html(increasedDamage.toString());
    }
}