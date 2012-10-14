function HUDManager(MyShip, connection) {
    var that = this,
        gameHUD = $("#gameHUD"),
        gameDetailManager;
        healthMonitor = new HealthMonitor(MyShip),
        leaderboard = new Leaderboard(gameHUD, connection);

    that.Initialize = function (config) {
        gameDetailManager = new GameDetailManager(config.ShipName, connection);
    }

    that.LoadLeaderboard = function (data) {
        leaderboard.Load(data);
    }

    that.Update = function () {
        healthMonitor.Update();
    }
}