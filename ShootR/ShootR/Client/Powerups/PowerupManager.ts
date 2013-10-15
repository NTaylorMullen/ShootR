/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Powerups/HealthPack.ts" />
/// <reference path="../Powerups/Powerup.ts" />

module ShootR {

    export class PowerupManager {
        private _powerups: { [id: number]: Powerup; };

        constructor(private _viewport: eg.Bounds.BoundingRectangle, private _scene: eg.Rendering.Scene2d, private _contentManager: eg.Content.ContentManager) {
            this._powerups = {};
        }

        public LoadPayload(payload: Server.IPayloadData): void {
            var powerupPayload: Array<Server.IPowerupData> = payload.Powerups,
                powerup: Server.IPowerupData;

            for (var i = 0; i < powerupPayload.length; i++) {
                powerup = powerupPayload[i];

                if (!this._powerups[powerup.ID]) {
                    if (powerup.Type === 1) {
                        this._powerups[powerup.ID] = new HealthPack(powerup, this._contentManager);
                    }

                    this._scene.Add(this._powerups[powerup.ID].Graphic);

                    this._powerups[powerup.ID].OnDisposed.Bind((powerup) => {
                        delete this._powerups[(<Powerup>powerup).ID];
                    });
                } else {
                    this._powerups[powerup.ID].LoadPayload(powerup);
                }

                if (powerup.Disposed) {
                    this._powerups[powerup.ID].Destroy();
                }
            }
        }

        public Update(gameTime: eg.GameTime): void {
            // Update positions first
            for (var id in this._powerups) {
                this._powerups[id].Update(gameTime);
            }

            // Update positions first
            for (var id in this._powerups) {
                // Check for "in-bounds" to see what powerups we should destroy
                if (!this._powerups[id].Bounds.IntersectsRectangle(this._viewport)) {
                    this._powerups[id].Destroy();
                }
            }
        }
    }

}