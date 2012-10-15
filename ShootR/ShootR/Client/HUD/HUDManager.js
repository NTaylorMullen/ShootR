function HUDManager(MyShip, connection) {
    var that = this,
        gameHUD = $("#gameHUD");

    that.GameDetailManager;
    that.HealthMonitor = new HealthMonitor(MyShip);
    that.ExperienceMonitor = new ExperienceMonitor(gameHUD, MyShip);
    that.Leaderboard = new Leaderboard(gameHUD, connection);
    that.ControlRequestManager = new ControlRequestManager(connection);

    that.OnScreenResize = function (newViewport) {
        gameHUD.css("width", newViewport.Width);
        gameHUD.css("height", newViewport.Height);
        that.Leaderboard.OnScreenResize(newViewport);
        that.ExperienceMonitor.OnScreenResize(newViewport);
    }

    that.Initialize = function (config) {
        that.GameDetailManager = new GameDetailManager(config.ShipName, connection);
        $("#leaderboardPosition").css("display", "block");
        $("#ExperienceHUD").css("display", "block");
    }

    that.Update = function () {
        that.HealthMonitor.Update();
        that.ExperienceMonitor.Update();
    }
}