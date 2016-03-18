/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ships/IMoving.ts" />

declare module ShootR.Server {

    export interface IMovementControllerData {
        Forces: eg.Vector2d;
        Mass: number;
        Rotation: number;
        Position: eg.Vector2d;
        Velocity: eg.Vector2d;
    }

    export interface IShipMovementControllerData extends IMovementControllerData {
        Moving: IMoving;
    }

    export interface ILifeControllerData {
        Alive: boolean;
        Health: number;
    }

    export interface ICollidableData {
        Collided: boolean;
        CollidedAt: eg.Vector2d;
        MovementController: IMovementControllerData;
        LifeController: ILifeControllerData;
        ID: number;
        Disposed: boolean;
    }

    export interface IAbilityData {
        Boost: boolean;
    }

    export interface IShipData extends ICollidableData {
        Name: string;
        MaxLife: number;
        Level: number;
        Abilities: IAbilityData;
        MovementController: IShipMovementControllerData;
        UserControlled?: boolean;
    }

    export interface IBulletData extends ICollidableData {
        DamageDealt: number;
    }

    export interface ILeaderboardEntryData {
        Name: string;
        Photo: string;
        ID: number;
        Level: number;
        Kills: number;
        Deaths: number;
        Position: number;
    }

    export interface IPowerupMovementControllerData {
        Position: eg.Vector2d;
        Rotation: number;
    }

    export interface IPowerupData {
        MovementController: IPowerupMovementControllerData;
        ID: number;
        Disposed: boolean;
        Type: number;
        LifeController: ILifeControllerData;
    }

    export interface IPayloadData {
        Ships: Array<IShipData>;
        Powerups: Array<IPowerupData>;
        Bullets: Array<IBulletData>;
        LeaderboardPosition: number;
        Kills: number;
        Deaths: number;
        ShipsInWorld: number;
        BulletsInWorld: number;
        Experience: number;
        ExperienceToNextLevel: number;
        Notification: any;
        KilledByName: any;
        KilledByPhoto: any;
    }
}