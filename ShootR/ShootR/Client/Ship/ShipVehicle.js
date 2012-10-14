function ShipVehicle(properties) {
    Collidable.call(this);
    var that = this;

    that.Vehicle = CanvasContext.IMAGE_ASSETS.Ship;

    that.Destroy = function () {
        // Ship has died
        if (!that.LifeController.Alive) {
            // We want to explode
            GAME_GLOBALS.AnimationManager.Add(new spritify({
                image: CanvasContext.IMAGE_ASSETS.BigExplosion,
                centerOn: { X: that.MovementController.Position.X + that.HALF_WIDTH, Y: that.MovementController.Position.Y + that.HALF_HEIGHT },
                frameCount: 30,
                fps: 25,
                spriteSheetSize: {
                    width: 768,
                    height: 640
                },
                frameSize: {
                    width: 128,
                    height: 128,
                },
                Rotation: that.MovementController.Rotation
            }));            
        }

        that.Visible = false;
    }   
   
    that.Update = function (gameTime) {        
        var PercentOfSecond = CalculatePOS(that.LastUpdated);
        that.UpdateFromSecond(PercentOfSecond);
    }

    that.UpdateFromSecond = function (PercentOfSecond) {
        Acceleration = { X: 0, Y: 0 }

        Acceleration.X += that.MovementController.Forces.X / that.MovementController.Mass;
        Acceleration.Y += that.MovementController.Forces.Y / that.MovementController.Mass;
        that.MovementController.Position.X += that.MovementController.Velocity.X * PercentOfSecond + Acceleration.X * PercentOfSecond * PercentOfSecond;
        that.MovementController.Position.Y += that.MovementController.Velocity.Y * PercentOfSecond + Acceleration.Y * PercentOfSecond * PercentOfSecond;
        that.MovementController.Velocity.X += Acceleration.X * PercentOfSecond;
        that.MovementController.Velocity.Y += Acceleration.Y * PercentOfSecond;

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

        that.LastUpdated = new Date();
    }

    that.DrawHealthBar = function () {
        var maxWidth = that.WIDTH * .8,
            xOffset = (that.WIDTH - maxWidth) * .5,
            currentHealth = maxWidth * that.LifeController.Health / that.MaxLife;

        CanvasContext.drawRectangle(that.MovementController.Position.X + xOffset, that.MovementController.Position.Y + that.HEIGHT + 15, maxWidth, 5, "#808080");
        CanvasContext.drawRectangle(that.MovementController.Position.X + xOffset, that.MovementController.Position.Y + that.HEIGHT + 15, currentHealth, 5, "#E01B1B");
    }

    that.DrawName = function () {        
        CanvasContext.drawText(that.Name, that.MovementController.Position.X + that.HALF_WIDTH, that.MovementController.Position.Y + that.HEIGHT + 40);
    }

    that.DrawBoundary = function () {
        CanvasContext.strokeSquare(that.MovementController.Position.X, that.MovementController.Position.Y, that.WIDTH, that.HEIGHT);
    }

    that.UpdateProperties({ MovementController: { Position: { X: 0, Y: 0 }, Forces: { X: 0, Y: 0 }, Velocity: { X: 0, Y: 0 }, Moving: { RotatingLeft: false, RotatingRight: false, Forward: false, Backward: false }, Rotation: 0 } });
}

ShipVehicle.prototype = new Collidable();