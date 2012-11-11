var Map = (function () {
    function Map() { }
    Map.WIDTH = 0;
    Map.HEIGHT = 0;
    Map.BARRIER_DEPRECATION = 0.75;
    Map.prototype.mapContains = function (position, width, height) {
        return (position.X >= 0 && position.X + width <= Map.WIDTH && position.Y >= 0 && position.Y + height <= Map.HEIGHT);
    };
    Map.prototype.CheckBoundaryCollisions = function (ships, bullets) {
        for(var key in ships) {
            if(!this.mapContains(ships[key].MovementController.Position, ships[key].WIDTH, ships[key].HEIGHT)) {
                var bounceMultiplier;
                $(ships[key]).triggerHandler("OnOutOfBounds");
                if(ships[key].MovementController.Position.X < 0 || (ships[key].MovementController.Position.X + ships[key].WIDTH) > Map.WIDTH) {
                    bounceMultiplier = new Vector2(-Map.BARRIER_DEPRECATION, Map.BARRIER_DEPRECATION);
                } else {
                    if(ships[key].MovementController.Position.Y < 0 || (ships[key].MovementController.Position.Y + ships[key].HEIGHT) > Map.HEIGHT) {
                        bounceMultiplier = new Vector2(Map.BARRIER_DEPRECATION, -Map.BARRIER_DEPRECATION);
                    }
                }
                ships[key].MovementController.RepositionInBounds(ships[key].WIDTH, ships[key].HEIGHT);
                ships[key].MovementController.Forces = Vector2.MultiplyV(ships[key].MovementController.Forces, bounceMultiplier);
                ships[key].MovementController.Velocity = Vector2.MultiplyV(ships[key].MovementController.Velocity, bounceMultiplier);
            }
        }
        for(var key in bullets) {
            if(!this.mapContains(bullets[key].MovementController.Position, bullets[key].WIDTH, bullets[key].HEIGHT)) {
                bullets[key].Visible = false;
                bullets[key].MovementController.Velocity.X = 0;
                bullets[key].MovementController.Velocity.Y = 0;
            }
        }
    };
    Map.prototype.Draw = function () {
        CanvasContext.drawMapBoundary(new Size(Map.WIDTH, Map.HEIGHT));
    };
    return Map;
})();
//@ sourceMappingURL=Map.js.map
