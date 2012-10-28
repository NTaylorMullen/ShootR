function MovementController(first, second, third) {
    if (first) { // Ensure we have some variables
        // (mass, power)
        // (position, mass, power)
        var that = this;

        that.Mass;
        that.Power;
        that.Position;
        that.Velocity = new Vector2();
        that.Forces = new Vector2();
        that.Rotation = 0;
        that.LastUpdated = new Date();

        Initialize();

        that.ApplyForce = function (force) {
            that.Forces = Vector2.AddV(that.Forces, force);
        }

        that.RepositionInBounds = function (objectWidth, objectHeight) {
            // Re-position to be in-bounds
            if (that.Position.X < 0) {
                that.Position.X = 0;
            }
            else if (that.Position.X + objectWidth > Map.prototype.WIDTH) {
                that.Position.X = Map.prototype.WIDTH - objectWidth;
            }

            if (that.Position.Y < 0) {
                that.Position.Y = 0;
            }
            else if (that.Position.Y + objectHeight > Map.prototype.HEIGHT) {
                that.Position.Y = Map.prototype.HEIGHT - objectHeight;
            }
        }

        function Initialize() {
            // We passed a position
            if (first instanceof Vector2) {
                that.Position = first;
                that.Mass = second;
                that.Power = third;
            }
            else {
                that.Mass = first;
                that.Power = second;
            }
        }
    }
}