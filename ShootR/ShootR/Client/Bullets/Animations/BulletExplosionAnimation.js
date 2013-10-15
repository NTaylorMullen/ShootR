/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Common/Animation.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var BulletExplosionAnimation = (function (_super) {
        __extends(BulletExplosionAnimation, _super);
        function BulletExplosionAnimation(contentManager) {
            _super.call(this, eg.Vector2d.Zero, contentManager.GetImage("BulletExplosion"), BulletExplosionAnimation.FPS, BulletExplosionAnimation.FRAME_SIZE, BulletExplosionAnimation.FRAME_COUNT);
            this.Rotation = (Math.random() * (Math.PI * 100)) / 100;
            this.Visible = false;
        }
        BulletExplosionAnimation.prototype.Play = function () {
            this.Visible = true;
            _super.prototype.Play.call(this);
        };
        BulletExplosionAnimation.FRAME_SIZE = new eg.Size2d(64, 64);
        BulletExplosionAnimation.FRAME_COUNT = 24;
        BulletExplosionAnimation.FPS = 24;
        return BulletExplosionAnimation;
    })(ShootR.Animation);
    ShootR.BulletExplosionAnimation = BulletExplosionAnimation;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=BulletExplosionAnimation.js.map
