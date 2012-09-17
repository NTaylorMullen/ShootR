(function ($) {
    function setFrameSize(obj, options, callback) {
        var bgImage = new Image();
        bgImage.src = $(obj).css('background-image').replace(/"/g, "").replace(/url\(|\)$/ig, "");

        bgImage.onload = function () {
            options.spriteSheetSize = { width: this.width, height: this.height };

            callback.apply(obj, [options]);
        }
    }

    function getFramePosition(currentFrame, frameSize, spriteSheetSize) {
        var columns = spriteSheetSize.width / frameSize.width;
        var rows = spriteSheetSize.height / frameSize.height;
        var row = Math.floor(currentFrame / columns);
        var column = Math.ceil(currentFrame % columns);
        return { row: row, column: column };
    }

    function nextAnimationFrame(options) {
        // If we've reached the end of the animation
        if (++options.currentFrame === options.frameCount) {
            if (options.destroyOncePlayed) {
                $(options.target).remove();
            }

            // Check if we shold not loop the animation
            if (options.loop) {
                options.currentFrame = 0;
            }
            else {
                clearInterval(options.intervalID);
                options.deferred.resolve();
            }
        }
    }

    function drawAnimation(options) {
        var framePosition = getFramePosition(options.currentFrame, options.frameSize, options.spriteSheetSize);
        var text = -(framePosition.column * options.frameSize.width) + 'px ' + -(framePosition.row * options.frameSize.height) + 'px';
        $(options.target).css('background-position', text);
    }

    // The primary animate function that is called after we've determined the sprite sheet size
    function spritifyAnimate(options, customDraw) {
        var options = $.extend({
            target: $(this),
            frameSize: { width: $(this).width(), height: $(this).height() },
            centerOn: null,
            startFrame: 0,
            fps: options.frameCount, // Default to Frame Count so we have 1 frame per animation
            loop: false,
            destroyOncePlayed: true
        }, options);

        // destroyOncePlayed can only be true if loop is false
        options.destroyOncePlayed = (options.loop === false) ? options.destroyOncePlayed : false;

        // Initialize the current frame to the designated start frame
        options.currentFrame = options.startFrame;

        // Check if we have a frame count set, if not then we need to calculate the frames
        if ($(options.frameCount).length === 0) {
            options.frameCount = (options.spriteSheetSize.width / options.frameSize.width) * (options.spriteSheetSize.height / options.frameSize.height);

            if ($(options.fps).length === 0) {
                options.fps = options.frameCount;
            }
        }

        // If Centering is turned on then we need to center the target
        if ($(options.centerOn).length > 0) {
            options.target.offset({ top: options.centerOn.y - .5 * options.frameSize.height, left: options.centerOn.x - .5 * options.frameSize.width })
        }

        // This will decide how many millseconds per function call to update the animation
        var interval = 1000 / options.fps;
        options.intervalID = setInterval(function () {
            drawAnimation(options);
            nextAnimationFrame(options);
        }, interval);
    }

    $.fn.extend({
        spritify: function (options) {
            options = options || {};
            options.deferred = $.Deferred();

            setFrameSize(this, options, spritifyAnimate);
            return options.deferred.promise();
        }
    });
})(jQuery);

function spritify(options) {
    var that = this;

    that.Destroyed = false;

    function getFramePosition(currentFrame, frameSize, spriteSheetSize) {
        var columns = spriteSheetSize.width / frameSize.width;
        var rows = spriteSheetSize.height / frameSize.height;
        var row = Math.floor(currentFrame / columns);
        var column = Math.ceil(currentFrame % columns);
        return { row: row, column: column };
    }

    function nextAnimationFrame() {
        // If we've reached the end of the animation
        if (++options.currentFrame === options.frameCount) {
            if (options.destroyOncePlayed) {
                that.Destroyed = true;
            }

            // Check if we shold not loop the animation
            if (options.loop) {
                options.currentFrame = 0;
            }
            else {                
                clearInterval(options.intervalID);
                options.deferred.resolve();
            }
        }
    }

    // The primary animate function that is called after we've determined the sprite sheet size
    function spritifyAnimate() {
        options = $.extend({
            centerOn: null,
            startFrame: 0,
            fps: options.frameCount, // Default to Frame Count so we have 1 frame per animation
            loop: false,
            destroyOncePlayed: true,
            Rotation: 0,
            X: 0,
            Y: 0,
            deferred: $.Deferred()
        }, options);

        // destroyOncePlayed can only be true if loop is false
        options.destroyOncePlayed = (options.loop === false) ? options.destroyOncePlayed : false;

        // Initialize the current frame to the designated start frame
        options.currentFrame = options.startFrame;

        // Check if we have a frame count set, if not then we need to calculate the frames
        if (!options.frameCount) {
            options.frameCount = (options.spriteSheetSize.width / options.frameSize.width) * (options.spriteSheetSize.height / options.frameSize.height);

            if (!options.fps) {
                options.fps = options.frameCount;
            }
        }

        // If Centering is turned on then we need to center the target
        if (options.centerOn) {
            options.X = options.centerOn.X - .5 * options.frameSize.width;
            options.Y = options.centerOn.Y - .5 * options.frameSize.height;
        }

        // This will decide how many millseconds per function call to update the animation
        var interval = 1000 / options.fps;
        options.intervalID = setInterval(function () {
            nextAnimationFrame();            
        }, interval);
    }

    that.Draw = function () {
        if (!that.Destroyed) {
            var framePosition = getFramePosition(options.currentFrame, options.frameSize, options.spriteSheetSize);

            CanvasContext.drawRotatedImage(options.image, that.MovementController.Rotation, framePosition.column * options.frameSize.width, framePosition.row * options.frameSize.height, options.frameSize.width, options.frameSize.height, that.MovementController.Position.X, that.MovementController.Position.Y, options.frameSize.width, options.frameSize.height);
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
