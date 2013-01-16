var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShipAbilityHandler = (function (_super) {
    __extends(ShipAbilityHandler, _super);
    function ShipAbilityHandler(myShip) {
        var boost = new Boost(myShip.MovementController, myShip.Controllable);
        _super.call(this, [
    boost
]);
        this.boost = boost;
        $(myShip).on("OnOutOfBounds", $.proxy(this.boost.Deactivate, this.boost));
    }
    return ShipAbilityHandler;
})(AbilityHandler);
//@ sourceMappingURL=ShipAbilityHandler.js.map
