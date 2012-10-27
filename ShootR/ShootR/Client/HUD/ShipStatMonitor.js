function ShipStatMonitor(MyShip) {
    var that = this,
        speedHolder = $("#Speed"),
        healthHolder = $("#IncreasedHealth"),
        damageHolder = $("#IncreasedDamage");

    that.Update = function () {
        var speed = Math.round(Math.sqrt(Math.pow(MyShip.MovementController.Velocity.X, 2) + Math.pow(MyShip.MovementController.Velocity.Y, 2))),
            increasedLife = MyShip.MaxLife - MyShip.START_LIFE,
            increasedDamage = Math.round((MyShip.Level - 1) * MyShip.DAMAGE_INCREASE_RATE*10)/10;

        speedHolder.html(speed);
        healthHolder.html(increasedLife);
        damageHolder.html(increasedDamage);
    }
}