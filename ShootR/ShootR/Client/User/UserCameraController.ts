/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ships/ShipManager.ts" />

module ShootR {

    export class UserCameraController implements eg.IUpdateable {
        public static DISTANCE_THRESHOLD: number = 500;
        public static MOVEMENT_TIME: eg.TimeSpan = eg.TimeSpan.FromMilliseconds(500);

        private _movementTween: eg.Tweening.Vector2dTween;
        private _started: boolean;

        constructor(private _myShipId: number, private _shipManager: ShipManager, private _camera: eg.Rendering.Camera2d) {
            this._movementTween = new eg.Tweening.Vector2dTween(eg.Vector2d.Zero, eg.Vector2d.Zero, UserCameraController.MOVEMENT_TIME, eg.Tweening.Functions.Exponential.EaseOut);
            this._movementTween.OnChange.Bind((newPosition) => {
                this._camera.Position = newPosition;
            });

            this._started = false;
        }

        public Update(gameTime: eg.GameTime): void {
            var ship = this._shipManager.GetShip(this._myShipId),
                distance: number;

            if (ship) {
                // On the initial start of the game just position the camera directly over the ship
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
        }
    }

}