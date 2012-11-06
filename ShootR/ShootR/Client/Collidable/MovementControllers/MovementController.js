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
        this.Moving = {
        };
    }
    MovementController.prototype.ApplyForce = function (force) {
        this.Forces.AddV(force);
    };
    MovementController.prototype.RepositionInBounds = function (objectWidth, objectHeight) {
        if(this.Position.X < 0) {
            this.Position.X = 0;
        } else {
            if(this.Position.X + objectWidth > Map.WIDTH) {
                this.Position.X = Map.WIDTH - objectWidth;
            }
        }
        if(this.Position.Y < 0) {
            this.Position.Y = 0;
        } else {
            if(this.Position.Y + objectHeight > Map.HEIGHT) {
                this.Position.Y = Map.HEIGHT - objectHeight;
            }
        }
    };
    MovementController.prototype.Update = function (percentOfSecond, now) {
        this.Position.ApplyFunction(Math.round);
        this.LastUpdated = now;
    };
    MovementController.prototype.UpdateMovementController = function (data) {
        this.Forces.X = data.Forces.X;
        this.Forces.Y = data.Forces.Y;
        this.Mass = data.Mass;
        this.Position.X = data.Position.X;
        this.Position.Y = data.Position.Y;
        this.Rotation = data.Rotation;
        this.Velocity.X = data.Velocity.X;
        this.Velocity.Y = data.Velocity.Y;
    };
    return MovementController;
})();
//@ sourceMappingURL=MovementController.js.map
