/// <reference path="Abstractions/MovementAbility.ts" />
/// <reference path="../Collidable/MovementControllers/MovementController.ts" />
/// <reference path="../Utilities/ValueRef.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Boost = (function (_super) {
    __extends(Boost, _super);
    function Boost(_movementController, Controllable) {
        _super.call(this, Boost.NAME, _movementController);
        this._movementController = _movementController;
        this.Controllable = Controllable;
    }
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
        if (this.Active && now.getTime() - this.ActivatedAt >= Boost.DURATION) {
            this.Deactivate();
        }
    };
    Boost.NAME = "Boost";
    Boost.SPEED_INCREASE = 3;
    Boost.DURATION = 3;
    return Boost;
})(MovementAbility);
//# sourceMappingURL=Boost.js.map
