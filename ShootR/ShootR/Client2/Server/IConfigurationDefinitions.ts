module ShootR.Server {

    export interface IBulletConfiguration {
        BULLET_LEAD: number;
        SPEED: number;
        WIDTH: number;
        HEIGHT: number;
    }

    export interface IShipConfiguration {
        WIDTH: number;
        HEIGHT: number;
        ENERGY_TO_FIRE: number;
        ENERGY_RECHARGE_RATE: number;
        MIN_FIRE_RATE: number;
        START_LIFE: number;
        DAMAGE_INCREASE_RATE: number;
    }

    export interface IShipMovementControllerConfiguration {
        ROTATE_SPEED: number;
        DRAG_AREA: number;
        DRAG_COEFFICIENT: number;
        ENGINE_POWER: number;
        MASS: number;
    }

    export interface IGameConfiguration {
        DRAW_INTERVAL: number;
        UPDATE_INTERVAL: number;
        LEADERBOARD_PUSH_INTERVAL: number;
        REQUEST_PING_EVERY: number;
        RESPAWN_TIMER: number;
        BULLET_DIE_AFTER: number
    }

    export interface IMapConfiguration {
        WIDTH: number;
        HEIGHT: number;
        BARRIER_DEPRECATION: number
    }

    export interface IScreenConfiguration {
        SCREEN_BUFFER_AREA: number;
        MAX_SCREEN_WIDTH: number;
        MAX_SCREEN_HEIGHT: number;
        MIN_SCREEN_WIDTH: number;
        MIN_SCREEN_HEIGHT: number;
    }

    export interface ILeaderboardConfiguration {
        LEADERBOARD_SIZE: number;
    }

    export interface IHealthPackConfiguration {
        WIDTH: number;
        HEIGHT: number;
        LIFE_SPAN: number;
    }

    export interface IAbilityConfiguration {
        BOOST_SPEED_INCREASE: number;
        BOOST_DURATION: number;
    }

    export interface IConfigurationManager {
        bulletConfig: IBulletConfiguration;
        gameConfig: IGameConfiguration;
        shipConfig: IShipConfiguration;
        mapConfig: IMapConfiguration;
        screenConfig: IScreenConfiguration;
        leaderboardConfig: ILeaderboardConfiguration;
        healthPackConfig: IHealthPackConfiguration;
        abilityConfig: IAbilityConfiguration;
        shipMovementControllerConfig: IShipMovementControllerConfiguration;
    }    

}