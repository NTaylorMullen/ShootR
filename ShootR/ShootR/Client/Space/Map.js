/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="MapBoundary.ts" />
/// <reference path="AreaRenderer.ts" />
var ShootR;
(function (ShootR) {
    var Map = (function () {
        function Map(_scene, _collisionManager, _contentManager, _keyboard, serverAdapter) {
            var _this = this;
            this._scene = _scene;
            this._collisionManager = _collisionManager;
            this._contentManager = _contentManager;
            this._keyboard = _keyboard;
            this._boundaries = new Array();
            this._backgroundTiles = new Array();

            this.BuildBackground();
            this.BuildBoundaries();
            this.BuildAreas();

            serverAdapter.OnMapResize.Bind(function (newSize) {
                Map.SIZE = newSize;
                _this.BuildBackground();
                _this.BuildBoundaries();
                _this.AreaRenderer.OnMapResize(newSize);
            });
        }
        Map.prototype.BuildBackground = function () {
            var _this = this;
            var source = this._contentManager.GetImage("StarBackground"), build = function () {
                // Add 2 to give a buffer on both sides of the map
                var tileCount = (Map.SIZE.Width / source.ClipSize.Width) + 2, templateTile = new eg.Graphics.Sprite2d(0, 0, source, source.ClipSize.Width, source.ClipSize.Height), tile;

                templateTile.ZIndex = -2;

                for (var i = 0; i < _this._backgroundTiles.length; i++) {
                    _this._backgroundTiles[i].Dispose();
                }

                _this._backgroundTiles = new Array();

                for (var i = 0; i < tileCount; i++) {
                    for (var j = 0; j < tileCount; j++) {
                        tile = templateTile.Clone();
                        tile.Position.X = j * source.ClipSize.Width - source.ClipSize.HalfWidth;
                        tile.Position.Y = i * source.ClipSize.Height - source.ClipSize.HalfHeight;
                        _this._scene.Add(tile);
                        _this._backgroundTiles.push(tile);
                    }
                }
            };

            if (source.IsLoaded()) {
                build();
            } else {
                source.OnLoaded.Bind(build);
            }
        };

        Map.prototype.BuildBoundaries = function () {
            var corners = new Array(new eg.Vector2d(0, 0), new eg.Vector2d(Map.SIZE.Width, 0), new eg.Vector2d(Map.SIZE.Width, Map.SIZE.Height), new eg.Vector2d(0, Map.SIZE.Height)), boundary;

            for (var i = 0; i < this._boundaries.length; i++) {
                this._boundaries[i].Dispose();
            }

            this._boundaries = new Array();

            for (var i = 0; i < corners.length; i++) {
                boundary = new ShootR.MapBoundary(new eg.Vector2d(corners[i].X, corners[i].Y), new eg.Vector2d(corners[(i + 1) % corners.length].X, corners[(i + 1) % corners.length].Y));
                boundary.Graphic.ZIndex = -1;
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
