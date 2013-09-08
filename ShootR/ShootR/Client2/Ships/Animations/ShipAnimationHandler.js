/// <reference path="../../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../../Utilities/Animation.ts" />
/// <reference path="../Ship.ts" />
/// <reference path="ShipThrustAnimation.ts" />
/// <reference path="ShipBoostAnimation.ts" />
var ShootR;
(function (ShootR) {
    var ShipAnimationHandler = (function () {
        function ShipAnimationHandler(_ship, _contentManager) {
            var _this = this;
            this._ship = _ship;
            this._contentManager = _contentManager;
            var thrustSpriteSheet = this._contentManager.GetImage("Thrust"), thrustStartSpriteSheet = this._contentManager.GetImage("ThrustStart");

            this._thrustAnimation = new ShootR.ShipThrustAnimation(this._contentManager);
            this._boostAnimation = new ShootR.ShipBoostAnimation(this._contentManager);

            this._ship.Graphic.AddChild(this._thrustAnimation);
            this._ship.Graphic.AddChild(this._boostAnimation);

            this._ship.MovementController.OnMove.Bind(function (event) {
                if (event.Direction === "Forward") {
                    if (event.StartMoving) {
                        _this._thrustAnimation.Play();
                    } else {
                        _this._thrustAnimation.Stop();
                    }
                }
            });

            this._ship.AbilityHandler.Boost.OnStart.Bind(function () {
                _this._boostAnimation.Play();
            });

            this._ship.AbilityHandler.Boost.OnStop.Bind(function () {
                _this._boostAnimation.Stop();
            });
        }
        ShipAnimationHandler.prototype.StopAllAnimations = function () {
            this._thrustAnimation.Stop();
            this._boostAnimation.Stop();
        };

        ShipAnimationHandler.prototype.Update = function (gameTime) {
            this._thrustAnimation.Update(gameTime);
            this._boostAnimation.Update(gameTime);
        };
        ShipAnimationHandler.FULL_THRUST_AFTER = eg.TimeSpan.FromMilliseconds(400);
        return ShipAnimationHandler;
    })();
    ShootR.ShipAnimationHandler = ShipAnimationHandler;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipAnimationHandler.js.map
