function ConfigurationManager(config) {
    var that = this;

    // Update the prototypes from the config
    $.extend(ShipVehicle.prototype, config.shipConfig);
    $.extend(Bullet.prototype, config.bulletConfig);
    $.extend(Map.prototype, config.mapConfig);

    Camera.prototype.View = {
        WIDTH: config.gameConfig.VIEW_WIDTH,
        HEIGHT: config.gameConfig.VIEW_HEIGHT,
        SPEED: config.gameConfig.MAX_CAMERA_SPEED
    };

    $.extend(that, config);
}