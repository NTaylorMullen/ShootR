/// <reference path="../Boost.ts" />
/// <reference path="AbilityHandler.ts" />
/// <reference path="../../Ship/Ship.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />

class ShipAbilityHandler extends AbilityHandler {
    private boost: Boost;

    constructor (myShip: Ship) {
        var boost: Boost = new Boost(myShip.MovementController, myShip.Controllable);
        super([boost]);

        this.boost = boost;
        $(myShip).on("OnOutOfBounds", $.proxy(this.boost.Deactivate, this.boost));
    }
}