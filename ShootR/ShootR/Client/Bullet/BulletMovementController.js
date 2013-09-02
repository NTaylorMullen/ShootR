/// <reference path="../Collidable/MovementControllers/MovementController.ts" />
/// <reference path="../Utilities/Vector2.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BulletMovementController = (function (_super) {
    __extends(BulletMovementController, _super);
    function BulletMovementController() {
        _super.call(this, BulletMovementController.MASS, BulletMovementController.MAX_SPEED);
    }
    BulletMovementController.prototype.Move = function (percentOfSecond) {
        var incrementor = Vector2.MultiplyN(this.Velocity, percentOfSecond);

        this.Position.AddV(incrementor);
    };

    BulletMovementController.prototype.Update = function (percentOfSecond, now) {
        this.Move(percentOfSecond);
        _super.prototype.Update.call(this, percentOfSecond, now);
    };
    BulletMovementController.MAX_SPEED = 1100;
    BulletMovementController.MASS = 800;
    return BulletMovementController;
})(MovementController);
//# sourceMappingURL=BulletMovementController.js.map
