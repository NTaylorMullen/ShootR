/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />

module ShootR {

    export class BulletMovementController extends eg.MovementControllers.MovementController {
        constructor(movables: Array<eg.IMoveable>, payload: Server.IMovementControllerData) {
            super(movables);

            this.LoadPayload(payload);
        }

        public LoadPayload(payload: Server.IMovementControllerData): void {
            this.Position = payload.Position;
            this.Velocity = payload.Velocity;
        }

        public Update(gameTime: eg.GameTime): void {
            this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.Elapsed.Seconds));

            super.Update(gameTime);
        }

        public Dispose(): void {
            // Make all active functions no-op
            this.Update = () => { };
            this.LoadPayload = () => { };
        }
    }

}