/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="BulletGraphic.ts" />
/// <reference path="BulletMovementController.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(payload, contentManager) {
            // Going to use the rectangle to "hold" all the other graphics
            this.Graphic = new ShootR.BulletGraphic(payload.MovementController.Position, Bullet.SIZE, contentManager);

            _super.call(this, this.Graphic.GetDrawBounds());

            this.OnExplosion = new eg.EventHandler();
            this.MovementController = new ShootR.BulletMovementController(new Array(this.Bounds, this.Graphic), payload.MovementController);
            this.AnimationHandler = new ShootR.BulletAnimationHandler(this, contentManager);

            this._spawnedAt = new Date().getTime();
            this._destroyed = false;

            this.LoadPayload(payload);
        }
        Bullet.prototype.Update = function (gameTime) {
            this.MovementController.Update(gameTime);
            this.AnimationHandler.Update(gameTime);

            if ((new Date().getTime() - this._spawnedAt) >= Bullet.BULLET_DIE_AFTER.Milliseconds) {
                this.Destroy(false);
            }
        };

        Bullet.prototype.LoadPayload = function (payload) {
            this.ID = payload.ID;
            this.MovementController.LoadPayload(payload.MovementController);

            // Ensure that our position matches the movement controllers position
            this.Bounds.Position = this.Graphic.Position = this.MovementController.Position;
        };

        Bullet.prototype.Destroy = function (explode) {
            if (typeof explode === "undefined") { explode = true; }
            if (!this._destroyed) {
                this._destroyed = true;

                this.MovementController.Dispose();

                if (!explode) {
                    this.Graphic.Dispose();
                    this.Dispose();
                } else {
                    // We rely on the completion of the explosion to finish disposing the bounds and graphic
                    this.OnExplosion.Trigger();
                }
            }
        };
        Bullet.SIZE = new eg.Size2d(13);
        Bullet.BULLET_DIE_AFTER = eg.TimeSpan.FromSeconds(2);
        return Bullet;
    })(eg.Collision.Collidable);
    ShootR.Bullet = Bullet;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=Bullet.js.map
