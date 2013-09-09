/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />

module ShootR {

    export class ShipLifeController {
        public static START_LIFE: number = 100;
        public static BAD_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("#ED1E79");
        public static HURT_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("#FF931E");
        public static GOOD_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("#7AC943");
        public static BAD_THRESHOLD: number = .3;
        public static HURT_THRESHOLD: number = .6;

        public Alive: boolean;
        public Health: number;
        public MaxHealth: number;

        constructor() {
            this.Alive = true;
            this.MaxHealth = this.Health = ShipLifeController.START_LIFE;
            this.OnLifeChange = new eg.EventHandler2<number, number>();
        }

        public OnLifeChange: eg.EventHandler2<number, number>;

        public get HealthPercent(): number {
            return this.Health / this.MaxHealth;
        }

        public LoadPayload(payload: Server.IShipData): void {
            this.Alive = payload.LifeController.Alive;
            if (this.Health !== payload.LifeController.Health || this.MaxHealth !== payload.MaxLife) {
                this.Health = payload.LifeController.Health;
                this.MaxHealth = payload.MaxLife;

                this.OnLifeChange.Trigger(this.Health, this.MaxHealth);
            }
        }
    }

}