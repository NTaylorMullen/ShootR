/// <reference path="../../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../../Space/MapBoundary.ts" />
/// <reference path="../../../Server/IPayloadDefinitions.ts" />
/// <reference path="../../Ship.ts" />
/// <reference path="../Boost.ts" />
/// <reference path="AbilityHandler.ts" />

module ShootR {

    export class ShipAbilityHandler extends AbilityHandler {
        public Boost: Boost;

        constructor(myShip: Ship) {
            var boost: Boost = new Boost(myShip.MovementController);
            super([boost]);

            this.Boost = boost;

            myShip.OnCollision.Bind((data: eg.Collision.CollisionData) => {
                if (data.With instanceof MapBoundary) {
                    this.Boost.Deactivate();
                }
            });
        }

        public LoadPayload(payload: Server.IAbilityData): void {
            if (payload.Boost && !this.Boost.Active) {
                this.Boost.Activate();
            } else if (!payload.Boost) {
                this.Boost.Deactivate();
            }
        }
    }

}