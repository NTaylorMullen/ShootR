function ShipVehicle(properties) {
    Collidable.call(this);
    var that = this,
        vehicleCanvas = document.createElement("canvas"),
        vehicleCanvasContext = vehicleCanvas.getContext("2d"),
        thrustBasicAnimation,
        canvasWidthBuffer = 26; // thruster animation frame width

    that.DrawOffset.X = -canvasWidthBuffer;

    vehicleCanvas.width = that.WIDTH + canvasWidthBuffer;
    vehicleCanvas.height = that.HEIGHT;

    thrustBasicAnimation = new spritify({
        image: IMAGE_ASSETS.ThrustBasic,
        drawOn: vehicleCanvasContext,
        X: 0,
        Y: (that.HEIGHT / 2) - 27,
        frameCount: 6,
        fps: 12,
        spriteSheetSize: {
            width: 26,
            height: 330
        },
        frameSize: {
            width: 26,
            height: 55,
        },
        Rotation: 0,
        autoPlay: false,
        loop: true
    });

    // Part of collidable
    that.AnimationDrawList.push(thrustBasicAnimation);

    vehicleCanvasContext.drawImage(IMAGE_ASSETS.Ship1, canvasWidthBuffer, 0);

    that.Vehicle = vehicleCanvas;

    //GAME_GLOBALS.AnimationManager.Add(thrustBasicAnimation);

    that.UpdateVehicle = function (newVehicle) {
        vehicleCanvasContext.drawImage(newVehicle, canvasWidthBuffer, 0);
    }

    that.Destroy = function () {
        // Ship has died
        if (!that.LifeController.Alive) {
            // We want to explode
            GAME_GLOBALS.AnimationManager.Add(new spritify({
                image: IMAGE_ASSETS.BigExplosion,
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

    function Interpolate(axis, ClientPositionPrediction) {
        if (that.Smoothing[axis]) {
            var InterpolationPercent = CalculatePO(that.LastUpdated, that.InterpolateOver[axis]);

            that.Target[axis] += ClientPositionPrediction[axis];

            var posDiff = that.Target[axis] - that.MovementController.Position[axis];
            that.MovementController.Position[axis] += (posDiff * InterpolationPercent);

            if (Math.abs(posDiff) <= that.INTERPOLATE_POSITION_THRESHOLD) {
                that.Smoothing[axis] = false;
            }
        }
    }

    function InterpolateRotation(RotationIncrementor) {
        if (that.SmoothingRotation) {
            var InterpolationPercent = CalculatePO(that.LastUpdated, that.InterpolateRotationOver);

            that.TargetRotation += RotationIncrementor;

            var rotDiff = that.TargetRotation - that.MovementController.Rotation;
            that.MovementController.Rotation += (rotDiff * InterpolationPercent);

            if (Math.abs(rotDiff) <= that.INTERPOLATE_ROTATION_THRESHOLD) {
                that.SmoothingRotation = false;
            }
        }
    }

    function TryInterpolation(ClientPositionPrediction) {
        if (that.InterpolateOver) {
            Interpolate("X", ClientPositionPrediction);
            Interpolate("Y", ClientPositionPrediction);
        }
    }

    function TryInterpolationRotation(RotationIncrementor) {
        if (that.InterpolateRotationOver) {
            InterpolateRotation(RotationIncrementor);
        }
    }

    that.UpdateFromSecond = function (PercentOfSecond) {
        var ClientPositionPrediction = {
            X: 0,
            Y: 0,
        };

        Acceleration = { X: 0, Y: 0 }

        Acceleration.X += that.MovementController.Forces.X / that.MovementController.Mass;
        Acceleration.Y += that.MovementController.Forces.Y / that.MovementController.Mass;

        ClientPositionPrediction.X = that.MovementController.Velocity.X * PercentOfSecond + Acceleration.X * PercentOfSecond * PercentOfSecond;
        ClientPositionPrediction.Y = that.MovementController.Velocity.Y * PercentOfSecond + Acceleration.Y * PercentOfSecond * PercentOfSecond;

        that.MovementController.Position.X += ClientPositionPrediction.X
        that.MovementController.Position.Y += ClientPositionPrediction.Y

        TryInterpolation(ClientPositionPrediction);        

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
            TryInterpolationRotation(-1*rotationIncrementor);
        }
        if (that.MovementController.Moving.RotatingRight) {
            that.MovementController.Rotation += rotationIncrementor;
            TryInterpolationRotation(rotationIncrementor);
        }
        if (that.MovementController.Moving.Forward) {
            thrustBasicAnimation.Play();
            that.MovementController.Forces.X += direction.X * that.ENGINE_POWER;
            that.MovementController.Forces.Y += direction.Y * that.ENGINE_POWER;
        }
        else {
            thrustBasicAnimation.Stop();
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

    that.DrawName = function (healthOffset) {
        CanvasContext.drawText(that.Name, that.MovementController.Position.X + that.HALF_WIDTH, that.MovementController.Position.Y + that.HEIGHT + 30 + healthOffset);
    }

    that.DrawBoundary = function () {
        CanvasContext.strokeSquare(that.MovementController.Position.X, that.MovementController.Position.Y, that.WIDTH, that.HEIGHT);
    }

    that.UpdateProperties({ MovementController: { Position: { X: 0, Y: 0 }, Forces: { X: 0, Y: 0 }, Velocity: { X: 0, Y: 0 }, Moving: { RotatingLeft: false, RotatingRight: false, Forward: false, Backward: false }, Rotation: 0 } });
}

ShipVehicle.prototype = new Collidable();