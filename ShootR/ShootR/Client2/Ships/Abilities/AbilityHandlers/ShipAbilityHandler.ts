/// <reference path="../../../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../../../Space/MapBoundary.ts" />
/// <reference path="../../Ship.ts" />
/// <reference path="../Boost.ts" />
/// <reference path="AbilityHandler.ts" />

module ShootR {

    export class ShipAbilityHandler extends AbilityHandler {
        private boost: Boost;

        constructor(myShip: Ship) {
            var boost: Boost = new Boost(myShip.MovementController);
            super([boost]);

            this.boost = boost;

            myShip.OnCollision.Bind((data: eg.Collision.CollisionData) => {
                if (data.With instanceof MapBoundary) {
                    this.boost.Deactivate();
                }
            });
        }
    }

}