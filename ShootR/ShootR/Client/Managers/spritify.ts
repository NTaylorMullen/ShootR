/// <reference path="../Utilities/Size.ts" />
/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="../Space/CanvasRenderer.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />

class spritify {
    private _lastUpdateFrame: number;
    private _finishingFrames: bool;

    public Destroyed: bool;
    public Playing: bool;
    public Position: Vector2;
    public Rotation: number;
    public Options: any;

    constructor (public options: any) {
        this._lastUpdateFrame = new Date().getTime();
        this._finishingFrames = false;

        this.Destroyed = false;
        this.Playing = false;

        this.spritifyAnimate();

        this.Position = new Vector2(this.options.X, this.options.Y);
        this.Rotation = this.options.Rotation;
    }

    private getFramePosition(currentFrame: number, frameSize: Size, spriteSheetSize: Size): any {
        var columns = spriteSheetSize.Width / frameSize.Width,
            rows = spriteSheetSize.Height / frameSize.Height,
            row = Math.floor(currentFrame / columns),
            column = Math.ceil(currentFrame % columns);

        return { row: row, column: column };
    }

    private initiateAnimation(): void {
        this.Playing = true;
        this.nextAnimationFrame();
    }

    private nextAnimationFrame(): void {
        // If we've reached the end of the animation
        if (++this.options.currentFrame >= this.options.frameCount) {
            if (this._finishingFrames) {
                if (this.options.currentFrame - 1 < this.options.frameCount + this.options.finalFrames) {
                    if (this.options.autoPlay) {
                        this.options.timeoutID = setTimeout(this.nextAnimationFrame, this.options.interval);
                    }
                }
                else {
                    this._finishingFrames = false;
                    this.Stop();
                }
                return;
            }

            if (this.options.destroyOncePlayed) {
                this.Destroyed = true;
                this.Playing = false;
            }

            // Check if we shold not loop the animation
            if (this.options.loop) {
                this.options.currentFrame = this.options.loopFrom;
            }
            else {
                this.Playing = false;
                this.options.deferred.resolve();
            }
        }

        if (this.Playing && this.options.autoPlay) {
            this.options.timeoutID = setTimeout(() => { this.nextAnimationFrame() }, this.options.interval);
        }
    }

    public ClearDrawOnCanvas(): void {
        this.options.drawOn.clearRect(this.Position.X, this.Position.Y, this.options.frameSize.Width, this.options.frameSize.Height);
    }

    public Play(): void {
        if (!this.Playing) {
            this._finishingFrames = false;
            this.initiateAnimation();
        }
    }

    public Pause(): void {
        if (this.Playing) {
            this.Playing = false;
            clearTimeout(this.options.timeoutID);
        }
    }

    public Stop(finishFrames?: bool) {
        if (this.Playing) {
            if (finishFrames) {
                this._finishingFrames = true;
            }
            else {
                this.Playing = false;
                this.options.currentFrame = 0;
                this.ClearDrawOnCanvas();
                clearTimeout(this.options.timeoutID);
            }
        }
    }

    // The primary animate function that is called after we've determined the sprite sheet size
    private spritifyAnimate() {
        this.options = $.extend({
            centerOn: null,
            startFrame: 0,
            fps: this.options.frameCount, // Default to Frame Count so we have 1 frame per animation
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
        }, this.options);

        // destroyOncePlayed can only be true if loop is false
        this.options.destroyOncePlayed = (this.options.loop === false) ? this.options.destroyOncePlayed : false;

        // Initialize the current frame to the designated start frame
        this.options.currentFrame = this.options.startFrame;

        this.options.interval = 1000 / this.options.fps;

        // Check if we have a frame count set, if not then we need to calculate the frames
        if (!this.options.frameCount) {
            this.options.frameCount = (this.options.spriteSheetSize.Width / this.options.frameSize.Width) * (this.options.spriteSheetSize.Height / this.options.frameSize.Height);

            if (!this.options.fps) {
                this.options.fps = this.options.frameCount;
            }
        }

        // If Centering is turned on then we need to center the target
        if (this.options.centerOn) {
            this.options.X = this.options.centerOn.X - .5 * this.options.frameSize.Width;
            this.options.Y = this.options.centerOn.Y - .5 * this.options.frameSize.Height;
        }

        if (this.options.autoPlay) {
            this.initiateAnimation();
        }
    }

    // Only need to update if we're not auto playing, auto play is dealt with via a timeout.
    public Update(now: Date): void {
        if (!this.options.autoPlay && this.Playing) {
            var nowMilliseconds: number = now.getTime();
            // Check if time for next frame
            if (this.Playing && (nowMilliseconds - this._lastUpdateFrame) >= this.options.interval) {
                this.nextAnimationFrame();
                this._lastUpdateFrame = nowMilliseconds;
            }
        }
    }

    public Draw(): void {
        if (this.Playing && !this.Destroyed) {
            var framePosition: any = this.getFramePosition(this.options.currentFrame, this.options.frameSize, this.options.spriteSheetSize);

            if (!this.options.drawOn) {
                CanvasContext.drawRotatedImage(this.options.image, this.Rotation, framePosition.column * this.options.frameSize.Width, framePosition.row * this.options.frameSize.Height, this.options.frameSize.Width, this.options.frameSize.Height, this.Position.X, this.Position.Y, this.options.frameSize.Width, this.options.frameSize.Height);
            }
            else {
                if (this.options.autoClear) {
                    this.ClearDrawOnCanvas();
                }
                this.options.drawOn.drawImage(this.options.image, framePosition.column * this.options.frameSize.Width, framePosition.row * this.options.frameSize.Height, this.options.frameSize.Width, this.options.frameSize.Height, this.Position.X, this.Position.Y, this.options.frameSize.Width, this.options.frameSize.Height);
            }
        }
    }

    public On() {
        return this.options.deferred.promise();
    }
}
