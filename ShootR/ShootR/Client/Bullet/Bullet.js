var Bullet = function (properties) {
    Collidable.call(this);
    var that = this;

    that.PropertiesToCopy.push("Collided");
    that.PropertiesToCopy.push("CollidedAt");

    that.Visible = true;
    that.Vehicle = CanvasContext.IMAGE_ASSETS.Laser;

    that.Destroy = function () {
        // Bullet collided into another object
        if (that.Collided) {
            // We want to explode
            GAME_GLOBALS.AnimationManager.Add(new spritify({
                image: CanvasContext.IMAGE_ASSETS.Explosion,
                centerOn: { X: that.CollidedAt.X, Y: that.CollidedAt.Y },
                frameCount: 24,
                spriteSheetSize: {
                    width: 320,
                    height: 320
                },
                frameSize: {
                    width: 64,
                    height: 64,
                },
                Rotation: that.MovementController.Rotation
            }));
        }

        that.Destroyed = true;
    }

    that.Update = function (gameTime) {
        var incrementor = { X: gameTime.PercentOfSecond * that.MovementController.Velocity.X, Y: gameTime.PercentOfSecond * that.MovementController.Velocity.Y };

        that.MovementController.Position.X += incrementor.X;
        that.MovementController.Position.Y += incrementor.Y;

        if (that.Visible) {
            that.Draw();
        }
    }

    that.UpdateProperties(properties);
    that.Draw();
}

Bullet.prototype = new Collidable();