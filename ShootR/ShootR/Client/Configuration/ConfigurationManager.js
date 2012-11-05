function ConfigurationManager(config) {
    var that = this;

    // Update the prototypes from the config
    $.extend(Ship, config.shipConfig);
    $.extend(ShipMovementController, config.shipMovementControllerConfig);

    Boost.DURATION = config.abilityConfig.BOOST_DURATION;
    Boost.SPEED_INCREASE = config.abilityConfig.BOOST_SPEED_INCREASE;

    Ship.HALF_WIDTH = Ship.WIDTH * .5;
    Ship.HALF_HEIGHT = Ship.HEIGHT * .5;

    Bullet.prototype.BULLET_DIE_AFTER = config.gameConfig.BULLET_DIE_AFTER;

    $.extend(Leaderboard.prototype, config.leaderboardConfig);
    $.extend(Bullet.prototype, config.bulletConfig);
    $.extend(Map.prototype, config.mapConfig);
    $.extend(Screen.prototype, config.screenConfig);
    $.extend(Game.prototype, config.gameConfig);
    $.extend(HealthPack.prototype, config.healthPackConfig);
    
    DeathScreen.prototype.RESPAWN_TIMER = config.gameConfig.RESPAWN_TIMER;

    Camera.prototype.View = {
        SPEED: config.gameConfig.MAX_CAMERA_SPEED        
    };

    ShipController.REQUEST_PING_EVERY = config.gameConfig.REQUEST_PING_EVERY;

    $.extend(that, config);
}