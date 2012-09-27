function ConfigurationManager(config) {
    var that = this;

    // Update the prototypes from the config
    $.extend(ShipVehicle.prototype, config.shipConfig);
    $.extend(Bullet.prototype, config.bulletConfig);
    $.extend(Map.prototype, config.mapConfig);
    $.extend(that, config);
}