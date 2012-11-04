var MovementController = (function () {
    function MovementController(first, second, third) {
        if(typeof first == "object") {
            this.Position = first;
            this.Mass = second;
            this.Power = third;
        } else {
            this.Position = Vector2.Zero();
            this.Mass = first;
            this.Power = second;
        }
        this.Velocity = Vector2.Zero();
        this.Forces = Vector2.Zero();
        this.Rotation = 0;
        this.LastUpdated = new Date();
    }
    MovementController.prototype.ApplyForce = function (force) {
        this.Forces = Vector2.AddV(this.Forces, force);
    };
    MovementController.prototype.RepositionInBounds = function (objectWidth, objectHeight) {
        if(this.Position.X < 0) {
            this.Position.X = 0;
        } else {
            if(this.Position.X + objectWidth > Map.prototype.WIDTH) {
                this.Position.X = Map.prototype.WIDTH - objectWidth;
            }
        }
        if(this.Position.Y < 0) {
            this.Position.Y = 0;
        } else {
            if(this.Position.Y + objectHeight > Map.prototype.HEIGHT) {
                this.Position.Y = Map.prototype.HEIGHT - objectHeight;
            }
        }
    };
    return MovementController;
})();
//@ sourceMappingURL=MovementController.js.map
