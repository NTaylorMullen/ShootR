/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Ships/Ship.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />

module ShootR.Debug {

    export class ServerGhost implements eg.IUpdateable {
        private _ghost: Ship;

        constructor(private _myShipId: number, private _scene: eg.Rendering.Scene2d, private _content: eg.Content.ContentManager) {
        }

        public LoadPayload(payload: Array<Server.IShipData>): void {
            var shipPayload: Server.IShipData;

            for (var i = 0; i < payload.length; i++) {
                shipPayload = payload[i];

                if (shipPayload.ID === this._myShipId) {
                    if (!this._ghost) {
                        this._ghost = new Ship(shipPayload, this._content);
                        this._ghost.Graphic.HideLifeBar();
                        this._ghost.Graphic.Body.Opacity = .5;
                        this._scene.Add(this._ghost.Graphic);
                    } else {
                        this._ghost.LoadPayload(shipPayload);
                    }
                }
            }
        }

        public Update(gameTime: eg.GameTime): void {
            if (this._ghost) {
                this._ghost.Update(gameTime);
            }
        }
    }

}