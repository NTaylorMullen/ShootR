/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Ships/ShipManager.ts" />

module ShootR {

    export class UserCameraController implements eg.IUpdateable {
        public static DISTANCE_THRESHOLD: number = 50;
        public static MOVEMENT_TIME: eg.TimeSpan = eg.TimeSpan.FromSeconds(.15);

        private _movementTween: eg.Tweening.Vector2dTween;

        constructor(private _myShipId: number, private _shipManager: ShipManager, private _camera: eg.Rendering.Camera2d) {
            this._movementTween = new eg.Tweening.Vector2dTween(eg.Vector2d.Zero, eg.Vector2d.Zero, UserCameraController.MOVEMENT_TIME, eg.Tweening.Functions.Exponential.EaseOut);
            this._movementTween.OnChange.Bind((newPosition) => {
                this._camera.Position = newPosition;
            });
            this._movementTween.OnComplete.Bind((_) => {
                this._movementTween.Play();
            });
            this._movementTween.Play();
        }

        public Update(gameTime: eg.GameTime): void {
            var ship = this._shipManager.GetShip(this._myShipId),
                distance: number,
                positionIncrementor: eg.Vector2d;

            if (ship) {
                distance = ship.MovementController.Position.Distance(this._camera.Position).Magnitude();

                positionIncrementor = ship.MovementController.Position.Subtract(this._camera.Position).Unit().Multiply(distance * (gameTime.Elapsed.Seconds / UserCameraController.MOVEMENT_TIME.Seconds));

                this._camera.Position = this._camera.Position.Add(positionIncrementor);
            }
        }
    }

}