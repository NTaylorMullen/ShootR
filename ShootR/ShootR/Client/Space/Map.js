function Map() {
    var that = this;

    that.WIDTH;
    that.HEIGHT;

    function MapContains(position, width, height) {
        return (position.X >= 0 && position.X + width <= that.WIDTH &&
            position.Y >= 0 && position.Y + height <= that.HEIGHT);
    }

    that.CheckBoundaryCollisions = function (ships, bullets) {
        for (var key in ships) {
            if (!MapContains(ships[key].MovementController.Position, ships[key].WIDTH, ships[key].HEIGHT)) {
                var bounceMultiplier;

                $(ships[key]).triggerHandler("OnOutOfBounds");

                // Collided with left or right side
                if (ships[key].MovementController.Position.X <= 0 || (ships[key].MovementController.Position.X + ships[key].WIDTH) >= that.WIDTH) {
                    bounceMultiplier = new Vector2(-that.BARRIER_DEPRECATION, that.BARRIER_DEPRECATION );
                }
                else if (ships[key].MovementController.Position.Y <= 0 || (ships[key].MovementController.Position.Y + ships[key].HEIGHT) >= that.HEIGHT) { // Top or bottom                
                    bounceMultiplier = new Vector2(that.BARRIER_DEPRECATION, -that.BARRIER_DEPRECATION );
                }

                ships[key].MovementController.RepositionInBounds(ships[key].WIDTH, ships[key].HEIGHT);

                // Reverse velocity, aka bounce
                ships[key].MovementController.Forces = ships[key].MovementController.Forces.Multiply(bounceMultiplier);
                ships[key].MovementController.Velocity = ships[key].MovementController.Velocity.Multiply(bounceMultiplier);
            }
        }

        for (var key in bullets) {
            if (!MapContains(bullets[key].MovementController.Position, bullets[key].WIDTH, bullets[key].HEIGHT)) {
                bullets[key].Visible = false;
                bullets[key].MovementController.Velocity.X = 0;
                bullets[key].MovementController.Velocity.Y = 0;
            }
        }
    }

    that.Draw = function () {
        CanvasContext.drawMapBoundary(that.WIDTH, that.HEIGHT);
    }
}