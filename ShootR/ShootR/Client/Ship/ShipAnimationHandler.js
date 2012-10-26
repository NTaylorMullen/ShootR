function ShipAnimationHandler(MyShip) {
    var that = this,
        thrustBasicAnimation,
        thrustStartAnimation,
        movingForwardSince,
        fullThrustAfter = 400,
        canvasWidthBuffer = 100; // thruster animation frame width *2 (to keep canvas centered)

    MyShip.InitializeAnimationCanvas();
    MyShip.UpdateAnimationCanvasSize({ Width: MyShip.WIDTH + canvasWidthBuffer, Height: MyShip.HEIGHT });

    thrustBasicAnimation = new spritify({
        image: IMAGE_ASSETS.ThrustBasic,
        drawOn: MyShip.AnimationCanvasContext,
        X: 0,
        Y: (MyShip.HEIGHT / 2) - 25,
        frameCount: 18,
        fps: 18,
        spriteSheetSize: {
            width: 450,
            height: 100
        },
        frameSize: {
            width: 50,
            height: 50,
        },
        Rotation: 0,
        autoPlay: false,
        autoClear: false,
        loop: true
    });

    thrustStartAnimation = new spritify({
        image: IMAGE_ASSETS.ThrustStart,
        drawOn: MyShip.AnimationCanvasContext,
        X: 0,
        Y: (MyShip.HEIGHT / 2) - 25,
        frameCount: 18,
        fps: 18,
        spriteSheetSize: {
            width: 450,
            height: 100
        },
        frameSize: {
            width: 50,
            height: 50,
        },
        Rotation: 0,
        autoPlay: false,
        autoClear: false,
        loop: true
    });
    // Part of collidable
    MyShip.AnimationDrawList.push(thrustBasicAnimation);
    MyShip.AnimationDrawList.push(thrustStartAnimation);

    that.Update = function (now) {
        var nowMilliseconds = now.getTime();
        if (MyShip.MovementController.Moving.Forward) {
            if (!movingForwardSince) {
                movingForwardSince = new Date().getTime();
            }

            if (nowMilliseconds - movingForwardSince >= fullThrustAfter) {
                thrustBasicAnimation.Play();
            }
            thrustStartAnimation.Play();
        }
        else {
            movingForwardSince = false;
            thrustBasicAnimation.Stop();
            thrustStartAnimation.Stop();
        }

        thrustBasicAnimation.Update(now);
        thrustStartAnimation.Update(now);
        thrustStartAnimation.ClearDrawOnCanvas();
    }
}