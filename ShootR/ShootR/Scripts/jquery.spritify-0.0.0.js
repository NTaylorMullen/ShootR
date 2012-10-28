function spritify(options) {
    var that = this,
        lastUpdateFrame = new Date().getTime(),
        finishingFrames = false;

    that.Destroyed = false;

    function getFramePosition(currentFrame, frameSize, spriteSheetSize) {
        var columns = spriteSheetSize.width / frameSize.width;
        var rows = spriteSheetSize.height / frameSize.height;
        var row = Math.floor(currentFrame / columns);
        var column = Math.ceil(currentFrame % columns);
        return { row: row, column: column };
    }

    that.ClearDrawOnCanvas = function () {
        options.drawOn.clearRect(that.MovementController.Position.X, that.MovementController.Position.Y, options.frameSize.width, options.frameSize.height);
    }

    that.Play = function () {
        if (!that.Playing) {
            finishingFrames = false;
            initiateAnimation();
        }
    }

    that.Pause = function () {
        if (that.Playing) {
            that.Playing = false;
            clearTimeout(options.timeoutID);
        }
    }

    that.Stop = function (finishFrames) {
        if (that.Playing) {
            if (finishFrames) {
                finishingFrames = true;
            }
            else {
                that.Playing = false;
                options.currentFrame = 0;
                that.ClearDrawOnCanvas();
                clearTimeout(options.timeoutID);
            }
        }
    }

    that.Playing = false;

    function initiateAnimation() {
        that.Playing = true;
        nextAnimationFrame();
    }

    function nextAnimationFrame() {
        // If we've reached the end of the animation
        if (++options.currentFrame >= options.frameCount) {
            if (finishingFrames) {
                if (options.currentFrame - 1 < options.frameCount + options.finalFrames) {
                    if (options.autoPlay) {
                        options.timeoutID = setTimeout(nextAnimationFrame, options.interval);
                    }
                }
                else {
                    finishingFrames = false;
                    that.Stop();
                }
                return;
            }

            if (options.destroyOncePlayed) {
                that.Destroyed = true;
                that.Playing = false;
            }

            // Check if we shold not loop the animation
            if (options.loop) {
                options.currentFrame = options.loopFrom;
            }
            else {
                that.Playing = false;
                options.deferred.resolve();
            }
        }

        if (that.Playing && options.autoPlay) {
            options.timeoutID = setTimeout(nextAnimationFrame, options.interval);
        }
    }

    // The primary animate function that is called after we've determined the sprite sheet size
    function spritifyAnimate() {
        options = $.extend({
            centerOn: null,
            startFrame: 0,
            fps: options.frameCount, // Default to Frame Count so we have 1 frame per animation
            loop: false,
            loopFrom: 0,
            destroyOncePlayed: true,
            Rotation: 0,
            X: 0,
            Y: 0,
            drawOn: false,
            autoPlay: true,
            autoClear: true,
            finalFrames: 0,
            deferred: $.Deferred()
        }, options);

        that.Options = options;

        // destroyOncePlayed can only be true if loop is false
        options.destroyOncePlayed = (options.loop === false) ? options.destroyOncePlayed : false;

        // Initialize the current frame to the designated start frame
        options.currentFrame = options.startFrame;

        options.interval = 1000 / options.fps;

        // Check if we have a frame count set, if not then we need to calculate the frames
        if (!options.frameCount) {
            options.frameCount = (options.spriteSheetSize.width / options.frameSize.width) * (options.spriteSheetSize.height / options.frameSize.height);

            if (!options.fps) {
                options.fps = options.frameCount;
            }
        }

        originalFrameCount = options.frameCount;

        // If Centering is turned on then we need to center the target
        if (options.centerOn) {
            options.X = options.centerOn.X - .5 * options.frameSize.width;
            options.Y = options.centerOn.Y - .5 * options.frameSize.height;
        }

        if (options.autoPlay) {
            initiateAnimation();
        }
    }

    // Only need to update if we're not auto playing, auto play is dealt with via a timeout.
    that.Update = function (now) {
        if (!options.autoPlay && that.Playing) {
            var nowMilliseconds = now.getTime();
            // Check if time for next frame
            if (that.Playing && (nowMilliseconds - lastUpdateFrame) >= options.interval) {
                nextAnimationFrame();
                lastUpdateFrame = nowMilliseconds;
            }
        }
    }

    that.Draw = function () {
        if (that.Playing && !that.Destroyed) {
            var framePosition = getFramePosition(options.currentFrame, options.frameSize, options.spriteSheetSize);

            if (!options.drawOn) {
                CanvasContext.drawRotatedImage(options.image, that.MovementController.Rotation, framePosition.column * options.frameSize.width, framePosition.row * options.frameSize.height, options.frameSize.width, options.frameSize.height, that.MovementController.Position.X, that.MovementController.Position.Y, options.frameSize.width, options.frameSize.height);
            }
            else {
                if (options.autoClear) {
                    that.ClearDrawOnCanvas();
                }
                options.drawOn.drawImage(options.image, framePosition.column * options.frameSize.width, framePosition.row * options.frameSize.height, options.frameSize.width, options.frameSize.height, that.MovementController.Position.X, that.MovementController.Position.Y, options.frameSize.width, options.frameSize.height);
            }
        }
    }

    that.On = function () {
        return options.deferred.promise();
    }

    spritifyAnimate.apply(this);
    that.MovementController = {};
    that.MovementController.Position = { X: options.X, Y: options.Y };
    that.MovementController.Rotation = options.Rotation;
}
