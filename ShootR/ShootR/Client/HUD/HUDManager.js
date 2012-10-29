function HUDManager(MyShip, connection) {
    var that = this,
        gameHUD = $("#gameHUD"),
        doublePopupHolder = $("#doublePopupHolder"),
        gameHUDHeight = gameHUD.height(),
        locationStats = $("#LocationStatisticsHolder"),
        shipStats = $("#StatisticHolder");

    that.GameDetailManager;
    that.HealthMonitor = new HealthMonitor(MyShip);
    that.ExperienceMonitor = new ExperienceMonitor(gameHUD, MyShip);
    that.MyRankings = new MyRankings();
    that.Leaderboard = new Leaderboard(gameHUD, MyShip, connection);
    that.DeathScreen = new DeathScreen(that.Leaderboard, MyShip);
    that.ShipStatMonitor = new ShipStatMonitor(MyShip);
    that.EnvironmentMonitor = new EnvironmentMonitor(MyShip);
    that.NotificationManager = new NotificationManager();

    function CenterDoublePopup(newViewport) {
        // The left is handled by the css
        doublePopupHolder.css("top", ((newViewport.Height - gameHUDHeight) / 2) - doublePopupHolder.height() / 2);
    }

    that.OnScreenResize = function (newViewport) {
        gameHUD.css("width", newViewport.Width);
        gameHUD.css("height", gameHUDHeight);
        gameHUD.css("top", newViewport.Height - gameHUDHeight);
        that.HealthMonitor.OnScreenResize();
        CenterDoublePopup(newViewport);

        // Remove or Add HUD objects
        if (newViewport.Width <= 1370) {
            locationStats.css("display", "none");
        }
        else {
            locationStats.css("display", "block");
        }

        // Remove or Add HUD objects
        if (newViewport.Width <= 1177) {
            shipStats.css("display", "none");
        }
        else {
            shipStats.css("display", "block");
        }
    }

    that.Initialize = function (config) {
        that.GameDetailManager = new GameDetailManager();
    }

    that.Update = function (payload) {
        that.HealthMonitor.Update();
        that.ExperienceMonitor.Update();
        that.MyRankings.Update(payload.Kills, payload.Deaths);
        that.ShipStatMonitor.Update();
        that.EnvironmentMonitor.Update(payload);
    }
}