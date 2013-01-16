var ShipStatMonitor = (function () {
    function ShipStatMonitor(_myShip) {
        this._myShip = _myShip;
        this._speedHolder = $("#Speed");
        this._healthHolder = $("#IncreasedHealth");
        this._damageHolder = $("#IncreasedDamage");
    }
    ShipStatMonitor.prototype.Update = function () {
        var speed = Math.round(Math.sqrt(Math.pow(this._myShip.MovementController.Velocity.X, 2) + Math.pow(this._myShip.MovementController.Velocity.Y, 2))), increasedLife = this._myShip.MaxLife - Ship.START_LIFE, increasedDamage = Math.round((this._myShip.Level - 1) * Ship.DAMAGE_INCREASE_RATE * 10) / 10;
        this._speedHolder.html(speed.toString());
        this._healthHolder.html(increasedLife.toString());
        this._damageHolder.html(increasedDamage.toString());
    };
    return ShipStatMonitor;
})();
//@ sourceMappingURL=ShipStatMonitor.js.map
