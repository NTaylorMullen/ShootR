/// <reference path="ServerGhost.ts" />
/// <reference path="GameInformer.ts" />
/// <reference path="UpdateRate.ts" />
/// <reference path="DrawRate.ts" />
/// <reference path="ConnectionMonitor.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="../Game.ts" />

module ShootR.Debug {

    export class DebugManager {
        public static DEBUG_FLAG: string = "debug";

        private _serverGhost: ServerGhost;
        private _gameInformer: GameInformer;
        private _updateRate: UpdateRate;
        private _drawRate: DrawRate;
        private _payloadRate: PayloadRate;
        private _connectionMonitor: ConnectionMonitor;
        private _debugMode: boolean;

        constructor(myShipId: number, game: Game, serverAdapter: Server.ServerAdapter) {
            this._debugMode = this.GetUrlVars()[DebugManager.DEBUG_FLAG] === "true";

            if (this._debugMode) {
                this._serverGhost = new ServerGhost(myShipId, game.Scene, game.Content);
                this._gameInformer = new GameInformer(game.Scene);
                this._updateRate = new UpdateRate(this._gameInformer, game);
                this._drawRate = new DrawRate(this._gameInformer);
                this._payloadRate = new PayloadRate(this._gameInformer);
                this._connectionMonitor = new ConnectionMonitor(this._gameInformer, serverAdapter);
            }
        }

        public LoadPayload(payload: Server.IPayloadData): void {
            if (this._debugMode) {
                this._payloadRate.LoadPayload(payload);
                this._serverGhost.LoadPayload(payload.Ships);
            }
        }

        public Update(gameTime: eg.GameTime): void {
            if (this._debugMode) {
                this._updateRate.Update(gameTime);
                this._drawRate.Update(gameTime);
                this._payloadRate.Update(gameTime);
                this._gameInformer.Update(gameTime);
                this._serverGhost.Update(gameTime);
            }
        }

        public Draw(context: CanvasRenderingContext2D): void {
            if (this._debugMode) {
                this._drawRate.Draw(context);
            }
        }

        private GetUrlVars() {
            var vars = [],
                hash,
                hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }

            return vars;
        }
    }

}