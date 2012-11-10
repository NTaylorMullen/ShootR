var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var MovementAbility = (function (_super) {
    __extends(MovementAbility, _super);
    function MovementAbility(name, MovementController) {
        _super.call(this, name);
        this.MovementController = MovementController;
        this._initialPower = MovementController.Power;
    }
    MovementAbility.prototype.IncreaseSpeedBy = function (amount) {
        this.MovementController.Power += amount;
    };
    MovementAbility.prototype.MultiplySpeedBy = function (amount) {
        this.MovementController.Power *= amount;
    };
    MovementAbility.prototype.DecreaseSpeedBy = function (amount) {
        this.MovementController.Power -= amount;
    };
    MovementAbility.prototype.ResetSpeed = function () {
        this.MovementController.Power = this._initialPower;
    };
    return MovementAbility;
})(Ability);
//@ sourceMappingURL=MovementAbility.js.map
