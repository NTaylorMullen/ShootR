/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="MapBoundary.ts" />
/// <reference path="AreaRenderer.ts" />

module ShootR {

    export class Map {
        public static SIZE: eg.Size2d;
        public static BARRIER_DEPRECATION: number;

        private _backgroundTiles: Array<eg.Graphics.Sprite2d>;
        private _boundaries: Array<MapBoundary>;
        public AreaRenderer: AreaRenderer;

        constructor(private _scene: eg.Rendering.Scene2d, private _collisionManager: eg.Collision.CollisionManager, private _contentManager: eg.Content.ContentManager, private _keyboard: eg.Input.KeyboardHandler, serverAdapter: Server.ServerAdapter) {
            this._boundaries = new Array<MapBoundary>();
            this._backgroundTiles = new Array<eg.Graphics.Sprite2d>();

            this.BuildBackground();
            this.BuildBoundaries();
            this.BuildAreas();

            serverAdapter.OnMapResize.Bind((newSize: eg.Size2d) => {
                Map.SIZE = newSize;
                this.BuildBackground();
                this.BuildBoundaries();
                this.AreaRenderer.OnMapResize(newSize);
            });
        }

        private BuildBackground(): void {
            var source: eg.Graphics.ImageSource = this._contentManager.GetImage("StarBackground"),
                build = () => {
                    // Add 2 to give a buffer on both sides of the map
                    var tileCount: number = (Map.SIZE.Width / source.ClipSize.Width) + 2,
                        templateTile: eg.Graphics.Sprite2d = new eg.Graphics.Sprite2d(0, 0, source, source.ClipSize.Width, source.ClipSize.Height),
                        tile: eg.Graphics.Sprite2d;

                    templateTile.ZIndex = -2;

                    // Clean up any existing tiles so that we can create new ones (also used to resize the map).
                    for (var i = 0; i < this._backgroundTiles.length; i++) {
                        this._backgroundTiles[i].Dispose();
                    }

                    this._backgroundTiles = new Array<eg.Graphics.Sprite2d>();

                    for (var i = 0; i < tileCount; i++) {
                        for (var j = 0; j < tileCount; j++) {
                            tile = templateTile.Clone();
                            tile.Position.X = j * source.ClipSize.Width - source.ClipSize.HalfWidth;
                            tile.Position.Y = i * source.ClipSize.Height - source.ClipSize.HalfHeight;
                            this._scene.Add(tile);
                            this._backgroundTiles.push(tile);
                        }
                    }
                };

            if (source.IsLoaded()) {
                build();
            } else {
                source.OnLoaded.Bind(build);
            }
        }

        private BuildBoundaries(): void {
            var corners: Array<eg.Vector2d> = new Array<eg.Vector2d>(
                new eg.Vector2d(0, 0),
                new eg.Vector2d(Map.SIZE.Width, 0),
                new eg.Vector2d(Map.SIZE.Width, Map.SIZE.Height),
                new eg.Vector2d(0, Map.SIZE.Height)),
                boundary: MapBoundary;

            for (var i = 0; i < this._boundaries.length; i++) {
                this._boundaries[i].Dispose();
            }

            this._boundaries = new Array<MapBoundary>();

            for (var i = 0; i < corners.length; i++) {
                boundary = new MapBoundary(new eg.Vector2d(corners[i].X, corners[i].Y), new eg.Vector2d(corners[(i + 1) % corners.length].X, corners[(i + 1) % corners.length].Y));
                boundary.Graphic.ZIndex = -1;
                this._collisionManager.Monitor(boundary, true);
                this._scene.Add(boundary.Graphic);
                this._boundaries.push(boundary);
            }
        }

        private BuildAreas(): void {
            this.AreaRenderer = new AreaRenderer(this._scene, this._keyboard);
            this.AreaRenderer.OnMapResize(Map.SIZE);
        }
    }

}