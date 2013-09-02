/// <reference path="../Utilities/Size.ts" />
/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="../Space/CanvasRenderer.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
var spritify = (function () {
    function spritify(options) {
        this.options = options;
        this._lastUpdateFrame = new Date().getTime();
        this._finishingFrames = false;

        this.Destroyed = false;
        this.Playing = false;

        this.spritifyAnimate();

        this.Position = new Vector2(this.options.X, this.options.Y);
        this.Rotation = this.options.Rotation;
    }
    spritify.prototype.getFramePosition = function (currentFrame, frameSize, spriteSheetSize) {
        var columns = spriteSheetSize.Width / frameSize.Width, rows = spriteSheetSize.Height / frameSize.Height, row = Math.floor(currentFrame / columns), column = Math.ceil(currentFrame % columns);

        return { row: row, column: column };
    };

    spritify.prototype.initiateAnimation = function () {
        this.Playing = true;
        this.nextAnimationFrame();
    };

    spritify.prototype.nextAnimationFrame = function () {
        var _this = this;
        if (++this.options.currentFrame >= this.options.frameCount) {
            if (this._finishingFrames) {
                if (this.options.currentFrame - 1 < this.options.frameCount + this.options.finalFrames) {
                    if (this.options.autoPlay) {
                        this.options.timeoutID = setTimeout(this.nextAnimationFrame, this.options.interval);
                    }
                } else {
                    this._finishingFrames = false;
                    this.Stop();
                }
                return;
            }

            if (this.options.destroyOncePlayed) {
                this.Destroyed = true;
                this.Playing = false;
            }

            if (this.options.loop) {
                this.options.currentFrame = this.options.loopFrom;
            } else {
                this.Playing = false;
                this.options.deferred.resolve();
            }
        }

        if (this.Playing && this.options.autoPlay) {
            this.options.timeoutID = setTimeout(function () {
                _this.nextAnimationFrame();
            }, this.options.interval);
        }
    };

    spritify.prototype.ClearDrawOnCanvas = function () {
        this.options.drawOn.clearRect(this.Position.X, this.Position.Y, this.options.frameSize.Width, this.options.frameSize.Height);
    };

    spritify.prototype.Play = function () {
        if (!this.Playing) {
            this._finishingFrames = false;
            this.initiateAnimation();
        }
    };

    spritify.prototype.Pause = function () {
        if (this.Playing) {
            this.Playing = false;
            clearTimeout(this.options.timeoutID);
        }
    };

    spritify.prototype.Stop = function (finishFrames) {
        if (this.Playing) {
            if (finishFrames) {
                this._finishingFrames = true;
            } else {
                this.Playing = false;
                this.options.currentFrame = 0;
                this.ClearDrawOnCanvas();
                clearTimeout(this.options.timeoutID);
            }
        }
    };

    // The primary animate function that is called after we've determined the sprite sheet size
    spritify.prototype.spritifyAnimate = function () {
        this.options = $.extend({
            centerOn: null,
            startFrame: 0,
            fps: this.options.frameCount,
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
            deferred: ($).Deferred()
        }, this.options);

        // destroyOncePlayed can only be true if loop is false
        this.options.destroyOncePlayed = (this.options.loop === false) ? this.options.destroyOncePlayed : false;

        // Initialize the current frame to the designated start frame
        this.options.currentFrame = this.options.startFrame;

        this.options.interval = 1000 / this.options.fps;

        if (!this.options.frameCount) {
            this.options.frameCount = (this.options.spriteSheetSize.Width / this.options.frameSize.Width) * (this.options.spriteSheetSize.Height / this.options.frameSize.Height);

            if (!this.options.fps) {
                this.options.fps = this.options.frameCount;
            }
        }

        if (this.options.centerOn) {
            this.options.X = this.options.centerOn.X - .5 * this.options.frameSize.Width;
            this.options.Y = this.options.centerOn.Y - .5 * this.options.frameSize.Height;
        }

        if (this.options.autoPlay) {
            this.initiateAnimation();
        }
    };

    // Only need to update if we're not auto playing, auto play is dealt with via a timeout.
    spritify.prototype.Update = function (now) {
        if (!this.options.autoPlay && this.Playing) {
            var nowMilliseconds = now.getTime();

            if (this.Playing && (nowMilliseconds - this._lastUpdateFrame) >= this.options.interval) {
                this.nextAnimationFrame();
                this._lastUpdateFrame = nowMilliseconds;
            }
        }
    };

    spritify.prototype.Draw = function () {
        if (this.Playing && !this.Destroyed) {
            var framePosition = this.getFramePosition(this.options.currentFrame, this.options.frameSize, this.options.spriteSheetSize);

            if (!this.options.drawOn) {
                CanvasContext.drawRotatedImage(this.options.image, this.Rotation, framePosition.column * this.options.frameSize.Width, framePosition.row * this.options.frameSize.Height, this.options.frameSize.Width, this.options.frameSize.Height, this.Position.X, this.Position.Y, this.options.frameSize.Width, this.options.frameSize.Height);
            } else {
                if (this.options.autoClear) {
                    this.ClearDrawOnCanvas();
                }
                this.options.drawOn.drawImage(this.options.image, framePosition.column * this.options.frameSize.Width, framePosition.row * this.options.frameSize.Height, this.options.frameSize.Width, this.options.frameSize.Height, this.Position.X, this.Position.Y, this.options.frameSize.Width, this.options.frameSize.Height);
            }
        }
    };

    spritify.prototype.On = function () {
        return this.options.deferred.promise();
    };
    return spritify;
})();
//# sourceMappingURL=spritify.js.map
