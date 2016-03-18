/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Powerups/HealthPack.ts" />
/// <reference path="../Powerups/Powerup.ts" />
var ShootR;
(function (ShootR) {
    var PowerupManager = (function () {
        function PowerupManager(_viewport, _scene, _contentManager) {
            this._viewport = _viewport;
            this._scene = _scene;
            this._contentManager = _contentManager;
            this._powerups = {};
        }
        PowerupManager.prototype.LoadPayload = function (payload) {
            var _this = this;
            var powerupPayload = payload.Powerups, powerup;

            for (var i = 0; i < powerupPayload.length; i++) {
                powerup = powerupPayload[i];

                if (!this._powerups[powerup.ID]) {
                    if (powerup.Type === 1) {
                        this._powerups[powerup.ID] = new ShootR.HealthPack(powerup, this._contentManager);
                    }

                    this._scene.Add(this._powerups[powerup.ID].Graphic);

                    this._powerups[powerup.ID].OnDisposed.Bind(function (powerup) {
                        delete _this._powerups[(powerup).ID];
                    });
                } else {
                    this._powerups[powerup.ID].LoadPayload(powerup);
                }

                if (powerup.Disposed) {
                    this._powerups[powerup.ID].Destroy();
                }
            }
        };

        PowerupManager.prototype.Update = function (gameTime) {
            for (var id in this._powerups) {
                this._powerups[id].Update(gameTime);
            }

            for (var id in this._powerups) {
                if (!this._powerups[id].Bounds.IntersectsRectangle(this._viewport)) {
                    this._powerups[id].Destroy();
                }
            }
        };
        return PowerupManager;
    })();
    ShootR.PowerupManager = PowerupManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=PowerupManager.js.map
