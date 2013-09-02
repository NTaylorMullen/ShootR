/// <reference path="../Boost.ts" />
/// <reference path="AbilityHandler.ts" />
/// <reference path="../../Ship/Ship.ts" />
/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShipAbilityHandler = (function (_super) {
    __extends(ShipAbilityHandler, _super);
    function ShipAbilityHandler(myShip) {
        var boost = new Boost(myShip.MovementController, myShip.Controllable);
        _super.call(this, [boost]);

        this.boost = boost;
        $(myShip).on("OnOutOfBounds", $.proxy(this.boost.Deactivate, this.boost));
    }
    return ShipAbilityHandler;
})(AbilityHandler);
//# sourceMappingURL=ShipAbilityHandler.js.map
