/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ships/Ship.ts" />
/// <reference path="Map.ts" />

module ShootR {

    export class MapBoundary extends eg.Collision.Collidable {
        public static Color: eg.Graphics.Color = eg.Graphics.Color.FromHex("#3fa9f5");
        public static BoundaryWidth: number = 5;

        public Graphic: eg.Graphics.Line2d;

        private _bounceMultiplier: eg.Vector2d;

        constructor(from: eg.Vector2d, to: eg.Vector2d) {
            this.Graphic = new eg.Graphics.Line2d(from.X, from.Y, to.X, to.Y, 1, MapBoundary.Color);

            super(this.Graphic.GetDrawBounds());

            this.Graphic.LineWidth = MapBoundary.BoundaryWidth;

            // Left or right
            if (from.X - to.X === 0) {
                this._bounceMultiplier = new eg.Vector2d(-Map.BARRIER_DEPRECATION, Map.BARRIER_DEPRECATION);
            } else { // Top or bottom
                this._bounceMultiplier = new eg.Vector2d(Map.BARRIER_DEPRECATION, -Map.BARRIER_DEPRECATION);
            }
        }

        public Collided(data: eg.Collision.CollisionData): void {
            if (data.With instanceof Ship) {
                this.HandleShipCollision(<Ship>data.With);
            }

            // TODO: Add bullet
        }

        public Dispose(): void {
            super.Dispose();
            this.Graphic.Dispose();
        }

        private HandleShipCollision(ship: Ship): void {
            var bounceMultiplier: eg.Vector2d;

            ship.MovementController.StopMoving("Forward");
            ship.MovementController.StopMoving("Backward");
            ship.AnimationHandler.StopAllAnimations();

            this.RepositionShipInBounds(ship);

            // Reverse velocity, aka bounce
            ship.MovementController.Forces = ship.MovementController.Forces.Multiply(this._bounceMultiplier);
            ship.MovementController.Velocity = ship.MovementController.Velocity.Multiply(this._bounceMultiplier);
        }

        // Ugly
        private RepositionShipInBounds(ship: Ship): void {
            // Re-position to be in-bounds
            if (ship.MovementController.Position.X - Ship.SIZE.HalfWidth <= 1) {
                ship.MovementController.Position.X = Ship.SIZE.HalfWidth + 3;
            } else if (ship.MovementController.Position.X + Ship.SIZE.HalfWidth >= Map.SIZE.Width - 1) {
                ship.MovementController.Position.X = Map.SIZE.Width - Ship.SIZE.HalfWidth - 3;
            }

            if (ship.MovementController.Position.Y - Ship.SIZE.HalfHeight <= 1) {
                ship.MovementController.Position.Y = Ship.SIZE.HalfHeight + 3;
            } else if (ship.MovementController.Position.Y + Ship.SIZE.HalfHeight >= Map.SIZE.Height - 1) {
                ship.MovementController.Position.Y = Map.SIZE.Height - Ship.SIZE.HalfHeight - 3;
            }
        }
    }

}