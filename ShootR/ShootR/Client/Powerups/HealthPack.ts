/// <reference path="Powerup.ts" />
/// <reference path="../Managers/spritify.ts" />
/// <reference path="../Utilities/ImageAssets.ts" />
/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="../Utilities/GameTime.ts" />
/// <reference path="../Collidable/MovementControllers/StationaryMovementController.ts" />

class HealthPack extends Powerup {
    static WIDTH: number;
    static HEIGHT: number;
    static LIFE_SPAN: number;

    private _animation: spritify;
    private _spawnedAt: number;

    public MovementController: StationaryMovementController;

    constructor (properties: any, position: Vector2) {
        super(properties);

        this.WIDTH = HealthPack.WIDTH;
        this.HEIGHT = HealthPack.HEIGHT;
        this.MovementController = new StationaryMovementController(position);

        this._spawnedAt = new Date().getTime();
        this.InitializeAnimationCanvas();
        this.UpdateAnimationCanvasSize(new Size(this.WIDTH, this.HEIGHT));

        this._animation = new spritify({
            image: IMAGE_ASSETS.HealthPack,
            drawOn: this.AnimationCanvasContext,
            X: 0,
            Y: 0,
            frameCount: 18,
            fps: 18,
            spriteSheetSize: new Size(450, 100),
            frameSize: new Size(this.WIDTH, this.HEIGHT),
            Rotation: 0,
            autoPlay: false,
            loop: true
        });

        this._animation.Play();
        this.AnimationDrawList.push(this._animation);
    }   

    public Update (gameTime: GameTime) {
        if (gameTime.Now.getTime() - this._spawnedAt >= HealthPack.LIFE_SPAN) {
            this.Disposed = true;
        }

        this._animation.Update(gameTime.Now);
    }
}