function HealthPack(properties) {
    Powerup.apply(this,[properties]);
    var that = this,
        animation,
        spawnedAt = new Date().getTime();    

    that.InitializeAnimationCanvas();
    that.UpdateAnimationCanvasSize({ Width: that.WIDTH, Height: that.HEIGHT });

    animation = new spritify({
        image: IMAGE_ASSETS.HealthPack,
        drawOn: that.AnimationCanvasContext,
        X: 0,
        Y: 0,
        frameCount: 11,
        fps: 11,
        spriteSheetSize: {
            width: 355,
            height: 216
        },
        frameSize: {
            width: 71,
            height: 72,
        },
        Rotation: 0,
        autoPlay: false,
        loop: true
    });

    animation.Play();

    // Part of collidable
    that.AnimationDrawList.push(animation);

    that.Update = function (gameTime) {
        if (gameTime.Now.getTime() - spawnedAt >= that.LIFE_SPAN) {
            that.Disposed = true;
        }

        animation.Update(gameTime.Now);
    }
}

HealthPack.prototype = new Powerup();