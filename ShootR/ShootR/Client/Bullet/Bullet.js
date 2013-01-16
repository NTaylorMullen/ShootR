var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(properties) {
        _super.call(this);
        this.WIDTH = Bullet.WIDTH;
        this.HEIGHT = Bullet.HEIGHT;
        this.MovementController = new BulletMovementController();
        this.Vehicle = IMAGE_ASSETS.Laser;
        this._spawnedAt = this.LastUpdated.getTime();
        this.UpdateProperties(properties);
    }
    Bullet.BULLET_DIE_AFTER = 0;
    Bullet.WIDTH = 0;
    Bullet.HEIGHT = 0;
    Bullet.prototype.ShouldDispose = function () {
        return ((new Date().getTime()) - this._spawnedAt) >= Bullet.BULLET_DIE_AFTER;
    };
    Bullet.prototype.Destroy = function () {
        if(this.Collided) {
            GAME_GLOBALS.AnimationManager.Add(new spritify({
                image: IMAGE_ASSETS.Explosion,
                centerOn: {
                    X: this.CollidedAt.X,
                    Y: this.CollidedAt.Y
                },
                frameCount: 24,
                spriteSheetSize: new Size(320, 320),
                frameSize: new Size(64, 64),
                Rotation: this.MovementController.Rotation
            }));
            if(this.DamageDealt > 0) {
                GAME_GLOBALS.AnimationManager.Add(new TextAnimation("-" + this.DamageDealt, this.CollidedAt, {
                    duration: 750
                }));
            }
        }
        this.Visible = false;
    };
    Bullet.prototype.Update = function (gameTime) {
        var now = new Date();
        this.MovementController.Update(CalculatePOS(this.LastUpdated), now);
        this.LastUpdated = now;
    };
    return Bullet;
})(Collidable);
//@ sourceMappingURL=Bullet.js.map
