/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ship.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var ShipThrustAnimation = (function (_super) {
        __extends(ShipThrustAnimation, _super);
        function ShipThrustAnimation(contentManager) {
            var _this = this;
            this._thrustStartSpriteSheet = contentManager.GetImage("ThrustStart");
            this._thrustSpriteSheet = contentManager.GetImage("Thrust");

            _super.call(this, -ShootR.Ship.SIZE.HalfWidth - ShipThrustAnimation.FRAME_SIZE.HalfWidth, 0, this._thrustSpriteSheet, ShipThrustAnimation.FRAME_SIZE.Width, ShipThrustAnimation.FRAME_SIZE.Height);

            this._thrustStartAnimator = new eg.Graphics.SpriteAnimation(this._thrustStartSpriteSheet, ShipThrustAnimation.FPS, ShipThrustAnimation.FRAME_SIZE, ShipThrustAnimation.FRAME_COUNT);
            this._thrustAnimator = new eg.Graphics.SpriteAnimation(this._thrustSpriteSheet, ShipThrustAnimation.FPS, ShipThrustAnimation.FRAME_SIZE, ShipThrustAnimation.FRAME_COUNT);

            this._thrustStartAnimator.OnComplete.Bind(function () {
                _this.Image = _this._thrustSpriteSheet;
                _this._thrustAnimator.Play(true);
            });

            this.Visible = false;
        }
        ShipThrustAnimation.prototype.Play = function () {
            this.Image = this._thrustStartSpriteSheet;
            this._thrustStartAnimator.Play();
            this.Visible = true;
        };

        ShipThrustAnimation.prototype.IsPlaying = function () {
            return this._thrustAnimator.IsPlaying() || this._thrustStartAnimator.IsPlaying();
        };

        ShipThrustAnimation.prototype.Stop = function () {
            this._thrustStartAnimator.Stop();
            this._thrustAnimator.Stop();
            this.Visible = false;
        };

        ShipThrustAnimation.prototype.Update = function (gameTime) {
            this._thrustStartAnimator.Update(gameTime);
            this._thrustAnimator.Update(gameTime);
        };
        ShipThrustAnimation.FRAME_SIZE = new eg.Size2d(52, 50);
        ShipThrustAnimation.FRAME_COUNT = 18;
        ShipThrustAnimation.FPS = 18;
        return ShipThrustAnimation;
    })(eg.Graphics.Sprite2d);
    ShootR.ShipThrustAnimation = ShipThrustAnimation;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipThrustAnimation.js.map
