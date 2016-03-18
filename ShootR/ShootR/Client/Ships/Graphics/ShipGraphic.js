/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="ShipLifeGraphic.ts" />
/// <reference path="ShipDamageGraphic.ts" />
/// <reference path="ShipBodyGraphic.ts" />
/// <reference path="../Ship.ts" />
/// <reference path="../Levels/ShipLevelManager.ts" />
/// <reference path="ShipStatusTextGraphic.ts" />
/// <reference path="ShipNameGraphic.ts" />
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
        function ShipGraphic(name, userControlled, levelManager, lifeController, position, rotation, size, contentManager) {
            // The Graphic color is transparent because all graphics that represent a ship will be added as a child.
            _super.call(this, position.X, position.Y, size.Width, size.Height, eg.Graphics.Color.Transparent);

            this.Body = new ShootR.ShipBodyGraphic(levelManager);
            this.RotateShip(rotation);
            this._damageGraphic = new ShootR.ShipDamageGraphic(lifeController, contentManager);
            this._statusGraphic = new ShootR.ShipStatusTextGraphic(levelManager, lifeController);

            this.AddChild(this.Body);
            this.AddChild(this._statusGraphic);
            this.Body.AddChild(this._damageGraphic);

            if (!userControlled) {
                this._lifeBar = new ShootR.ShipLifeGraphic(lifeController);
                this._nameGraphic = new ShootR.ShipNameGraphic(name);

                this.AddChild(this._lifeBar);
                this.AddChild(this._nameGraphic);
            }
        }
        ShipGraphic.prototype.Status = function (text, size, color, fadeDuration, reverseDirection) {
            this._statusGraphic.Status(text, size, color, fadeDuration, reverseDirection);
        };

        ShipGraphic.prototype.AddChildToShip = function (child) {
            this.Body.AddChild(child);
        };

        ShipGraphic.prototype.RotateShip = function (newRotation) {
            this.Body.Rotation = newRotation;
        };

        ShipGraphic.prototype.HideShip = function () {
            if (this._lifeBar) {
                this._lifeBar.Visible = false;
                this._nameGraphic.Visible = false;
            }

            this.Body.Visible = false;
        };

        ShipGraphic.prototype.Update = function (gameTime) {
            this._statusGraphic.Update(gameTime);
        };
        return ShipGraphic;
    })(eg.Graphics.Rectangle);
    ShootR.ShipGraphic = ShipGraphic;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipGraphic.js.map
