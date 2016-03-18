/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />

module ShootR {

    export class Powerup extends eg.Collision.Collidable {
        public ID: number;
        public Graphic: eg.Graphics.Graphic2d;

        private _destroyed: boolean;

        constructor(payload: Server.IPowerupData, graphic: eg.Graphics.Graphic2d) {
            super(graphic.GetDrawBounds());

            this.ID = payload.ID;
            this.Graphic = graphic;
        }

        public LoadPayload(payload: Server.IPowerupData): void {
            this.Bounds.Position = this.Graphic.Position = payload.MovementController.Position;
        }

        public Update(gameTime: eg.GameTime): void {
        }

        public Destroy(): void {
            if (!this._destroyed) {
                this._destroyed = true;

                this.Dispose();
                this.Graphic.Dispose();
            }
        }
    }

}