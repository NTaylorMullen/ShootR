var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var BulletMovementController = (function (_super) {
    __extends(BulletMovementController, _super);
    function BulletMovementController() {
        _super.call(this, BulletMovementController.MASS, BulletMovementController.MAX_SPEED);
    }
    BulletMovementController.MAX_SPEED = 1100;
    BulletMovementController.MASS = 800;
    BulletMovementController.prototype.Move = function (percentOfSecond) {
        var incrementor = Vector2.MultiplyN(this.Velocity, percentOfSecond);
        this.Position.AddV(incrementor);
    };
    BulletMovementController.prototype.Update = function (percentOfSecond, now) {
        this.Move(percentOfSecond);
        _super.prototype.Update.call(this, percentOfSecond, now);
    };
    return BulletMovementController;
})(MovementController);
//@ sourceMappingURL=BulletMovementController.js.map
