/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var Area = (function (_super) {
        __extends(Area, _super);
        function Area(x, y, size, _area) {
            _super.call(this, x, y, size, size, eg.Graphics.Color.Transparent);
            this._area = _area;

            this.Border(2, Area.BOX_COLOR);

            this.BuildTextCorners();
        }
        Area.prototype.BuildTextCorners = function () {
            var locationOffset = this.Size.HalfWidth - Area.TEXT_MARGIN, text;

            text = new eg.Graphics.Text2d(-locationOffset, -locationOffset, this._area, Area.TEXT_COLOR);
            text.Align = "left";
            text.FontSettings.FontSize = "18px";
            text.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Calibri;
            this.AddChild(text);

            text = text.Clone();
            text.Position = new eg.Vector2d(-locationOffset, +locationOffset);
            this.AddChild(text);

            text = text.Clone();
            text.Align = "right";
            text.Position = new eg.Vector2d(locationOffset, -locationOffset);
            this.AddChild(text);

            text = text.Clone();
            text.Position = new eg.Vector2d(locationOffset, locationOffset);
            this.AddChild(text);
        };
        Area.BOX_COLOR = eg.Graphics.Color.FromHex("#304665");
        Area.TEXT_COLOR = eg.Graphics.Color.FromHex("#3fa9f5");
        Area.TEXT_MARGIN = 20;
        return Area;
    })(eg.Graphics.Rectangle);
    ShootR.Area = Area;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=Area.js.map
