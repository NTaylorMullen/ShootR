/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="ShipMovementController.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Game.ts" />

module ShootR {

    export class ShipInterpolationManager implements eg.IUpdateable {
        // Buffer X payloads
        public static PAYLOAD_BUFFER: number = 2;

        public Interpolating: boolean;

        private _positionInterpolation: eg.Tweening.Vector2dTween;
        private _rotationInterpolation: eg.Tweening.NumberTween;
        private _interpolationDuration: eg.TimeSpan;
        private _payloadBuffer: Array<Server.IShipMovementControllerData>;

        constructor(private _movementController: ShipMovementController) {
            this._interpolationDuration = eg.TimeSpan.FromMilliseconds(Game.GameConfiguration.gameConfig.DRAW_INTERVAL * 2);

            this.Interpolating = false;

            this._positionInterpolation = new eg.Tweening.Vector2dTween(eg.Vector2d.Zero, eg.Vector2d.Zero, this._interpolationDuration, eg.Tweening.Functions.Linear.EaseNone);
            this._rotationInterpolation = new eg.Tweening.NumberTween(0, 0, this._interpolationDuration, eg.Tweening.Functions.Linear.EaseNone);

            this._positionInterpolation.OnChange.Bind((newPosition: eg.Vector2d) => {
                this._movementController.Position = newPosition;
            });
            this._rotationInterpolation.OnChange.Bind((newRotation: number) => {
                this._movementController.Rotation = newRotation;
            });
            this._rotationInterpolation.OnComplete.Bind((rotationTween: eg.Tweening.NumberTween) => {
                this.Interpolating = false;
                this.Interpolate();
            });

            this._payloadBuffer = new Array<Server.IShipMovementControllerData>();
        }

        public LoadPayload(payload: Server.IShipMovementControllerData): void {
            if (!this._movementController.UserControlled) {
                this.BufferPayload(payload);

                this.Interpolate();
            }
        }

        public Update(gameTime: eg.GameTime): void {
            this._positionInterpolation.Update(gameTime);
            this._rotationInterpolation.Update(gameTime);
        }

        private BufferPayload(payload: Server.IShipMovementControllerData): void {
            if (this._payloadBuffer.length === ShipInterpolationManager.PAYLOAD_BUFFER) {
                this._payloadBuffer.pop();
            }

            this._payloadBuffer.push(payload);
        }

        private StartInterpolationPayload(payload: Server.IShipMovementControllerData): void {
            this._positionInterpolation.From = this._movementController.Position;
            this._positionInterpolation.To = payload.Position;
            this._rotationInterpolation.From = this._movementController.Rotation;
            this._rotationInterpolation.To = payload.Rotation;

            // console.log("Interpolating " + this._positionInterpolation.From.Distance(this._positionInterpolation.To) + " pixels over " + this._positionInterpolation.Duration.Milliseconds + " ms.");
            // console.log("Interpolating " + Math.abs(this._rotationInterpolation.From - this._rotationInterpolation.To) * 57.2957795  + " degrees over " + this._rotationInterpolation.Duration.Milliseconds + " ms.");

            this._positionInterpolation.Restart();
            this._rotationInterpolation.Restart();

            this.Interpolating = true;
        }

        private Interpolate(): void {
            if (this._payloadBuffer.length > 0) {
                this.StartInterpolationPayload(this._payloadBuffer.shift());
            }
        }
    }

}