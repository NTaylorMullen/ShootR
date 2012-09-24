function ShipVehicle(properties) {
    Collidable.call(this);
    var that = this;

    that.PropertiesToCopy.push("Name");

    that.Vehicle = CanvasContext.IMAGE_ASSETS.Ship;

    that.GUID = ShipVehicle.prototype.GUID++;

    that.Destroy = function () {
        that.Destroyed = true;
    }

    that.Update = function (gameTime) {
        var PercentOfSecond = gameTime.PercentOfSecond;
        that.MovementController.Acceleration.X += that.MovementController.Forces.X / that.MovementController.Mass;
        that.MovementController.Acceleration.Y += that.MovementController.Forces.Y / that.MovementController.Mass;
        that.MovementController.Position.X += that.MovementController.Velocity.X * PercentOfSecond + that.MovementController.Acceleration.X * PercentOfSecond * PercentOfSecond;
        that.MovementController.Position.Y += that.MovementController.Velocity.Y * PercentOfSecond + that.MovementController.Acceleration.Y * PercentOfSecond * PercentOfSecond;
        that.MovementController.Velocity.X += that.MovementController.Acceleration.X * PercentOfSecond;
        that.MovementController.Velocity.Y += that.MovementController.Acceleration.Y * PercentOfSecond;

        that.MovementController.Acceleration = { X: 0, Y: 0 };
        that.MovementController.Forces = { X: 0, Y: 0 };

        var rotationIncrementor = PercentOfSecond * that.ROTATE_SPEED,
            rotationRadians = Math.PI * that.MovementController.Rotation / 180.0,
            scaleX = Math.cos(rotationRadians),
            scaleY = Math.sin(rotationRadians),
            direction = { X: scaleX, Y: scaleY },
            dragForce = {
                X: .5 * that.MovementController.Velocity.X * Math.abs(that.MovementController.Velocity.X) * that.DRAG_COEFFICIENT * that.DRAG_AREA * -1,
                Y: .5 * that.MovementController.Velocity.Y * Math.abs(that.MovementController.Velocity.Y) * that.DRAG_COEFFICIENT * that.DRAG_AREA * -1
            };

        if (that.MovementController.Moving.RotatingLeft) {
            that.MovementController.Rotation -= rotationIncrementor;
        }
        if (that.MovementController.Moving.RotatingRight) {
            that.MovementController.Rotation += rotationIncrementor;
        }
        if (that.MovementController.Moving.Forward) {
            that.MovementController.Forces.X += direction.X * that.ENGINE_POWER;
            that.MovementController.Forces.Y += direction.Y * that.ENGINE_POWER;
        }
        if (that.MovementController.Moving.Backward) {
            that.MovementController.Forces.X -= direction.X * that.ENGINE_POWER;
            that.MovementController.Forces.Y -= direction.Y * that.ENGINE_POWER;
        }

        that.MovementController.Forces.X += dragForce.X;
        that.MovementController.Forces.Y += dragForce.Y;

        that.Draw();
    }

    that.DrawName = function () {
        CanvasContext.drawText(that.Name, that.MovementController.Position.X + that.WIDTH * .5, that.MovementController.Position.Y + that.HEIGHT + 20);
    }

    that.UpdateProperties({ MovementController: { Position: { X: 0, Y: 0 }, Forces: { X: 0, Y: 0 }, Acceleration: { X: 0, Y: 0 }, Velocity: { X: 0, Y: 0 }, Moving: { RotatingLeft: false, RotatingRight: false, Forward: false, Backward: false }, Rotation: 0 } });
}

ShipVehicle.prototype = new Collidable();
ShipVehicle.prototype.GUID = 0;