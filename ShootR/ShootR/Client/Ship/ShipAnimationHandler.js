function ShipAnimationHandler(MyShip) {
    var that = this,
        thrustBasicAnimation,
        thrustStartAnimation,
        boostAnimation,
        movingForwardSince,
        fullThrustAfter = 400,
        canvasWidthBuffer = 200, // thruster animation frame width *2 (to keep canvas centered)
        shipStartsAtX = canvasWidthBuffer / 2;

    MyShip.InitializeAnimationCanvas();
    MyShip.UpdateAnimationCanvasSize({ Width: MyShip.WIDTH + canvasWidthBuffer, Height: MyShip.HEIGHT });

    boostAnimation = new spritify({
        image: IMAGE_ASSETS.Boost,
        drawOn: MyShip.AnimationCanvasContext,
        X: 0,
        Y: (MyShip.HEIGHT / 2) - 26,
        frameCount: 10,
        fps: 12,
        spriteSheetSize: {
            width: 400,
            height: 150
        },
        frameSize: {
            width: 100,
            height: 50,
        },
        Rotation: 0,
        autoPlay: false,
        autoClear: false,
        loop: true,
        loopFrom: 4,
        finalFrames: 2
    });

    thrustBasicAnimation = new spritify({
        image: IMAGE_ASSETS.ThrustBasic,
        drawOn: MyShip.AnimationCanvasContext,
        X: 50,
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
        X: 50,
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
    MyShip.AnimationDrawList.push(boostAnimation);

    var lastHealth = MyShip.MaxLife;
    that.DrawDamage = function () {
        var healthDiff = lastHealth - MyShip.LifeController.Health;
        if (healthDiff !== 0) { // If the health has changed
            lastHealth = MyShip.LifeController.Health;
            var damageImage = (Math.floor((1 - (MyShip.LifeController.Health / MyShip.MaxLife)) * 10)) - 2;

            if (damageImage > 0 && damageImage < 8) {
                // We've gained life, need to clear canvas and re-apply all pre-existing images
                if (healthDiff < 0) {
                    MyShip.AnimationCanvasContext.clearRect(shipStartsAtX, 0, MyShip.WIDTH, MyShip.HEIGHT);

                    for (var i = 1; i <= damageImage; i++) {
                        if (IMAGE_ASSETS["ShipDamage" + i]) {
                            MyShip.AnimationCanvasContext.drawImage(IMAGE_ASSETS["ShipDamage" + i], shipStartsAtX, 0);
                        }
                    }
                }
                else { // We've lost life, just apply another layer
                    if (IMAGE_ASSETS["ShipDamage" + damageImage]) {
                        MyShip.AnimationCanvasContext.drawImage(IMAGE_ASSETS["ShipDamage" + damageImage], shipStartsAtX, 0);
                    }
                }
            }
            else {
                MyShip.AnimationCanvasContext.clearRect(shipStartsAtX, 0, MyShip.WIDTH, MyShip.HEIGHT);
            }
        }
    }

    that.Update = function (now) {
        var nowMilliseconds = now.getTime();

        if (!MyShip.ShipAbilityHandler.Ability("Boost").Active) {
            boostAnimation.Stop(true);
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
        }
        else { // We're boosting
            boostAnimation.Play();
            thrustBasicAnimation.Stop();
            thrustStartAnimation.Stop();
        }

        boostAnimation.Update(now);
        boostAnimation.ClearDrawOnCanvas();
        thrustStartAnimation.ClearDrawOnCanvas();
    }
}