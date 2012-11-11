/// <reference path="IMoving.d.ts" />
/// <reference path="../Utilities/Vector2.ts" />

interface IMovementControllerData {
    Forces: Vector2;
    Mass: number;
    Rotation: number;
    Position: Vector2;
    Velocity: Vector2;
}

interface IShipMovementControllerData extends IMovementControllerData {
    Moving: IMoving;
}

interface ILifeControllerData {
    Alive: bool;
    Health: number;
}

interface ICollidableData {
    Collided: bool;
    CollidedAt: Vector2;
    MovementController: IMovementControllerData;
    LifeController: ILifeControllerData;
    ID: number;
    Disposed: bool;
}

interface IAbilityData {
    Boost: bool;
}

interface IShipData extends ICollidableData {
    Name: string;
    MaxLife: number;
    Level: number;
    Abilities: IAbilityData;
    MovementController: IShipMovementControllerData;
}

interface IBulletData extends ICollidableData {
    DamageDealt: number;
}

interface ILeaderboardEntryData {
    Name: string;
    Photo: string;
    ID: number;
    Level: number;
    Kills: number;
    Deaths: number;
    Position: number;
}

interface IPowerupMovementControllerData {
    Position: Vector2;
    Rotation: number;
}

interface IPowerupData {
    MovementController: IPowerupMovementControllerData;
    ID: number;
    Disposed: bool;
    Type: number;
    LifeController: ILifeControllerData;
}

interface IPayloadData {
    Ships: IShipData[];
    Powerups: IPowerupData[];
    Bullets: IBulletData[];
    LeaderboardPosition: ILeaderboardEntryData;
    Kills: number;
    Deaths: number;
    ShipsInWorld: number;
    BulletsInWorld: number;
    Experience: number;
    ExperienceToNextLevel: number;
    Notification: any;
    LastCommandProcessed: number;
    KilledByName: any;
    KilledByPhoto: any;
}