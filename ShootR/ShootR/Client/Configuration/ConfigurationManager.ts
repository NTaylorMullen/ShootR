/// <reference path="../Ship/ShipController.ts" />
/// <reference path="../Bullet/Bullet.ts" />
/// <reference path="../HUD/Leaderboard.ts" />
/// <reference path="../HUD/DeathScreen.ts" />
/// <reference path="../Space/Camera.ts" />
/// <reference path="../Space/GameScreen.ts" />
/// <reference path="../Powerups/HealthPack.ts" />
/// <reference path="../Game.ts" />
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

/***** INTERFACES *****/
interface BulletConfiguration {
    BULLET_LEAD: number;
    SPEED: number;
    HEIGHT: number;
    WIDTH: number;
}

interface GameConfiguration {
    DRAW_INTERVAL: number;
    UPDATE_INTERVAL: number;
    LEADERBOARD_PUSH_INTERVAL: number;
    REQUEST_PING_EVERY: number;
    RESPAWN_TIMER: number;
    BULLET_DIE_AFTER: number;
}

interface ShipConfiguration {
    ENERGY_TO_FIRE: number;
    ENERGY_RECHARGE_RATE: number;
    MIN_FIRE_RATE: number;
    START_LIFE: number;
    DAMAGE_INCREASE_RATE: number;
    HEIGHT: number;
    WIDTH: number;
}
    
interface MapConfiguration {
    BARRIER_DEPRECATION: number;
    HEIGHT: number;
    WIDTH: number;
}

interface ScreenConfiguration {
    SCREEN_BUFFER_AREA: number;
    MAX_SCREEN_WIDTH: number;
    MAX_SCREEN_HEIGHT: number;
    MIN_SCREEN_WIDTH: number;
    MIN_SCREEN_HEIGHT: number;
}

interface LeaderboardConfiguration {
    LEADERBOARD_SIZE: number;
}

interface HealthPackConfiguration {
    LIFE_SPAN: number;
    HEIGHT: number;
    WIDTH: number;
}
    
interface AbilityConfiguration {
    BOOST_SPEED_INCREASE: number;
    BOOST_DURATION: number;
}

interface ShipMovementControllerConfig {
    DRAG_AREA: number;
    DRAG_COEFFICIENT: number;
    ENGINE_POWER: number;
    ROTATE_SPEED: number;
    MASS: number;
}