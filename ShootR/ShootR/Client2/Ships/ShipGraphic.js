/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var ShipGraphic = (function (_super) {
        __extends(ShipGraphic, _super);
        function ShipGraphic(position, size, contentManager) {
            // The Graphic color is transparent because all graphics that represent a ship will be added as a child.
            _super.call(this, position.X, position.Y, size.Width, size.Height, eg.Graphics.Color.Transparent);

            this._shipBody = new eg.Graphics.Sprite2d(0, 0, contentManager.GetImage("Ship1"));
            this.AddChild(this._shipBody);
        }
        return ShipGraphic;
    })(eg.Graphics.Rectangle);
    ShootR.ShipGraphic = ShipGraphic;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipGraphic.js.map
