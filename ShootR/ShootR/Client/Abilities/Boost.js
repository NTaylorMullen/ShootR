var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var Boost = (function (_super) {
    __extends(Boost, _super);
    function Boost(movementController, Controllable) {
        _super.call(this, Boost.NAME, movementController);
        this.movementController = movementController;
        this.Controllable = Controllable;
    }
    Boost.NAME = "Boost";
    Boost.SPEED_INCREASE = 3;
    Boost.DURATION = 3;
    Boost.prototype.Activate = function () {
        this.MultiplySpeedBy(Boost.SPEED_INCREASE);
        _super.prototype.Activate.call(this);
        this.Controllable.Value = false;
    };
    Boost.prototype.Deactivate = function () {
        this.ResetSpeed();
        _super.prototype.Deactivate.call(this);
        this.Controllable.Value = true;
    };
    Boost.prototype.Update = function (now) {
        if(this.Active && now.getTime() - this.ActivatedAt >= Boost.DURATION) {
            this.Deactivate();
        }
    };
    return Boost;
})(MovementAbility);
//@ sourceMappingURL=Boost.js.map
