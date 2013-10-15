/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ship.ts" />

module ShootR {

    export class ShipLifeGraphic extends eg.Graphics.Rectangle {
        public static BACKGROUND_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("7F767D");
        public static BORDER_COLOR: eg.Graphics.Color = eg.Graphics.Color.Black;
        public static Y_OFFSET: number = 15;
        public static SHIP_WIDTH_PARTIAL: number = .8;
        public static HEIGHT: number = 5;

        private _overlay: eg.Graphics.Rectangle;
        private _lifeController: ShipLifeController;

        constructor(lifeController: ShipLifeController) {
            var width = Ship.SIZE.Width * ShipLifeGraphic.SHIP_WIDTH_PARTIAL;

            super(0, Ship.SIZE.HalfHeight + ShipLifeGraphic.Y_OFFSET, width, ShipLifeGraphic.HEIGHT, ShipLifeGraphic.BACKGROUND_COLOR);

            this._lifeController = lifeController;

            this.Border(1, ShipLifeGraphic.BORDER_COLOR);

            this._overlay = new eg.Graphics.Rectangle(0, 0, width, ShipLifeGraphic.HEIGHT, this.OverlayColor());

            this._lifeController.OnLifeChange.Bind((health: number, maxHealth: number) => {
                this.UpdateGraphic(health, maxHealth);
            });

            this.UpdateGraphic(lifeController.Health, lifeController.MaxHealth);

            this.AddChild(this._overlay);
        }

        private UpdateGraphic(health: number, maxHealth: number): void {
            var healthPercentage: number = health / maxHealth;

            this._overlay.Color = this.OverlayColor();
            this._overlay.Size.Width = healthPercentage * (this.Size.Width);
            this._overlay.Position.X = -(this.Size.Width - this._overlay.Size.Width) * .5;
        }

        private OverlayColor(): eg.Graphics.Color {
            var healthPercentage: number = this._lifeController.HealthPercent;

            if (healthPercentage <= ShipLifeController.BAD_THRESHOLD) {
                return ShipLifeController.BAD_COLOR;
            } else if (healthPercentage <= ShipLifeController.HURT_THRESHOLD) {
                return ShipLifeController.HURT_COLOR;
            } else {
                return ShipLifeController.GOOD_COLOR;
            }
        }
    }

}