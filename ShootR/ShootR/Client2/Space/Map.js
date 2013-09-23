/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="MapBoundary.ts" />
/// <reference path="AreaRenderer.ts" />
var ShootR;
(function (ShootR) {
    var Map = (function () {
        function Map(_scene, _collisionManager, _contentManager, _keyboard) {
            this._scene = _scene;
            this._collisionManager = _collisionManager;
            this._contentManager = _contentManager;
            this._keyboard = _keyboard;
            this.BuildBackground();
            this.BuildBoundaries();
            this.BuildAreas();
        }
        Map.prototype.BuildBackground = function () {
            var _this = this;
            var cache, context, source = this._contentManager.GetImage("StarBackground"), build = function () {
                cache = document.createElement("canvas");
                cache.width = Map.SIZE.Width + _this._scene.Camera.Size.Width;
                cache.height = Map.SIZE.Height + _this._scene.Camera.Size.Height;
                context = cache.getContext("2d");

                context.fillStyle = context.createPattern(source.Source, "repeat");
                context.fillRect(0, 0, cache.width, cache.height);

                // Make the background larger than the map so stars appear beyond the borders
                _this._background = new eg.Graphics.Sprite2d(Map.SIZE.HalfWidth, Map.SIZE.HalfHeight, new eg.Graphics.ImageSource((cache), Map.SIZE.Width + _this._scene.Camera.Size.Width, Map.SIZE.Height + _this._scene.Camera.Size.Height), Map.SIZE.Width + _this._scene.Camera.Size.Width, Map.SIZE.Height + _this._scene.Camera.Size.Height);
                _this._background.ZIndex = -2;

                _this._scene.Add(_this._background);
            };

            if (source.IsLoaded()) {
                build();
            } else {
                source.OnLoaded.Bind(build);
            }
        };

        Map.prototype.BuildBoundaries = function () {
            var corners = new Array(new eg.Vector2d(-2, -2), new eg.Vector2d(Map.SIZE.Width + 2, -2), new eg.Vector2d(Map.SIZE.Width + 2, Map.SIZE.Height + 2), new eg.Vector2d(-2, Map.SIZE.Height + 2)), boundary;

            this._boundaries = new Array();

            for (var i = 0; i < corners.length; i++) {
                boundary = new ShootR.MapBoundary(new eg.Vector2d(corners[i].X, corners[i].Y), new eg.Vector2d(corners[(i + 1) % corners.length].X, corners[(i + 1) % corners.length].Y));
                this._collisionManager.Monitor(boundary, true);
                this._scene.Add(boundary.Graphic);
                this._boundaries.push(boundary);
            }
        };

        Map.prototype.BuildAreas = function () {
            this.AreaRenderer = new ShootR.AreaRenderer(this._scene, this._keyboard);
            this.AreaRenderer.OnMapResize(Map.SIZE);
        };
        return Map;
    })();
    ShootR.Map = Map;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=Map.js.map
