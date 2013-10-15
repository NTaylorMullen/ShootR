/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ships/ShipManager.ts" />
var ShootR;
(function (ShootR) {
    var UserCameraController = (function () {
        function UserCameraController(_myShipId, _shipManager, _camera) {
            var _this = this;
            this._myShipId = _myShipId;
            this._shipManager = _shipManager;
            this._camera = _camera;
            this._movementTween = new eg.Tweening.Vector2dTween(eg.Vector2d.Zero, eg.Vector2d.Zero, UserCameraController.MOVEMENT_TIME, eg.Tweening.Functions.Exponential.EaseOut);
            this._movementTween.OnChange.Bind(function (newPosition) {
                _this._camera.Position = newPosition;
            });

            this._started = false;
        }
        UserCameraController.prototype.Update = function (gameTime) {
            var ship = this._shipManager.GetShip(this._myShipId), distance;

            if (ship) {
                if (!this._started) {
                    this._started = true;
                    this._camera.Position = ship.MovementController.Position;
                    return;
                }

                distance = ship.MovementController.Position.Distance(this._camera.Position).Magnitude();

                if (!this._movementTween.IsPlaying()) {
                    if (distance < UserCameraController.DISTANCE_THRESHOLD) {
                        this._camera.Position = ship.MovementController.Position;
                    } else {
                        this._movementTween.From = this._camera.Position;
                        this._movementTween.To = ship.MovementController.Position;
                        this._movementTween.Restart();
                    }
                } else {
                    this._movementTween.To = ship.MovementController.Position;
                }
            }

            this._movementTween.Update(gameTime);
        };
        UserCameraController.DISTANCE_THRESHOLD = 500;
        UserCameraController.MOVEMENT_TIME = eg.TimeSpan.FromMilliseconds(500);
        return UserCameraController;
    })();
    ShootR.UserCameraController = UserCameraController;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=UserCameraController.js.map
