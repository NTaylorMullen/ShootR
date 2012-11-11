/// <reference path="../Ship/ShipController.ts" />
/// <reference path="../Ship/Ship.ts" />
/// <reference path="../Ship/ShipMovementController.ts" />
/// <reference path="../Abilities/Boost.ts" />
/// <reference path="../Bullet/Bullet.ts" />
/// <reference path="../HUD/Leaderboard.ts" />
/// <reference path="../HUD/DeathScreen.ts" />
/// <reference path="../Space/Map.ts" />
/// <reference path="../Space/GameScreen.ts" />
/// <reference path="../Powerups/HealthPack.ts" />
/// <reference path="../Game.ts" />
/// <reference path="../Interfaces/IConfigurations.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />

class ConfigurationManager {
    public bulletConfig: BulletConfiguration;
    public gameConfig: GameConfiguration;
    public shipConfig: ShipConfiguration;
    public mapConfig: MapConfiguration;
    public screenConfig: ScreenConfiguration;
    public leaderboardConfig: LeaderboardConfiguration;
    public healthPackConfig: HealthPackConfiguration;
    public abilityConfig: AbilityConfiguration;
    public shipMovementControllerConfig: ShipMovementControllerConfig;

    constructor (config) {
        // Update the prototypes from the config
        $.extend(Ship, config.shipConfig);
        $.extend(ShipMovementController, config.shipMovementControllerConfig);

        Boost.DURATION = config.abilityConfig.BOOST_DURATION;
        Boost.SPEED_INCREASE = config.abilityConfig.BOOST_SPEED_INCREASE;

        Ship.HALF_WIDTH = Ship.WIDTH * .5;
        Ship.HALF_HEIGHT = Ship.HEIGHT * .5;

        Bullet.BULLET_DIE_AFTER = config.gameConfig.BULLET_DIE_AFTER;

        $.extend(Leaderboard, config.leaderboardConfig);
        $.extend(Bullet, config.bulletConfig);
        $.extend(Map, config.mapConfig);
        $.extend(GameScreen, config.screenConfig);
        $.extend(Game.prototype, config.gameConfig);
        $.extend(HealthPack, config.healthPackConfig);

        DeathScreen.RESPAWN_TIMER = config.gameConfig.RESPAWN_TIMER;

        ShipController.REQUEST_PING_EVERY = config.gameConfig.REQUEST_PING_EVERY;

        $.extend(this, config);
    }    
}

