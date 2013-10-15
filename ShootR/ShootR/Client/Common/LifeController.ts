/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />

module ShootR {

    export class LifeController {
        public Alive: boolean;
        public Health: number;
        public MaxHealth: number;

        constructor(health: number, maxHealth: number) {
            this.Alive = true;
            this.Health = health;
            this.MaxHealth = maxHealth;
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