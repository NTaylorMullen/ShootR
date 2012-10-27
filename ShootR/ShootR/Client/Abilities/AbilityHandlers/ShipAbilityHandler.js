function ShipAbilityHandler(MyShip) {
    if (MyShip.MovementController) {
        AbilityHandler.apply(this, [[new Boost(MyShip.MovementController, MyShip.Controllable)]]);
        var that = this;

        $(MyShip).on("OnOutOfBounds", that.Ability("Boost").Deactivate);
    }
}

ShipAbilityHandler.prototype = new AbilityHandler();