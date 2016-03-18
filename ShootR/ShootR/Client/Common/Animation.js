/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var Animation = (function (_super) {
        __extends(Animation, _super);
        function Animation(position, spriteSheet, fps, frameSize, frameCount) {
            _super.call(this, position.X, position.Y, spriteSheet, frameSize.Width, frameSize.Height);

            this._animator = new eg.Graphics.SpriteAnimation(spriteSheet, fps, frameSize, frameCount);
            this._animator.Step(1);
        }
        Object.defineProperty(Animation.prototype, "OnComplete", {
            get: function () {
                return this._animator.OnComplete;
            },
            enumerable: true,
            configurable: true
        });

        Animation.prototype.Play = function (repeat) {
            if (typeof repeat === "undefined") { repeat = false; }
            this._animator.Play(repeat);
        };

        Animation.prototype.Stop = function () {
            this._animator.Stop();
        };

        Animation.prototype.Update = function (gameTime) {
            this._animator.Update(gameTime);
        };
        return Animation;
    })(eg.Graphics.Sprite2d);
    ShootR.Animation = Animation;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=Animation.js.map
