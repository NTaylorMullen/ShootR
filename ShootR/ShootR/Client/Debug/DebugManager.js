var ShootR;
(function (ShootR) {
    /// <reference path="ServerGhost.ts" />
    /// <reference path="GameInformer.ts" />
    /// <reference path="UpdateRate.ts" />
    /// <reference path="DrawRate.ts" />
    /// <reference path="../Game.ts" />
    (function (Debug) {
        var DebugManager = (function () {
            function DebugManager(myShipId, game) {
                this._debugMode = this.GetUrlVars()[DebugManager.DEBUG_FLAG] === "true";

                if (this._debugMode) {
                    this._serverGhost = new Debug.ServerGhost(myShipId, game.Scene, game.Content);
                    this._gameInformer = new Debug.GameInformer(game.Scene);
                    this._updateRate = new Debug.UpdateRate(this._gameInformer, game);
                    this._drawRate = new Debug.DrawRate(this._gameInformer);
                    this._payloadRate = new Debug.PayloadRate(this._gameInformer);
                }
            }
            DebugManager.prototype.LoadPayload = function (payload) {
                if (this._debugMode) {
                    this._payloadRate.LoadPayload(payload);
                    this._serverGhost.LoadPayload(payload.Ships);
                }
            };

            DebugManager.prototype.Update = function (gameTime) {
                if (this._debugMode) {
                    this._updateRate.Update(gameTime);
                    this._drawRate.Update(gameTime);
                    this._payloadRate.Update(gameTime);
                    this._gameInformer.Update(gameTime);
                    this._serverGhost.Update(gameTime);
                }
            };

            DebugManager.prototype.Draw = function (context) {
                if (this._debugMode) {
                    this._drawRate.Draw(context);
                }
            };

            DebugManager.prototype.GetUrlVars = function () {
                var vars = [], hash, hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1];
                }

                return vars;
            };
            DebugManager.DEBUG_FLAG = "debug";
            return DebugManager;
        })();
        Debug.DebugManager = DebugManager;
    })(ShootR.Debug || (ShootR.Debug = {}));
    var Debug = ShootR.Debug;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=DebugManager.js.map
