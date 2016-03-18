/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="ShipLifeGraphic.ts" />
/// <reference path="ShipDamageGraphic.ts" />
/// <reference path="ShipBodyGraphic.ts" />
/// <reference path="../Ship.ts" />
/// <reference path="../Levels/ShipLevelManager.ts" />
/// <reference path="ShipStatusTextGraphic.ts" />
/// <reference path="ShipNameGraphic.ts" />

module ShootR {

    export class ShipGraphic extends eg.Graphics.Rectangle {
        public Body: ShipBodyGraphic;
        private _damageGraphic: ShipDamageGraphic;
        private _lifeBar: ShipLifeGraphic;
        private _statusGraphic: ShipStatusTextGraphic;
        private _nameGraphic: ShipNameGraphic;

        constructor(name: string, userControlled: boolean, levelManager: ShipLevelManager, lifeController: ShipLifeController, position: eg.Vector2d, rotation: number, size: eg.Size2d, contentManager: eg.Content.ContentManager) {
            // The Graphic color is transparent because all graphics that represent a ship will be added as a child.
            super(position.X, position.Y, size.Width, size.Height, eg.Graphics.Color.Transparent);            

            this.Body = new ShipBodyGraphic(levelManager);
            this.RotateShip(rotation);
            this._damageGraphic = new ShipDamageGraphic(lifeController, contentManager);
            this._statusGraphic = new ShipStatusTextGraphic(levelManager, lifeController);

            this.AddChild(this.Body);
            this.AddChild(this._statusGraphic);
            this.Body.AddChild(this._damageGraphic);

            if (!userControlled) {
                this._lifeBar = new ShipLifeGraphic(lifeController);
                this._nameGraphic = new ShipNameGraphic(name);

                this.AddChild(this._lifeBar);
                this.AddChild(this._nameGraphic);
            }
        }

        public Status(text: string, size: number, color: eg.Graphics.Color, fadeDuration?: eg.TimeSpan, reverseDirection?: boolean): void {
            this._statusGraphic.Status(text, size, color, fadeDuration, reverseDirection);
        }

        public AddChildToShip(child: eg.Graphics.Graphic2d): void {
            this.Body.AddChild(child);
        }

        public RotateShip(newRotation: number): void {
            this.Body.Rotation = newRotation;
        }

        public HideShip(): void {
            if (this._lifeBar) {
                this._lifeBar.Visible = false;
                this._nameGraphic.Visible = false;
            }

            this.Body.Visible = false;
        }

        public Update(gameTime: eg.GameTime): void {
            this._statusGraphic.Update(gameTime);
        }
    }
    
}