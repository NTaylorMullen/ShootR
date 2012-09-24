function Map() {
    var that = this;

    that.WIDTH;
    that.HEIGHT;

    function MapContains(position, width, height) {
        return (position.X >= 0 && position.X + width <= that.WIDTH &&
            position.Y >= 0 && position.Y + height <= that.HEIGHT);
    }

    function Reposition(Position, objectWidth, objectHeight) {
        // Re-position to be in-bounds
        if (Position.X < 0) {
            Position.X = 0;
        }
        else if (Position.X + objectWidth > that.WIDTH) {
            Position.X = that.WIDTH - objectWidth;
        }

        if (Position.Y < 0) {
            Position.Y = 0;
        }
        else if (Position.Y + objectHeight > that.HEIGHT) {
            Position.Y = that.HEIGHT - objectHeight;
        }
    }

    that.CheckBoundaryCollisions = function (ships, bullets) {
        for (var key in ships) {
            if (!MapContains(ships[key].MovementController.Position, ships[key].WIDTH, ships[key].HEIGHT)) {
                // Re-position object in bounds
                Reposition(ships[key].MovementController.Position, ships[key].WIDTH, ships[key].HEIGHT);

                // Reverse velocity, aka bounce
                ships[key].MovementController.Forces.X *= -1;
                ships[key].MovementController.Forces.Y *= -1;
                ships[key].MovementController.Velocity.X *= -1;
                ships[key].MovementController.Velocity.Y *= -1;
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