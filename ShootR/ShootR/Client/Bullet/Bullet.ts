/// <reference path="../Collidable/Collidable.ts" />
/// <reference path="../Utilities/ImageAssets.ts" />
/// <reference path="../Managers/spritify.ts" />
/// <reference path="../GameGlobals.ts" />
/// <reference path="../HUD/Animation/TextAnimation.ts" />
/// <reference path="../Utilities/UtilityFunctions.ts" />
/// <reference path="../Utilities/GameTime.ts" />
/// <reference path="BulletMovementController.ts" />

class Bullet extends Collidable {
    static BULLET_DIE_AFTER: number; // Updated from server configuration value
    static WIDTH: number; // Updated from server configuration value
    static HEIGHT: number; // Updated from server configuration value

    private _spawnedAt: number;

    public DamageDealt: number;
    public MovementController: BulletMovementController;

    public WIDTH: number = Bullet.WIDTH;
    public HEIGHT: number = Bullet.HEIGHT;

    constructor (properties: any) {
        super();

        this.MovementController = new BulletMovementController();
        this.Vehicle = IMAGE_ASSETS.Laser;
        this._spawnedAt = this.LastUpdated.getTime();

        this.UpdateProperties(properties)
    }

    public ShouldDispose(): bool {
        return ((new Date().getTime()) - this._spawnedAt) >= Bullet.BULLET_DIE_AFTER;
    }

    public Destroy(): void {
        // Bullet collided into another object
        if (this.Collided) {
            // We want to explode
            GAME_GLOBALS.AnimationManager.Add(new spritify({
                image: IMAGE_ASSETS.Explosion,
                centerOn: { X: this.CollidedAt.X, Y: this.CollidedAt.Y },
                frameCount: 24,
                spriteSheetSize: new Size(320, 320),
                frameSize: new Size(64, 64),
                Rotation: this.MovementController.Rotation
            }));

            // Need to draw text
            if (this.DamageDealt > 0) {
                GAME_GLOBALS.AnimationManager.Add(new TextAnimation("-" + this.DamageDealt, this.CollidedAt, { duration: 750 }));
            }
        }

        this.Visible = false;
    }

    public Update(gameTime?: GameTime): void {
        var now: Date = new Date();

        this.MovementController.Update(CalculatePOS(this.LastUpdated), now);

        this.LastUpdated = now;
    }
}