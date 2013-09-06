/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="Abilities/AbilityHandlers/ShipAbilityHandler.ts" />
/// <reference path="ShipGraphic.ts" />
/// <reference path="ShipMovementController.ts" />
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
            // Going to use the rectangle to "hold" all the other graphics
            this.Graphic = new ShootR.ShipGraphic(payload.MovementController.Position, Ship.SIZE, contentManager);

            _super.call(this, this.Graphic.GetDrawBounds());

            this.MovementController = new ShootR.ShipMovementController(new Array(this.Bounds, this.Graphic));
            this.AbilityHandler = new ShootR.ShipAbilityHandler(this);

            this.LoadPayload(payload);
        }
        Ship.prototype.Update = function (gameTime) {
            this.AbilityHandler.Update(gameTime);
            this.MovementController.Update(gameTime);
        };

        Ship.prototype.LoadPayload = function (payload) {
            this.ID = payload.ID;
            this.MovementController.LoadPayload(payload.MovementController);
        };

        Ship.prototype.Destroy = function () {
            this.Graphic.Dispose();
            this.Dispose();
        };
        Ship.SIZE = new eg.Size2d(75, 75);
        return Ship;
    })(eg.Collision.Collidable);
    ShootR.Ship = Ship;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=Ship.js.map
