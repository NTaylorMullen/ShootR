/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Levels/ShipLevelManager.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var ShipBodyGraphic = (function (_super) {
        __extends(ShipBodyGraphic, _super);
        function ShipBodyGraphic(levelManager) {
            var _this = this;
            _super.call(this, 0, 0, this.DetermineBody(levelManager));

            levelManager.OnLevelChange.Bind(function (newLevel) {
                _this.Image = _this.DetermineBody(levelManager);
            });
        }
        ShipBodyGraphic.prototype.DetermineBody = function (levelManager) {
            return ShipBodyGraphic._bodyGraphics[Math.min(levelManager.Level, 13)];
        };

        ShipBodyGraphic.LoadShipBodies = // Made as a static so we don't have to construct the ship bodies every time a new ship is created.
        function (contentManager) {
            ShipBodyGraphic._bodyGraphics = new Array();

            ShipBodyGraphic._bodyGraphics[1] = ShipBodyGraphic._bodyGraphics[2] = contentManager.GetImage("Ship1");
            ShipBodyGraphic._bodyGraphics[3] = ShipBodyGraphic._bodyGraphics[4] = contentManager.GetImage("Ship3");
            ShipBodyGraphic._bodyGraphics[5] = ShipBodyGraphic._bodyGraphics[6] = contentManager.GetImage("Ship5");
            ShipBodyGraphic._bodyGraphics[7] = contentManager.GetImage("Ship7");
            ShipBodyGraphic._bodyGraphics[8] = contentManager.GetImage("Ship8");
            ShipBodyGraphic._bodyGraphics[9] = contentManager.GetImage("Ship9");
            ShipBodyGraphic._bodyGraphics[10] = ShipBodyGraphic._bodyGraphics[11] = contentManager.GetImage("Ship10");
            ShipBodyGraphic._bodyGraphics[12] = contentManager.GetImage("Ship12");
            ShipBodyGraphic._bodyGraphics[13] = contentManager.GetImage("Ship10");
        };
        return ShipBodyGraphic;
    })(eg.Graphics.Sprite2d);
    ShootR.ShipBodyGraphic = ShipBodyGraphic;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipBodyGraphic.js.map
