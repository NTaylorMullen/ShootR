var ShootR;
(function (ShootR) {
    /// <reference path="ServerGhost.ts" />
    /// <reference path="../Game.ts" />
    (function (Debug) {
        var DebugManager = (function () {
            function DebugManager(myShipId, game) {
                this._serverGhost = new Debug.ServerGhost(myShipId, game.Scene, game.Content);

                this._debugMode = this.GetUrlVars()[DebugManager.DEBUG_FLAG] === "true";
            }
            DebugManager.prototype.LoadPayload = function (payload) {
                if (this._debugMode) {
                    this._serverGhost.LoadPayload(payload.Ships);
                }
            };

            DebugManager.prototype.Update = function (gameTime) {
                if (this._debugMode) {
                    this._serverGhost.Update(gameTime);
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
