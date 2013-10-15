/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var Powerup = (function (_super) {
        __extends(Powerup, _super);
        function Powerup(payload, graphic) {
            _super.call(this, graphic.GetDrawBounds());

            this.ID = payload.ID;
            this.Graphic = graphic;
        }
        Powerup.prototype.LoadPayload = function (payload) {
            this.Bounds.Position = this.Graphic.Position = payload.MovementController.Position;
        };

        Powerup.prototype.Update = function (gameTime) {
        };

        Powerup.prototype.Destroy = function () {
            if (!this._destroyed) {
                this._destroyed = true;

                this.Dispose();
                this.Graphic.Dispose();
            }
        };
        return Powerup;
    })(eg.Collision.Collidable);
    ShootR.Powerup = Powerup;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=Powerup.js.map
