/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />

module ShootR {

    export class BulletGraphic extends eg.Graphics.Rectangle {
        private _bulletBody: eg.Graphics.Sprite2d;

        constructor(position: eg.Vector2d, size: eg.Size2d, contentManager: eg.Content.ContentManager) {
            // The Graphic color is transparent because all graphics that represent a ship will be added as a child.
            super(position.X, position.Y, size.Width, size.Height, eg.Graphics.Color.Transparent);

            this._bulletBody = new eg.Graphics.Sprite2d(0, 0, contentManager.GetImage("Bullet"));
            this.AddChild(this._bulletBody);
        }

        public HideBullet(): void {
            this._bulletBody.Visible = false;
        }
    }

}