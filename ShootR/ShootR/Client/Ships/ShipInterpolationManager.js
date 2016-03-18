/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="ShipMovementController.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Game.ts" />
var ShootR;
(function (ShootR) {
    var ShipInterpolationManager = (function () {
        function ShipInterpolationManager(_movementController) {
            var _this = this;
            this._movementController = _movementController;
            this._interpolationDuration = eg.TimeSpan.FromMilliseconds(ShootR.Game.GameConfiguration.gameConfig.DRAW_INTERVAL * 2);

            this.Interpolating = false;

            this._positionInterpolation = new eg.Tweening.Vector2dTween(eg.Vector2d.Zero, eg.Vector2d.Zero, this._interpolationDuration, eg.Tweening.Functions.Linear.EaseNone);
            this._rotationInterpolation = new eg.Tweening.NumberTween(0, 0, this._interpolationDuration, eg.Tweening.Functions.Linear.EaseNone);

            this._positionInterpolation.OnChange.Bind(function (newPosition) {
                _this._movementController.Position = newPosition;
            });
            this._rotationInterpolation.OnChange.Bind(function (newRotation) {
                _this._movementController.Rotation = newRotation;
            });
            this._rotationInterpolation.OnComplete.Bind(function (rotationTween) {
                _this.Interpolating = false;
                _this.Interpolate();
            });

            this._payloadBuffer = new Array();
        }
        ShipInterpolationManager.prototype.LoadPayload = function (payload) {
            if (!this._movementController.UserControlled) {
                this.BufferPayload(payload);

                this.Interpolate();
            }
        };

        ShipInterpolationManager.prototype.Update = function (gameTime) {
            this._positionInterpolation.Update(gameTime);
            this._rotationInterpolation.Update(gameTime);
        };

        ShipInterpolationManager.prototype.BufferPayload = function (payload) {
            if (this._payloadBuffer.length === ShipInterpolationManager.PAYLOAD_BUFFER) {
                this._payloadBuffer.pop();
            }

            this._payloadBuffer.push(payload);
        };

        ShipInterpolationManager.prototype.StartInterpolationPayload = function (payload) {
            this._positionInterpolation.From = this._movementController.Position;
            this._positionInterpolation.To = payload.Position;
            this._rotationInterpolation.From = this._movementController.Rotation;
            this._rotationInterpolation.To = payload.Rotation;

            // console.log("Interpolating " + this._positionInterpolation.From.Distance(this._positionInterpolation.To) + " pixels over " + this._positionInterpolation.Duration.Milliseconds + " ms.");
            // console.log("Interpolating " + Math.abs(this._rotationInterpolation.From - this._rotationInterpolation.To) * 57.2957795  + " degrees over " + this._rotationInterpolation.Duration.Milliseconds + " ms.");
            this._positionInterpolation.Restart();
            this._rotationInterpolation.Restart();

            this.Interpolating = true;
        };

        ShipInterpolationManager.prototype.Interpolate = function () {
            if (this._payloadBuffer.length > 0) {
                this.StartInterpolationPayload(this._payloadBuffer.shift());
            }
        };
        ShipInterpolationManager.PAYLOAD_BUFFER = 2;
        return ShipInterpolationManager;
    })();
    ShootR.ShipInterpolationManager = ShipInterpolationManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipInterpolationManager.js.map
