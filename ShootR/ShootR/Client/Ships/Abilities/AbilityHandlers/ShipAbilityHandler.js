/// <reference path="../../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../../Space/MapBoundary.ts" />
/// <reference path="../../../Server/IPayloadDefinitions.ts" />
/// <reference path="../../Ship.ts" />
/// <reference path="../Boost.ts" />
/// <reference path="AbilityHandler.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var ShipAbilityHandler = (function (_super) {
        __extends(ShipAbilityHandler, _super);
        function ShipAbilityHandler(myShip) {
            var _this = this;
            var boost = new ShootR.Boost(myShip.MovementController);
            _super.call(this, [boost]);

            this.Boost = boost;

            myShip.OnCollision.Bind(function (data) {
                if (data.With instanceof ShootR.MapBoundary) {
                    _this.Boost.Deactivate();
                }
            });
        }
        ShipAbilityHandler.prototype.LoadPayload = function (payload) {
            if (payload.Boost && !this.Boost.Active) {
                this.Boost.Activate();
            } else if (!payload.Boost) {
                this.Boost.Deactivate();
            }
        };
        return ShipAbilityHandler;
    })(ShootR.AbilityHandler);
    ShootR.ShipAbilityHandler = ShipAbilityHandler;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipAbilityHandler.js.map
