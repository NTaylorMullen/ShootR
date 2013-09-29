/// <reference path="../../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="ShipLifeGraphic.ts" />
/// <reference path="ShipDamageGraphic.ts" />
/// <reference path="ShipBodyGraphic.ts" />
/// <reference path="../Ship.ts" />
/// <reference path="../Levels/ShipLevelManager.ts" />

module ShootR {

    export class ShipGraphic extends eg.Graphics.Rectangle {
        public Body: ShipBodyGraphic;
        private _damageGraphic: ShipDamageGraphic;
        private _lifeBar: ShipLifeGraphic;

        constructor(levelManager: ShipLevelManager, lifeController: ShipLifeController, position: eg.Vector2d, size: eg.Size2d, contentManager: eg.Content.ContentManager) {
            // The Graphic color is transparent because all graphics that represent a ship will be added as a child.
            super(position.X, position.Y, size.Width, size.Height, eg.Graphics.Color.Transparent);            

            this.Body = new ShipBodyGraphic(levelManager);
            this._damageGraphic = new ShipDamageGraphic(lifeController, contentManager);
            this._lifeBar = new ShipLifeGraphic(lifeController);

            this.AddChild(this.Body);
            this.AddChild(this._lifeBar);

            this.Body.AddChild(this._damageGraphic);
        }

        public AddChildToShip(child: eg.Graphics.Graphic2d): void {
            this.Body.AddChild(child);
        }

        public RotateShip(newRotation: number): void {
            this.Body.Rotation = newRotation;
        }

        public HideShip(): void {
            this._lifeBar.Visible = false;
            this.Body.Visible = false;
        }

        public HideLifeBar(): void {
            this._lifeBar.Visible = false;
        }
    }
    
}