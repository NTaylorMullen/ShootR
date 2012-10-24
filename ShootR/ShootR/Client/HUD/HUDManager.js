function HUDManager(MyShip, connection) {
    var that = this,
        gameHUD = $("#gameHUD"),
        gameHUDHeight = gameHUD.height();

    that.GameDetailManager;
    that.HealthMonitor = new HealthMonitor(MyShip);
    /*that.ExperienceMonitor = new ExperienceMonitor(gameHUD, MyShip);
    that.Leaderboard = new Leaderboard(gameHUD, connection);*/

    that.OnScreenResize = function (newViewport) {
        gameHUD.css("width", newViewport.Width);
        gameHUD.css("height", gameHUDHeight);
        gameHUD.css("top", newViewport.Height - gameHUDHeight);

        //that.Leaderboard.OnScreenResize(newViewport);
        //that.ExperienceMonitor.OnScreenResize(newViewport);
    }

    that.Initialize = function (config) {
        that.GameDetailManager = new GameDetailManager();
    }

    that.Update = function () {
        that.HealthMonitor.Update();
        //that.ExperienceMonitor.Update();
    }
}