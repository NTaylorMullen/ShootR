function HUDManager(MyShip, connection) {
    var that = this,
        gameHUD = $("#gameHUD"),
        gameHUDHeight = gameHUD.height();

    that.GameDetailManager;
    that.HealthMonitor = new HealthMonitor(MyShip);
    that.ExperienceMonitor = new ExperienceMonitor(gameHUD, MyShip);
    that.MyRankings = new MyRankings();
    that.Leaderboard = new Leaderboard(gameHUD, MyShip, connection);
    that.DeathScreen = new DeathScreen(that.Leaderboard);    
    that.ShipStatMonitor = new ShipStatMonitor(MyShip);
    that.EnvironmentMonitor = new EnvironmentMonitor(MyShip);

    that.OnScreenResize = function (newViewport) {
        gameHUD.css("width", newViewport.Width);
        gameHUD.css("height", gameHUDHeight);
        gameHUD.css("top", newViewport.Height - gameHUDHeight);
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