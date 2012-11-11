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