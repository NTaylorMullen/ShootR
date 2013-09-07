/// <reference path="../../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../../Utilities/Animation.ts" />
/// <reference path="../ShipMovementController.ts" />
/// <reference path="ShipGraphic.ts" />
/// <reference path="ShipThrustAnimation.ts" />
var ShootR;
(function (ShootR) {
    var ShipAnimationHandler = (function () {
        function ShipAnimationHandler(_movementController, _graphic, _contentManager) {
            var _this = this;
            this._movementController = _movementController;
            this._graphic = _graphic;
            this._contentManager = _contentManager;
            var thrustSpriteSheet = this._contentManager.GetImage("Thrust"), thrustStartSpriteSheet = this._contentManager.GetImage("ThrustStart");

            this._thrustAnimation = new ShootR.ShipThrustAnimation(this._contentManager);

            this._graphic.AddChild(this._thrustAnimation);

            this._movementController.OnMove.Bind(function (event) {
                if (event.Direction === "Forward") {
                    if (event.StartMoving) {
                        _this._thrustAnimation.Play();
                    } else {
                        _this._thrustAnimation.Stop();
                    }
                }
            });
        }
        ShipAnimationHandler.prototype.StopAllAnimations = function () {
            this._thrustAnimation.Stop();
        };

        ShipAnimationHandler.prototype.Update = function (gameTime) {
            this._thrustAnimation.Update(gameTime);
        };
        ShipAnimationHandler.FULL_THRUST_AFTER = eg.TimeSpan.FromMilliseconds(400);
        return ShipAnimationHandler;
    })();
    ShootR.ShipAnimationHandler = ShipAnimationHandler;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipAnimationHandler.js.map
