/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="ShipMovementController.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
var ShootR;
(function (ShootR) {
    var ShipInterpolationManager = (function () {
        function ShipInterpolationManager(_movementController) {
            var _this = this;
            this._movementController = _movementController;
            this.InterpolatingPosition = false;
            this.InterpolatingRotation = false;

            this._payloadFrequency = eg.TimeSpan.Zero;
            this._positionInterpolation = new eg.Tweening.Vector2dTween(eg.Vector2d.Zero, eg.Vector2d.Zero, eg.TimeSpan.Zero, eg.Tweening.Functions.Linear.EaseNone);
            this._rotationInterpolation = new eg.Tweening.NumberTween(0, 0, eg.TimeSpan.Zero, eg.Tweening.Functions.Linear.EaseNone);

            this._positionInterpolation.OnChange.Bind(function (newPosition) {
                _this._movementController.Position = newPosition;
            });
            this._positionInterpolation.OnComplete.Bind(function (positionTween) {
                console.log("------ Interpolation complete ------");
                _this.InterpolatingPosition = false;
            });

            this._rotationInterpolation.OnChange.Bind(function (newRotation) {
                _this._movementController.Rotation = newRotation;
            });
            this._rotationInterpolation.OnComplete.Bind(function (rotationTween) {
                _this.InterpolatingRotation = false;
            });
        }
        ShipInterpolationManager.prototype.LoadPayload = function (payload) {
            this.UpdatePayloadFrequency();
            this.InterpolatingPosition = this.TryInterpolatePosition(payload);
            this.InterpolatingRotation = this.TryInterpolateRotation(payload);
        };

        ShipInterpolationManager.prototype.Update = function (gameTime) {
            this._positionInterpolation.Update(gameTime);
            this._rotationInterpolation.Update(gameTime);
        };

        ShipInterpolationManager.prototype.TryInterpolatePosition = function (payload) {
            if (this._movementController.Position.Subtract(payload.Position).Magnitude() > ShipInterpolationManager.POSITION_THRESHOLD) {
                console.log("(P) Interpolating position FROM " + this._movementController.Position + " TO " + payload.Position + "  =  " + this._movementController.Position.Subtract(payload.Position).Magnitude() + "  OVER  " + this._payloadFrequency.Milliseconds + "ms");
                this._positionInterpolation.From = this._movementController.Position;
                this._positionInterpolation.To = payload.Position;
                this._positionInterpolation.Duration = this._payloadFrequency;
                this._positionInterpolation.Restart();

                return true;
            }

            return false;
        };

        ShipInterpolationManager.prototype.TryInterpolateRotation = function (payload) {
            if (Math.abs(this._movementController.Rotation - payload.Rotation) > ShipInterpolationManager.ROTATION_THRESHOLD) {
                console.log("(R) Interpolating rotation FROM " + this._movementController.Rotation + " TO " + payload.Rotation + "  =  " + Math.abs(this._movementController.Rotation - payload.Rotation) + "  OVER  " + this._payloadFrequency.Milliseconds + "ms");
                this._rotationInterpolation.From = this._movementController.Rotation;
                this._rotationInterpolation.To = payload.Rotation;
                this._rotationInterpolation.Duration = this._payloadFrequency;
                this._rotationInterpolation.Restart();

                return true;
            }

            return false;
        };

        ShipInterpolationManager.prototype.UpdatePayloadFrequency = function () {
            var now = new Date();

            if (this._lastPayloadAt) {
                this._payloadFrequency = eg.TimeSpan.DateSpan(this._lastPayloadAt, now);
            }

            this._lastPayloadAt = now;
        };
        ShipInterpolationManager.POSITION_THRESHOLD = 15;
        ShipInterpolationManager.ROTATION_THRESHOLD = Math.PI / 10;
        return ShipInterpolationManager;
    })();
    ShootR.ShipInterpolationManager = ShipInterpolationManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipInterpolationManager.js.map
