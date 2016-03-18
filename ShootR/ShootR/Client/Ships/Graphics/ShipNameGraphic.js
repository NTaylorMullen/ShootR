/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var ShipNameGraphic = (function (_super) {
        __extends(ShipNameGraphic, _super);
        function ShipNameGraphic(name) {
            _super.call(this, 0, ShootR.Ship.SIZE.HalfHeight + ShipNameGraphic.Y_OFFSET, name, ShipNameGraphic.NAME_COLOR);

            this.FontSettings.FontSize = ShipNameGraphic.FONT_SIZE;
            this.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Arial;
            this.FontSettings.FontWeight = "bold";
        }
        ShipNameGraphic.FONT_SIZE = "15px";
        ShipNameGraphic.Y_OFFSET = 33;
        ShipNameGraphic.NAME_COLOR = eg.Graphics.Color.White;
        return ShipNameGraphic;
    })(eg.Graphics.Text2d);
    ShootR.ShipNameGraphic = ShipNameGraphic;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipNameGraphic.js.map
