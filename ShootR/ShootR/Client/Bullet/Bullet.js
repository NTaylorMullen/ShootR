var Bullet = function (properties) {
    Collidable.call(this);
    var that = this;

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
        var PercentOfSecond = CalculatePOS(that.LastUpdated),
            incrementor = { X: PercentOfSecond * that.MovementController.Velocity.X, Y: PercentOfSecond * that.MovementController.Velocity.Y };

        that.MovementController.Position.X += incrementor.X;
        that.MovementController.Position.Y += incrementor.Y;

        that.LastUpdated = new Date();
    }

    that.UpdateProperties(properties);
    that.Draw();

    that.LastUpdated = new Date();
}

Bullet.prototype = new Collidable();