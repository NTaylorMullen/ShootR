/// <reference path="../Boost.ts" />
/// <reference path="AbilityHandler.ts" />
/// <reference path="../../Ship/Ship.ts" />

declare var $;

class ShipAbilityHandler extends AbilityHandler {
    private boost: Boost;

    constructor (MyShip: Ship) {
        var boost = new Boost(MyShip.MovementController, MyShip.Controllable);
        super([boost]);

        this.boost = boost;
        $(MyShip).on("OnOutOfBounds", $.proxy(this.boost.Deactivate, this.boost));
    }
}