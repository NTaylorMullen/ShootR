var Bullet = function (properties) {
    Collidable.call(this);
    var that = this,
        spawnedAt = new Date().getTime();

    that.Visible = true;
    that.Vehicle = IMAGE_ASSETS.Laser;
    that.ShouldDispose = function () {
        return ((new Date().getTime()) - spawnedAt) >= that.BULLET_DIE_AFTER;
    }

    that.Destroy = function () {
        // Bullet collided into another object
        if (that.Collided) {
            // We want to explode
            GAME_GLOBALS.AnimationManager.Add(new spritify({
                image: IMAGE_ASSETS.Explosion,
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

            // Need to draw text
            if (that.DamageDealt > 0) {
                GAME_GLOBALS.AnimationManager.Add(new TextAnimation("-" + that.DamageDealt, that.CollidedAt.X, that.CollidedAt.Y, { duration: 750 }));
            }
        }

        that.Visible = false;
    }

    that.Update = function (gameTime) {
        var PercentOfSecond = CalculatePOS(that.LastUpdated),
            incrementor = { X: PercentOfSecond * that.MovementController.Velocity.X, Y: PercentOfSecond * that.MovementController.Velocity.Y };

        that.MovementController.Position.X += incrementor.X;
        that.MovementController.Position.Y += incrementor.Y;

        // Rounding so we doing do alpha transparency on the canvas
        that.MovementController.Position.X = Math.round(that.MovementController.Position.X);
        that.MovementController.Position.Y = Math.round(that.MovementController.Position.Y);

        that.LastUpdated = new Date();
    }

    that.UpdateProperties(properties);
    that.Draw();

    that.LastUpdated = new Date();
}

Bullet.prototype = new Collidable();