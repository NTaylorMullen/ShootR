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

            this._payloadFrequency = eg.TimeSpan.FromMilliseconds(1);
            this._positionInterpolation = new eg.Tweening.Vector2dTween(eg.Vector2d.Zero, eg.Vector2d.Zero, eg.TimeSpan.Zero, eg.Tweening.Functions.Linear.EaseNone);
            this._rotationInterpolation = new eg.Tweening.NumberTween(0, 0, eg.TimeSpan.Zero, eg.Tweening.Functions.Linear.EaseNone);
            this._gameTime = new eg.GameTime();

            this._positionInterpolation.OnChange.Bind(function (newPosition) {
                console.log(": " + _this._movementController.Position + "   -->    " + newPosition);
                _this._movementController.Position = newPosition;
            });
            this._positionInterpolation.OnComplete.Bind(function (positionTween) {
                _this.InterpolatingPosition = false;
                console.log("------Interpolation Complete------");
                console.log(" ");
            });

            this._rotationInterpolation.OnChange.Bind(function (newRotation) {
                _this._movementController.Rotation = newRotation;
            });
            this._rotationInterpolation.OnComplete.Bind(function (rotationTween) {
                _this.InterpolatingRotation = false;
            });
        }
        ShipInterpolationManager.prototype.LoadPayload = function (payload) {
            /*this.UpdatePayloadFrequency();
            this.InterpolatePosition(payload);
            this.InterpolatingRotation = this.TryInterpolateRotation(payload);
            
            // Force the custom game time object to update
            this.Update();*/
        };

        ShipInterpolationManager.prototype.Update = function (gameTime) {
            this._gameTime.Update();

            this._positionInterpolation.Update(this._gameTime);
            this._rotationInterpolation.Update(this._gameTime);
        };

        ShipInterpolationManager.prototype.StartInterpolationPayload = function (payload) {
            console.log("------Interpolation Started------");
            console.log("*** Interpolating position. From: " + this._movementController.Position + " To " + payload.To + " Over " + payload.Duration.Milliseconds + "ms.");

            this._positionInterpolation.From = this._movementController.Position;
            this._positionInterpolation.To = payload.To;
            this._positionInterpolation.Duration = payload.Duration;
            this._positionInterpolation.Restart();
            payload = null;
            this.InterpolatingPosition = true;
        };

        ShipInterpolationManager.prototype.InterpolatePosition = function (payload) {
            this.StartInterpolationPayload({
                To: payload.Position,
                Duration: this._payloadFrequency
            });
        };

        ShipInterpolationManager.prototype.TryInterpolateRotation = function (payload) {
            if (Math.abs(this._movementController.Rotation - payload.Rotation) > ShipInterpolationManager.ROTATION_THRESHOLD) {
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
        ShipInterpolationManager.POSITION_THRESHOLD = 8;
        ShipInterpolationManager.ROTATION_THRESHOLD = Math.PI / 10;
        return ShipInterpolationManager;
    })();
    ShootR.ShipInterpolationManager = ShipInterpolationManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipInterpolationManager.js.map
