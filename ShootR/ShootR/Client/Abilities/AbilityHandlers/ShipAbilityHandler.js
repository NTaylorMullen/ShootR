function ShipAbilityHandler(MyShip) {
    if (MyShip.MovementController) {
        var that = this,
            boost = new Boost(MyShip.MovementController, MyShip.Controllable);
        AbilityHandler.apply(this, [[boost]]);
        

        $(MyShip).on("OnOutOfBounds", $.proxy(boost.Deactivate, boost));
    }
}

ShipAbilityHandler.prototype = new AbilityHandler();