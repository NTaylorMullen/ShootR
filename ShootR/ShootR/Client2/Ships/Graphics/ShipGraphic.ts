/// <reference path="../../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="ShipLifeGraphic.ts" />
/// <reference path="../Ship.ts" />

module ShootR {

    export class ShipGraphic extends eg.Graphics.Rectangle {
        private _body: eg.Graphics.Sprite2d;
        private _lifeBar: ShipLifeGraphic;

        constructor(lifeController: ShipLifeController, position: eg.Vector2d, size: eg.Size2d, contentManager: eg.Content.ContentManager) {
            // The Graphic color is transparent because all graphics that represent a ship will be added as a child.
            super(position.X, position.Y, size.Width, size.Height, eg.Graphics.Color.Transparent);

            this._body = new eg.Graphics.Sprite2d(0, 0, contentManager.GetImage("Ship1"));
            this._lifeBar = new ShipLifeGraphic(lifeController);

            this.AddChild(this._body);
            this.AddChild(this._lifeBar);
        }

        public AddChildToShip(child: eg.Graphics.Graphic2d): void {
            this._body.AddChild(child);
        }

        public RotateShip(newRotation: number): void {
            this._body.Rotation = newRotation;
        }

        public HideShip(): void {
            this._lifeBar.Visible = false;
            this._body.Visible = false;
        }

        public HideLifeBar(): void {
            this._lifeBar.Visible = false;
        }
    }
    
}