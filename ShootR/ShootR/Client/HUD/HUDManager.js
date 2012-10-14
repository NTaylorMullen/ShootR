function HUDManager(MyShip, connection) {
    var that = this,
        gameHUD = $("#gameHUD");

    that.GameDetailManager;
    that.HealthMonitor = new HealthMonitor(MyShip);
    that.Leaderboard = new Leaderboard(gameHUD, connection);
    that.ControlRequestManager = new ControlRequestManager(connection);

    that.Initialize = function (config) {
        that.GameDetailManager = new GameDetailManager(config.ShipName, connection);
    }

    that.Update = function () {
        that.HealthMonitor.Update();
    }
}