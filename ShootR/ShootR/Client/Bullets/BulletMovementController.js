/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var BulletMovementController = (function (_super) {
        __extends(BulletMovementController, _super);
        function BulletMovementController(movables, payload) {
            _super.call(this, movables);

            this.LoadPayload(payload);
        }
        BulletMovementController.prototype.LoadPayload = function (payload) {
            this.Position = payload.Position;
            this.Velocity = payload.Velocity;
        };

        BulletMovementController.prototype.Update = function (gameTime) {
            this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.Elapsed.Seconds));

            _super.prototype.Update.call(this, gameTime);
        };

        BulletMovementController.prototype.Dispose = function () {
            // Make all active functions no-op
            this.Update = function () {
            };
            this.LoadPayload = function () {
            };
        };
        return BulletMovementController;
    })(eg.MovementControllers.MovementController);
    ShootR.BulletMovementController = BulletMovementController;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=BulletMovementController.js.map
