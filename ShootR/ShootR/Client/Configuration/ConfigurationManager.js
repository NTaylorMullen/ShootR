function ConfigurationManager(config) {
    var that = this;

    // Update the prototypes from the config
    $.extend(ShipVehicle.prototype, config.shipConfig);
    $.extend(ShipMovementController.prototype, config.shipMovementControllerConfig);

    $.extend(Ability.prototype, config.abilityConfig);
    ShipVehicle.prototype.HALF_WIDTH = ShipVehicle.prototype.WIDTH * .5;
    ShipVehicle.prototype.HALF_HEIGHT = ShipVehicle.prototype.HEIGHT * .5;

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

    Ship.prototype.REQUEST_PING_EVERY = config.gameConfig.REQUEST_PING_EVERY;

    $.extend(that, config);

    ApplyInheritance();
}

function ApplyInheritance() {
    Ship.prototype = new ShipVehicle();        
}