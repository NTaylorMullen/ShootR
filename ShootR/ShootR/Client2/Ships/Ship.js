/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="Abilities/AbilityHandlers/ShipAbilityHandler.ts" />
/// <reference path="Graphics/ShipGraphic.ts" />
/// <reference path="Animations/ShipAnimationHandler.ts" />
/// <reference path="ShipMovementController.ts" />
/// <reference path="ShipLifeController.ts" />
/// <reference path="Levels/ShipLevelManager.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var Ship = (function (_super) {
        __extends(Ship, _super);
        function Ship(payload, contentManager) {
            this._destroyed = false;
            this.OnExplosion = new eg.EventHandler();

            this.LifeController = new ShootR.ShipLifeController(payload);
            this.LevelManager = new ShootR.ShipLevelManager(payload);

            this.Graphic = new ShootR.ShipGraphic(this.LevelManager, this.LifeController, payload.MovementController.Position, Ship.SIZE, contentManager);

            // Going to use the rectangle to "hold" all the other graphics
            _super.call(this, this.Graphic.GetDrawBounds());

            this.MovementController = new ShootR.ShipMovementController(new Array(this.Bounds, this.Graphic));
            this.AbilityHandler = new ShootR.ShipAbilityHandler(this);
            this.AnimationHandler = new ShootR.ShipAnimationHandler(this, contentManager);

            this.LoadPayload(payload);
        }
        Ship.prototype.Update = function (gameTime) {
            this.AbilityHandler.Update(gameTime);
            this.MovementController.Update(gameTime);
            this.AnimationHandler.Update(gameTime);

            // Updates rotation
            this.Graphic.RotateShip(this.MovementController.Rotation);
            this.Graphic.Update(gameTime);
        };

        Ship.prototype.LoadPayload = function (payload) {
            this.ID = payload.ID;
            this.MovementController.LoadPayload(payload.MovementController);
            this.LifeController.LoadPayload(payload);
            this.LevelManager.LoadPayload(payload);
        };

        Ship.prototype.Destroy = function (explode) {
            if (typeof explode === "undefined") { explode = false; }
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
        Ship.SIZE = new eg.Size2d(75);
        Ship.DAMAGE_INCREASE_RATE = .1;
        return Ship;
    })(eg.Collision.Collidable);
    ShootR.Ship = Ship;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=Ship.js.map
