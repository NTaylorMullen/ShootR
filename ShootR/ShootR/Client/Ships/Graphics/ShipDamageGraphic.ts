/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../ShipLifeController.ts" />
/// <reference path="../Ship.ts" />

module ShootR {

    export class ShipDamageGraphic extends eg.Graphics.Rectangle {
        private static DAMAGE_TIERS: Array<number> = [1, 3, 5, 7];

        private _damageTiers: Array<eg.Graphics.Sprite2d>;

        constructor(lifeController: ShipLifeController, contentManager: eg.Content.ContentManager) {
            var damageTier: number;

            super(0, 0, Ship.SIZE.Width, Ship.SIZE.Height, eg.Graphics.Color.Transparent);

            this._damageTiers = new Array<eg.Graphics.Sprite2d>();

            for (var i = 0; i < ShipDamageGraphic.DAMAGE_TIERS.length; i++) {
                damageTier = ShipDamageGraphic.DAMAGE_TIERS[i];

                this._damageTiers[damageTier] = new eg.Graphics.Sprite2d(0, 0, contentManager.GetImage("ShipDamage" + damageTier));
                this._damageTiers[damageTier].ZIndex = i;
                this._damageTiers[damageTier].Visible = false;
                this.AddChild(this._damageTiers[damageTier]);
            }

            lifeController.OnLifeChange.Bind((currentHealth: number, maxHealth: number) => {
                var damageImage: number = Math.floor((1 - currentHealth / maxHealth) * 10) - 2,
                    damageTier: number;

                if (damageImage > 0) {                    
                    for (var i = 0; i < ShipDamageGraphic.DAMAGE_TIERS.length; i++) {
                        damageTier = ShipDamageGraphic.DAMAGE_TIERS[i];

                        if (damageTier <= damageImage) {
                            this._damageTiers[damageTier].Visible = true;
                        } else {
                            this._damageTiers[damageTier].Visible = false;
                        }
                    }
                }
                else { // Not enough damage, turn all damage images off
                    for (var i = 0; i < ShipDamageGraphic.DAMAGE_TIERS.length; i++) {
                        damageTier = ShipDamageGraphic.DAMAGE_TIERS[i];

                        this._damageTiers[damageTier].Visible = false;
                    }
                }
            });
        }

        public Update(gameTime: eg.GameTime): void {

        }
    }

}