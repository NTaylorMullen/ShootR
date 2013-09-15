/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="ShipMovementController.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />

module ShootR {

    export class ShipInterpolationManager implements eg.IUpdateable {
        public static POSITION_THRESHOLD: number = 8;
        public static ROTATION_THRESHOLD: number = Math.PI / 10;

        public InterpolatingPosition: boolean;
        public InterpolatingRotation: boolean;

        private _lastPayloadAt: Date;
        private _payloadFrequency: eg.TimeSpan;
        private _positionInterpolation: eg.Tweening.Vector2dTween;
        private _rotationInterpolation: eg.Tweening.NumberTween;
        private _gameTime: eg.GameTime;

        constructor(private _movementController: ShipMovementController) {
            this.InterpolatingPosition = false;
            this.InterpolatingRotation = false;

            this._payloadFrequency = eg.TimeSpan.FromMilliseconds(1);
            this._positionInterpolation = new eg.Tweening.Vector2dTween(eg.Vector2d.Zero, eg.Vector2d.Zero, eg.TimeSpan.Zero, eg.Tweening.Functions.Linear.EaseNone);
            this._rotationInterpolation = new eg.Tweening.NumberTween(0, 0, eg.TimeSpan.Zero, eg.Tweening.Functions.Linear.EaseNone);
            this._gameTime = new eg.GameTime();

            this._positionInterpolation.OnChange.Bind((newPosition: eg.Vector2d) => {
                console.log(": " + this._movementController.Position + "   -->    " + newPosition);
                this._movementController.Position = newPosition;
            });
            this._positionInterpolation.OnComplete.Bind((positionTween: eg.Tweening.Vector2dTween) => {
                this.InterpolatingPosition = false;
                console.log("------Interpolation Complete------");
                console.log(" ");
            });

            this._rotationInterpolation.OnChange.Bind((newRotation: number) => {
                this._movementController.Rotation = newRotation;
            });
            this._rotationInterpolation.OnComplete.Bind((rotationTween: eg.Tweening.NumberTween) => {
                this.InterpolatingRotation = false;
            });
        }

        public LoadPayload(payload: Server.IShipMovementControllerData): void {
            /*this.UpdatePayloadFrequency();
            this.InterpolatePosition(payload);
            this.InterpolatingRotation = this.TryInterpolateRotation(payload);

            // Force the custom game time object to update
            this.Update();*/
        }

        public Update(gameTime?: eg.GameTime): void {
            this._gameTime.Update();

            this._positionInterpolation.Update(this._gameTime);
            this._rotationInterpolation.Update(this._gameTime);
        }

        private StartInterpolationPayload(payload: IPayloadInterpolation): void {
            console.log("------Interpolation Started------");
            console.log("*** Interpolating position. From: " + this._movementController.Position + " To " + payload.To + " Over " + payload.Duration.Milliseconds + "ms.");

            this._positionInterpolation.From = this._movementController.Position;
            this._positionInterpolation.To = payload.To;
            this._positionInterpolation.Duration = payload.Duration;
            this._positionInterpolation.Restart();
            payload = null;
            this.InterpolatingPosition = true;
        }

        private InterpolatePosition(payload: Server.IShipMovementControllerData): void {
            this.StartInterpolationPayload({
                To: payload.Position,
                Duration: this._payloadFrequency
            });
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

    interface IPayloadInterpolation {
        Duration: eg.TimeSpan;
        To: eg.Vector2d;
    }

}