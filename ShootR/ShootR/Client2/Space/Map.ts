/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="MapBoundary.ts" />
/// <reference path="AreaRenderer.ts" />

module ShootR {

    export class Map {
        public static SIZE: eg.Size2d;
        public static BARRIER_DEPRECATION: number;

        private _background: eg.Graphics.Sprite2d;
        private _boundaries: Array<MapBoundary>;
        public AreaRenderer: AreaRenderer;

        constructor(private _scene: eg.Rendering.Scene2d, private _collisionManager: eg.Collision.CollisionManager, private _contentManager: eg.Content.ContentManager, private _keyboard: eg.Input.KeyboardHandler) {
            this.BuildBackground();
            this.BuildBoundaries();
            this.BuildAreas();
        }

        private BuildBackground(): void {
            var cache: HTMLCanvasElement,
                context: CanvasRenderingContext2D,
                source: eg.Graphics.ImageSource = this._contentManager.GetImage("StarBackground"),
                build = () => {
                    cache = document.createElement("canvas");
                    cache.width = Map.SIZE.Width + this._scene.Camera.Size.Width;
                    cache.height = Map.SIZE.Height + this._scene.Camera.Size.Height;
                    context = cache.getContext("2d");

                    context.fillStyle = context.createPattern(source.Source, "repeat");
                    context.fillRect(0, 0, cache.width, cache.height);

                    // Make the background larger than the map so stars appear beyond the borders
                    this._background = new eg.Graphics.Sprite2d(Map.SIZE.HalfWidth, Map.SIZE.HalfHeight, new eg.Graphics.ImageSource((<any>cache), Map.SIZE.Width + this._scene.Camera.Size.Width, Map.SIZE.Height + this._scene.Camera.Size.Height), Map.SIZE.Width + this._scene.Camera.Size.Width, Map.SIZE.Height + this._scene.Camera.Size.Height);
                    this._background.ZIndex = -2;

                    this._scene.Add(this._background);
                };

            if (source.IsLoaded()) {
                build();
            } else {
                source.OnLoaded.Bind(build);
            }
        }

        private BuildBoundaries(): void {
            var corners: Array<eg.Vector2d> = new Array<eg.Vector2d>(
                new eg.Vector2d(-2, -2),
                new eg.Vector2d(Map.SIZE.Width + 2, -2),
                new eg.Vector2d(Map.SIZE.Width + 2, Map.SIZE.Height + 2),
                new eg.Vector2d(-2, Map.SIZE.Height + 2)),
                boundary: MapBoundary;

            this._boundaries = new Array<MapBoundary>();

            for (var i = 0; i < corners.length; i++) {
                boundary = new MapBoundary(new eg.Vector2d(corners[i].X, corners[i].Y), new eg.Vector2d(corners[(i + 1) % corners.length].X, corners[(i + 1) % corners.length].Y));
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