/// <reference path="../Managers/spritify.ts" />
/// <reference path="../Utilities/ImageAssets.ts" />
/// <reference path="../Utilities/Size.ts" />
/// <reference path="Ship.ts" />

class ShipAnimationHandler {
    static FULL_THRUST_AFTER: number = 400;
    static CANVAS_WIDTH_BUFFER: number = 200;// thruster animation frame width *2 (to keep canvas centered)
    static SHIP_STARTS_AT_X: number = 100;

    private _thrustBasicAnimation: spritify;
    private _thrustStartAnimation: spritify;
    private _boostAnimation: spritify;
    private _movingForwardSince: any;
    private _lastHealth: number;

    constructor (public MyShip: Ship) {
        this.MyShip.InitializeAnimationCanvas();
        this.MyShip.UpdateAnimationCanvasSize(new Size(this.MyShip.WIDTH + ShipAnimationHandler.CANVAS_WIDTH_BUFFER, this.MyShip.HEIGHT));

        // Initialize animation objects
        this._boostAnimation = new spritify({
            image: IMAGE_ASSETS.Boost,
            drawOn: this.MyShip.AnimationCanvasContext,
            X: 0,
            Y: (this.MyShip.HEIGHT / 2) - 26,
            frameCount: 10,
            fps: 12,
            spriteSheetSize: new Size(400, 150),
            frameSize: new Size(100, 50),
            Rotation: 0,
            autoPlay: false,
            autoClear: false,
            loop: true,
            loopFrom: 4,
            finalFrames: 2
        });

        this._thrustBasicAnimation = new spritify({
            image: IMAGE_ASSETS.ThrustBasic,
            drawOn: this.MyShip.AnimationCanvasContext,
            X: 50,
            Y: (this.MyShip.HEIGHT / 2) - 25,
            frameCount: 18,
            fps: 18,
            spriteSheetSize: new Size(450, 100),
            frameSize: new Size(50, 50),
            Rotation: 0,
            autoPlay: false,
            autoClear: false,
            loop: true
        });

        this._thrustStartAnimation = new spritify({
            image: IMAGE_ASSETS.ThrustStart,
            drawOn: this.MyShip.AnimationCanvasContext,
            X: 50,
            Y: (this.MyShip.HEIGHT / 2) - 25,
            frameCount: 18,
            fps: 18,
            spriteSheetSize: new Size(450, 100),
            frameSize: new Size(50, 50),
            Rotation: 0,
            autoPlay: false,
            autoClear: false,
            loop: true
        });

        this.MyShip.AnimationDrawList.push(this._thrustBasicAnimation);
        this.MyShip.AnimationDrawList.push(this._thrustStartAnimation);
        this.MyShip.AnimationDrawList.push(this._boostAnimation);

        this._lastHealth = this.MyShip.MaxLife;
    }

    public DrawDamage(): void {
        var healthDiff: number = this._lastHealth - this.MyShip.LifeController.Health;
        if (healthDiff !== 0) { // If the health has changed
            this._lastHealth = this.MyShip.LifeController.Health;
            var damageImage: number = (Math.floor((1 - (this.MyShip.LifeController.Health / this.MyShip.MaxLife)) * 10)) - 2;

            if (damageImage > 0 && damageImage < 8) {
                // We've gained life, need to clear canvas and re-apply all pre-existing images
                if (healthDiff < 0) {
                    this.MyShip.AnimationCanvasContext.clearRect(ShipAnimationHandler.SHIP_STARTS_AT_X, 0, this.MyShip.WIDTH, this.MyShip.HEIGHT);

                    for (var i = 1; i <= damageImage; i++) {
                        if (IMAGE_ASSETS["ShipDamage" + i]) {
                            this.MyShip.AnimationCanvasContext.drawImage(IMAGE_ASSETS["ShipDamage" + i], ShipAnimationHandler.SHIP_STARTS_AT_X, 0);
                        }
                    }
                }
                else { // We've lost life, just apply another layer
                    if (IMAGE_ASSETS["ShipDamage" + damageImage]) {
                        this.MyShip.AnimationCanvasContext.drawImage(IMAGE_ASSETS["ShipDamage" + damageImage], ShipAnimationHandler.SHIP_STARTS_AT_X, 0);
                    }
                }
            }
            else {
                this.MyShip.AnimationCanvasContext.clearRect(ShipAnimationHandler.SHIP_STARTS_AT_X, 0, this.MyShip.WIDTH, this.MyShip.HEIGHT);
            }
        }
    }

    public Update (now: Date): void {
        var nowMilliseconds: number = now.getTime();

        if (!this.MyShip.ShipAbilityHandler.Ability("Boost").Active) {
            this._boostAnimation.Stop(true);
            if (this.MyShip.MovementController.Moving.Forward) {
                if (!this._movingForwardSince) {
                    this._movingForwardSince = new Date().getTime();
                }

                if (nowMilliseconds - this._movingForwardSince >= ShipAnimationHandler.FULL_THRUST_AFTER) {
                    this._thrustBasicAnimation.Play();
                }
                this._thrustStartAnimation.Play();
            }
            else {
                this._movingForwardSince = false;
                this._thrustBasicAnimation.Stop();
                this._thrustStartAnimation.Stop();
            }
            this._thrustBasicAnimation.Update(now);
            this._thrustStartAnimation.Update(now);
        }
        else { // We're boosting
            this._boostAnimation.Play();
            this._thrustBasicAnimation.Stop();
            this._thrustStartAnimation.Stop();
        }

        this._boostAnimation.Update(now);
        this._boostAnimation.ClearDrawOnCanvas();
        this._thrustStartAnimation.ClearDrawOnCanvas();
    }
}