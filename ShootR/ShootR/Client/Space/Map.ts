/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="CanvasRenderer.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../Ship/Ship.ts" />
/// <reference path="../Bullet/Bullet.ts" />

class Map {
    static WIDTH: number;
    static HEIGHT: number;
    static BARRIER_DEPRECATION: number = .75;

    constructor () {
    }

    private mapContains(position: Vector2, width: number, height: number): bool {
        return (position.X >= 0 && position.X + width <= Map.WIDTH &&
            position.Y >= 0 && position.Y + height <= Map.HEIGHT);
    }

    public CheckBoundaryCollisions(ships: { [s: any]: Ship; }, bullets: { [s: any]: Bullet; }): void {
        for (var key in ships) {
            if (!this.mapContains(ships[key].MovementController.Position, ships[key].WIDTH, ships[key].HEIGHT)) {
                var bounceMultiplier: Vector2;

                $(ships[key]).triggerHandler("OnOutOfBounds");

                // Collided with left or right side
                if (ships[key].MovementController.Position.X < 0 || (ships[key].MovementController.Position.X + ships[key].WIDTH) > Map.WIDTH) {
                    bounceMultiplier = new Vector2(-Map.BARRIER_DEPRECATION, Map.BARRIER_DEPRECATION);
                }
                else if (ships[key].MovementController.Position.Y < 0 || (ships[key].MovementController.Position.Y + ships[key].HEIGHT) > Map.HEIGHT) { // Top or bottom                
                    bounceMultiplier = new Vector2(Map.BARRIER_DEPRECATION, -Map.BARRIER_DEPRECATION);
                }

                ships[key].MovementController.RepositionInBounds(ships[key].WIDTH, ships[key].HEIGHT);

                // Reverse velocity, aka bounce
                ships[key].MovementController.Forces = Vector2.MultiplyV(ships[key].MovementController.Forces, bounceMultiplier);
                ships[key].MovementController.Velocity = Vector2.MultiplyV(ships[key].MovementController.Velocity, bounceMultiplier);
            }
        }

        for (var key in bullets) {
            if (!this.mapContains(bullets[key].MovementController.Position, bullets[key].WIDTH, bullets[key].HEIGHT)) {
                bullets[key].Visible = false;
                bullets[key].MovementController.Velocity.X = 0;
                bullets[key].MovementController.Velocity.Y = 0;
            }
        }
    }

    public Draw(): void {
        CanvasContext.drawMapBoundary(new Size(Map.WIDTH, Map.HEIGHT));
    }
}