/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="Powerup.ts" />
/// <reference path="Graphics/HealthPackGraphic.ts" />

module ShootR {

    export class HealthPack extends Powerup {
        public static SIZE: eg.Size2d = new eg.Size2d(50);
        public static LIFE_SPAN: eg.TimeSpan = eg.TimeSpan.FromSeconds(6);

        private _spawnedAt: Date;

        constructor(payload: Server.IPowerupData, contentManager: eg.Content.ContentManager) {
            super(payload, new HealthPackGraphic(payload.MovementController.Position, contentManager));

            this._spawnedAt = new Date();            
        }

        public Update(gameTime: eg.GameTime): void {
            if (eg.TimeSpan.DateSpan(this._spawnedAt, gameTime.Now).Milliseconds >= HealthPack.LIFE_SPAN.Milliseconds) {
                this.Destroy();
                return;
            }

            (<HealthPackGraphic>this.Graphic).Update(gameTime);
        }
    }

}