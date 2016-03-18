/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Common/Animation.ts" />
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
            this._deathAnimation = new ShootR.ShipDeathAnimation(this._contentManager);

            this._ship.Graphic.AddChildToShip(this._thrustAnimation);
            this._ship.Graphic.AddChildToShip(this._boostAnimation);
            this._ship.Graphic.AddChild(this._deathAnimation);

            this._ship.AbilityHandler.Boost.OnStart.Bind(function () {
                _this._thrustAnimation.Stop();
                _this._boostAnimation.Play();
            });

            this._ship.AbilityHandler.Boost.OnStop.Bind(function () {
                _this._boostAnimation.Stop();
            });

            this._ship.OnExplosion.Bind(function () {
                _this._thrustAnimation.Visible = false;
                _this._boostAnimation.Visible = false;
                _this._ship.Graphic.HideShip();

                _this._deathAnimation.Play();
            });

            this._deathAnimation.OnComplete.Bind(function () {
                _this._ship.Dispose();
                _this._ship.Graphic.Dispose();
            });
        }
        ShipAnimationHandler.prototype.StopAllAnimations = function () {
            this._thrustAnimation.Stop();
            this._boostAnimation.Stop();
        };

        ShipAnimationHandler.prototype.Update = function (gameTime) {
            var thrustIsPlaying = this._thrustAnimation.IsPlaying();

            if (!thrustIsPlaying && this._ship.MovementController.IsMovingInDirection("Forward") && !this._ship.AbilityHandler.Boost.Active) {
                this._thrustAnimation.Play();
            } else if (thrustIsPlaying && !this._ship.MovementController.IsMovingInDirection("Forward")) {
                this._thrustAnimation.Stop();
            }

            this._thrustAnimation.Update(gameTime);
            this._boostAnimation.Update(gameTime);
            this._deathAnimation.Update(gameTime);
        };
        ShipAnimationHandler.FULL_THRUST_AFTER = eg.TimeSpan.FromMilliseconds(400);
        return ShipAnimationHandler;
    })();
    ShootR.ShipAnimationHandler = ShipAnimationHandler;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipAnimationHandler.js.map
