var ShipStatMonitor = (function () {
    function ShipStatMonitor(_myShip) {
        this._myShip = _myShip;
        this._speedHolder = $("#Speed");
        this._healthHolder = $("#IncreasedHealth");
        this._damageHolder = $("#IncreasedDamage");
    }
    ShipStatMonitor.prototype.Update = function () {
        var speed = Math.round(Math.sqrt(Math.pow(this._myShip.MovementController.Velocity.X, 2) + Math.pow(this._myShip.MovementController.Velocity.Y, 2)));
        var increasedLife = this._myShip.MaxLife - Ship.START_LIFE;
        var increasedDamage = Math.round((this._myShip.Level - 1) * Ship.DAMAGE_INCREASE_RATE * 10) / 10;

        this._speedHolder.html(speed);
        this._healthHolder.html(increasedLife);
        this._damageHolder.html(increasedDamage);
    };
    return ShipStatMonitor;
})();
//@ sourceMappingURL=ShipStatMonitor.js.map
