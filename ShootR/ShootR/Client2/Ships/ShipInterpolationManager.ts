/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="ShipMovementController.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />

module ShootR {

    export class ShipInterpolationManager implements eg.IUpdateable {
        public static POSITION_THRESHOLD: number = 15;
        public static ROTATION_THRESHOLD: number = Math.PI / 10;

        public InterpolatingPosition: boolean;
        public InterpolatingRotation: boolean;

        private _lastPayloadAt: Date;
        private _payloadFrequency: eg.TimeSpan;
        private _positionInterpolation: eg.Tweening.Vector2dTween;
        private _rotationInterpolation: eg.Tweening.NumberTween;

        constructor(private _movementController: ShipMovementController) {
            this.InterpolatingPosition = false;
            this.InterpolatingRotation = false;

            this._payloadFrequency = eg.TimeSpan.Zero;
            this._positionInterpolation = new eg.Tweening.Vector2dTween(eg.Vector2d.Zero, eg.Vector2d.Zero, eg.TimeSpan.Zero, eg.Tweening.Functions.Linear.EaseNone);
            this._rotationInterpolation = new eg.Tweening.NumberTween(0, 0, eg.TimeSpan.Zero, eg.Tweening.Functions.Linear.EaseNone);

            this._positionInterpolation.OnChange.Bind((newPosition: eg.Vector2d) => {
                this._movementController.Position = newPosition;
            });
            this._positionInterpolation.OnComplete.Bind((positionTween: eg.Tweening.Vector2dTween) => {
                this.InterpolatingPosition = false;
            });

            this._rotationInterpolation.OnChange.Bind((newRotation: number) => {
                this._movementController.Rotation = newRotation;
            });
            this._rotationInterpolation.OnComplete.Bind((rotationTween: eg.Tweening.NumberTween) => {
                this.InterpolatingRotation = false;
            });
        }

        public LoadPayload(payload: Server.IShipMovementControllerData): void {
            this.UpdatePayloadFrequency();
            this.InterpolatingPosition = this.TryInterpolatePosition(payload);
            this.InterpolatingRotation = this.TryInterpolateRotation(payload);
        }

        public Update(gameTime: eg.GameTime): void {
            this._positionInterpolation.Update(gameTime);
            this._rotationInterpolation.Update(gameTime);
        }

        private TryInterpolatePosition(payload: Server.IShipMovementControllerData): boolean {
            // Should interpolate position
            if (this._movementController.Position.Subtract(payload.Position).Magnitude() > ShipInterpolationManager.POSITION_THRESHOLD) {
                this._positionInterpolation.From = this._movementController.Position;
                this._positionInterpolation.To = payload.Position;
                this._positionInterpolation.Duration = this._payloadFrequency;
                this._positionInterpolation.Restart();

                return true;
            }

            return false;
        }

        private TryInterpolateRotation(payload: Server.IShipMovementControllerData): boolean {
            // Should interpolate rotation
            if (Math.abs(this._movementController.Rotation - payload.Rotation) > ShipInterpolationManager.ROTATION_THRESHOLD) {
                this._rotationInterpolation.From = this._movementController.Rotation;
                this._rotationInterpolation.To = payload.Rotation;
                this._rotationInterpolation.Duration = this._payloadFrequency;
                this._rotationInterpolation.Restart();

                return true;
            }

            return false;
        }

        private UpdatePayloadFrequency(): void {
            var now: Date = new Date();

            if (this._lastPayloadAt) {
                this._payloadFrequency = eg.TimeSpan.DateSpan(this._lastPayloadAt, now);
            }

            this._lastPayloadAt = now;
        }
    }

}