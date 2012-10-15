function ConfigurationManager(config) {
    var that = this;

    // Update the prototypes from the config
    $.extend(ShipVehicle.prototype, config.shipConfig);
    ShipVehicle.prototype.HALF_WIDTH = ShipVehicle.prototype.WIDTH * .5;
    ShipVehicle.prototype.HALF_HEIGHT = ShipVehicle.prototype.HEIGHT * .5;

    $.extend(Leaderboard.prototype, config.leaderboardConfig);
    $.extend(Bullet.prototype, config.bulletConfig);
    $.extend(Map.prototype, config.mapConfig);
    $.extend(Screen.prototype, config.screenConfig);
    $.extend(Game.prototype, config.gameConfig);

    Camera.prototype.View = {
        SPEED: config.gameConfig.MAX_CAMERA_SPEED        
    };

    Ship.prototype.REQUEST_PING_EVERY = config.gameConfig.REQUEST_PING_EVERY;

    $.extend(that, config);
}