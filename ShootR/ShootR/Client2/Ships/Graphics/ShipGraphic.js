/// <reference path="../../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="ShipLifeGraphic.ts" />
/// <reference path="../Ship.ts" />
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
        function ShipGraphic(lifeController, position, size, contentManager) {
            // The Graphic color is transparent because all graphics that represent a ship will be added as a child.
            _super.call(this, position.X, position.Y, size.Width, size.Height, eg.Graphics.Color.Transparent);

            this.Body = new eg.Graphics.Sprite2d(0, 0, contentManager.GetImage("Ship1"));
            this._lifeBar = new ShootR.ShipLifeGraphic(lifeController);

            this.AddChild(this.Body);
            this.AddChild(this._lifeBar);
        }
        ShipGraphic.prototype.AddChildToShip = function (child) {
            this.Body.AddChild(child);
        };

        ShipGraphic.prototype.RotateShip = function (newRotation) {
            this.Body.Rotation = newRotation;
        };

        ShipGraphic.prototype.HideShip = function () {
            this._lifeBar.Visible = false;
            this.Body.Visible = false;
        };

        ShipGraphic.prototype.HideLifeBar = function () {
            this._lifeBar.Visible = false;
        };
        return ShipGraphic;
    })(eg.Graphics.Rectangle);
    ShootR.ShipGraphic = ShipGraphic;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipGraphic.js.map
