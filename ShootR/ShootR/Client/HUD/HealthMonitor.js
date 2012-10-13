function HealthMonitor(MyShip) {
    var that = this,
        maxHealth = MyShip.LIFE,
        lastHealth = MyShip.Health,
        currentHealthBar = $("#Health"),
        healthAnimateSpeed = 500;

    that.Update = function () {
        if (MyShip.LifeController.Health !== lastHealth) {
            lastHealth = MyShip.LifeController.Health;
            currentHealthBar.animate({ width: ((lastHealth / maxHealth) * 100)+'%' }, healthAnimateSpeed, "easeOutExpo");
        }
    }
}