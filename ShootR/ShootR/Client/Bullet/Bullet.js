var Bullet = function (properties) {
    Collidable.call(this);
    var that = this;

    that.Vehicle = CanvasContext.IMAGE_ASSETS.Laser;

    that.Destroy = function (collided, collidedAt) {
        // Bullet collided into another object
        if (collided) {
            // We want to explode
            GAME_GLOBALS.AnimationManager.Add(new spritify({
                image: CanvasContext.IMAGE_ASSETS.Explosion,
                centerOn: { X: collidedAt.X, Y: collidedAt.Y },
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

        that.Draw();
    }

    that.UpdateProperties(properties);
    that.Draw();
}

Bullet.prototype = new Collidable();