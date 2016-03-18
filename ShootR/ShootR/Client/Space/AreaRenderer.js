/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ships/Ship.ts" />
/// <reference path="../Ships/ShipManager.ts" />
/// <reference path="Area.ts" />
var ShootR;
(function (ShootR) {
    var AreaRenderer = (function () {
        function AreaRenderer(_scene, keyboard) {
            var _this = this;
            this._scene = _scene;
            this._active = true;
            this._areas = new Array();

            keyboard.OnCommandPress(AreaRenderer.KEYBOARD_MAPPING, function () {
                _this._active = !_this._active;

                _this.UpdateVisible();
            });

            if (!(!!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/)))) {
                this.Hide();
            }
        }
        AreaRenderer.prototype.OnMapResize = function (newSize) {
            this._mapSize = newSize;
            this._areaSize = new eg.Size2d(Math.max(Math.round(newSize.Width / AreaRenderer.AREA_LETTERS.length), 1000));

            // On every map resize we need to rebuild the sectors so that they fit within the map
            this.BuildSectors();
        };

        AreaRenderer.prototype.AreaFromPosition = function (position) {
            var letter = AreaRenderer.AREA_LETTERS[Math.max(Math.floor(position.X / this._areaSize.Width), 0)], sectorNumber = Math.max(Math.ceil(position.Y / this._areaSize.Height), 1);

            return letter + sectorNumber.toString();
        };

        AreaRenderer.prototype.Show = function () {
            this._active = true;
            this.UpdateVisible();
        };

        AreaRenderer.prototype.Hide = function () {
            this._active = false;
            this.UpdateVisible();
        };

        AreaRenderer.prototype.BuildSectors = function () {
            var gridCount = this._mapSize.Width / this._areaSize.Width, locationOffset = this._areaSize.HalfWidth, area;

            if (gridCount % 1 !== 0) {
                throw new Error("Area size does not divide evenly into the map size.");
            }

            for (var i = 0; i < this._areas.length; i++) {
                this._areas[i].Dispose();
            }

            this._areas = new Array();

            for (var i = 0; i < gridCount; i++) {
                for (var j = 0; j < gridCount; j++) {
                    area = new ShootR.Area(locationOffset + this._areaSize.Width * j, locationOffset + this._areaSize.Width * i, this._areaSize.Width, AreaRenderer.AREA_LETTERS[j] + (i + 1));
                    area.ZIndex = -1;
                    this._areas.push(area);
                    this._scene.Add(area);
                }
            }

            this.UpdateVisible();
        };

        AreaRenderer.prototype.UpdateVisible = function () {
            for (var i = 0; i < this._areas.length; i++) {
                this._areas[i].Visible = this._active;
            }
        };
        AreaRenderer.AREA_BOX_COLOR = eg.Graphics.Color.FromHex("#304665");
        AreaRenderer.AREA_TEXT_COLOR = eg.Graphics.Color.FromHex("#3fa9f5");
        AreaRenderer.AREA_TEXT_MARGE = 17;
        AreaRenderer.KEYBOARD_MAPPING = "m";
        AreaRenderer.AREA_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        return AreaRenderer;
    })();
    ShootR.AreaRenderer = AreaRenderer;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=AreaRenderer.js.map
