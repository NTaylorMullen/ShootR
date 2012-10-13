function HUDManager(MyShip) {
    var that = this,
        healthMonitor = new HealthMonitor(MyShip);

    that.Update = function () {
        healthMonitor.Update();
    }
}