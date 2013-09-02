/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="../Utilities/Size.ts" />
/// <reference path="CanvasRenderer.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Ship/Ship.ts" />
/// <reference path="../Bullet/Bullet.ts" />
var Map2 = (function () {
    function Map2() {
    }
    Map2.prototype.mapContains = function (position, width, height) {
        return (position.X >= 0 && position.X + width <= Map2.WIDTH && position.Y >= 0 && position.Y + height <= Map2.HEIGHT);
    };

    Map2.prototype.CheckBoundaryCollisions = function (ships, bullets) {
        for (var key in ships) {
            if (!this.mapContains(ships[key].MovementController.Position, ships[key].WIDTH, ships[key].HEIGHT)) {
                var bounceMultiplier;

                $(ships[key]).triggerHandler("OnOutOfBounds");

                if (ships[key].MovementController.Position.X < 0 || (ships[key].MovementController.Position.X + ships[key].WIDTH) > Map2.WIDTH) {
                    bounceMultiplier = new Vector2(-Map2.BARRIER_DEPRECATION, Map2.BARRIER_DEPRECATION);
                } else if (ships[key].MovementController.Position.Y < 0 || (ships[key].MovementController.Position.Y + ships[key].HEIGHT) > Map2.HEIGHT) {
                    bounceMultiplier = new Vector2(Map2.BARRIER_DEPRECATION, -Map2.BARRIER_DEPRECATION);
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
    };

    Map2.prototype.Draw = function () {
        CanvasContext.drawMapBoundary(new Size(Map2.WIDTH, Map2.HEIGHT));
    };
    Map2.BARRIER_DEPRECATION = .75;
    return Map2;
})();
