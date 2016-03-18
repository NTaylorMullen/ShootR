/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="Powerup.ts" />
/// <reference path="Graphics/HealthPackGraphic.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var HealthPack = (function (_super) {
        __extends(HealthPack, _super);
        function HealthPack(payload, contentManager) {
            _super.call(this, payload, new ShootR.HealthPackGraphic(payload.MovementController.Position, contentManager));

            this._spawnedAt = new Date();
        }
        HealthPack.prototype.Update = function (gameTime) {
            if (eg.TimeSpan.DateSpan(this._spawnedAt, gameTime.Now).Milliseconds >= HealthPack.LIFE_SPAN.Milliseconds) {
                this.Destroy();
                return;
            }

            (this.Graphic).Update(gameTime);
        };
        HealthPack.SIZE = new eg.Size2d(50);
        HealthPack.LIFE_SPAN = eg.TimeSpan.FromSeconds(6);
        return HealthPack;
    })(ShootR.Powerup);
    ShootR.HealthPack = HealthPack;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=HealthPack.js.map
