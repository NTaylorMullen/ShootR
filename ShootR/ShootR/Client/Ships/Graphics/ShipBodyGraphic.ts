/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Levels/ShipLevelManager.ts" />

module ShootR {

    export class ShipBodyGraphic extends eg.Graphics.Sprite2d {
        private static _bodyGraphics: Array<eg.Graphics.ImageSource>;

        constructor(levelManager: ShipLevelManager) {
            super(0, 0, this.DetermineBody(levelManager));

            levelManager.OnLevelChange.Bind((newLevel: number) => {
                this.Image = this.DetermineBody(levelManager);
            });
        }

        private DetermineBody(levelManager: ShipLevelManager): eg.Graphics.ImageSource {
            return ShipBodyGraphic._bodyGraphics[Math.min(levelManager.Level, 13)];
        }

        // Made as a static so we don't have to construct the ship bodies every time a new ship is created.
        public static LoadShipBodies(contentManager: eg.Content.ContentManager): void {
            ShipBodyGraphic._bodyGraphics = new Array<eg.Graphics.ImageSource>();

            ShipBodyGraphic._bodyGraphics[1] = ShipBodyGraphic._bodyGraphics[2] = contentManager.GetImage("Ship1");
            ShipBodyGraphic._bodyGraphics[3] = ShipBodyGraphic._bodyGraphics[4] = contentManager.GetImage("Ship3");
            ShipBodyGraphic._bodyGraphics[5] = ShipBodyGraphic._bodyGraphics[6] = contentManager.GetImage("Ship5");
            ShipBodyGraphic._bodyGraphics[7] = contentManager.GetImage("Ship7");
            ShipBodyGraphic._bodyGraphics[8] = contentManager.GetImage("Ship8");
            ShipBodyGraphic._bodyGraphics[9] = contentManager.GetImage("Ship9");
            ShipBodyGraphic._bodyGraphics[10] = ShipBodyGraphic._bodyGraphics[11] = contentManager.GetImage("Ship10");
            ShipBodyGraphic._bodyGraphics[12] = contentManager.GetImage("Ship12");
            ShipBodyGraphic._bodyGraphics[13] = contentManager.GetImage("Ship10");
        }
    }

}