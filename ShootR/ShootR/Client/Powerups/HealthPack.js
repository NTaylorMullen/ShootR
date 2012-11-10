var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var HealthPack = (function (_super) {
    __extends(HealthPack, _super);
    function HealthPack(properties, position) {
        _super.call(this, properties);
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
    HealthPack.WIDTH = 0;
    HealthPack.HEIGHT = 0;
    HealthPack.LIFE_SPAN = 0;
    HealthPack.prototype.Update = function (gameTime) {
        if(gameTime.Now.getTime() - this._spawnedAt >= HealthPack.LIFE_SPAN) {
            this.Disposed = true;
        }
        this._animation.Update(gameTime.Now);
    };
    return HealthPack;
})(Powerup);
//@ sourceMappingURL=HealthPack.js.map
