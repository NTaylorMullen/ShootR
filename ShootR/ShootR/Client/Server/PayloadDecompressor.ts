/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ships/IMoving.ts" />
/// <reference path="IPayloadDefinitions.ts" />
/// <reference path="../Ships/Ship.ts" />
/// <reference path="../Powerups/HealthPack.ts" />

module ShootR.Server {

    export class PayloadDecompressor {
        public PayloadContract: any;
        public CollidableContract: any;
        public ShipContract: any;
        public BulletContract: any;
        public LeaderboardEntryContract: any;
        public PowerupContract: any;

        constructor(contracts: any) {
            this.PayloadContract = contracts.PayloadContract;
            this.CollidableContract = contracts.CollidableContract;
            this.ShipContract = contracts.ShipContract;
            this.BulletContract = contracts.BulletContract;
            this.LeaderboardEntryContract = contracts.LeaderboardEntryContract;
            this.PowerupContract = contracts.PowerupContract;
        }

        private DecompressCollidable(obj: any[]): ICollidableData {
            return {
                Collided: !!obj[this.CollidableContract.Collided],
                CollidedAt: new eg.Vector2d(obj[this.CollidableContract.CollidedAtX], obj[this.CollidableContract.CollidedAtY]),
                MovementController: {
                    Forces: new eg.Vector2d(obj[this.CollidableContract.ForcesX], obj[this.CollidableContract.ForcesY]),
                    Mass: obj[this.CollidableContract.Mass],
                    Position: new eg.Vector2d(obj[this.CollidableContract.PositionX], obj[this.CollidableContract.PositionY]),
                    Rotation: obj[this.CollidableContract.Rotation] * .0174532925,
                    Velocity: new eg.Vector2d(obj[this.CollidableContract.VelocityX], obj[this.CollidableContract.VelocityY])
                },
                LifeController: {
                    Alive: obj[this.CollidableContract.Alive],
                    Health: obj[this.CollidableContract.Health]
                },
                ID: obj[this.CollidableContract.ID],
                Disposed: !!obj[this.CollidableContract.Disposed]
            };
        }

        private DecompressShip(ship: any): IShipData {
            var result: IShipData = <IShipData>this.DecompressCollidable(ship);

            result.MovementController.Position = result.MovementController.Position.Add(Ship.SIZE.Multiply(.5));

            result.MovementController.Moving = {
                RotatingLeft: !!ship[this.ShipContract.RotatingLeft],
                RotatingRight: !!ship[this.ShipContract.RotatingRight],
                Forward: !!ship[this.ShipContract.Forward],
                Backward: !!ship[this.ShipContract.Backward]
            };

            result.Name = ship[this.ShipContract.Name];
            result.MaxLife = ship[this.ShipContract.MaxLife];
            result.Level = ship[this.ShipContract.Level];
            result.Abilities = {
                Boost: ship[this.ShipContract.Boost]
            };

            return result;
        }

        private DecompressBullet(bullet: any): IBulletData {
            var result: IBulletData = <IBulletData>this.DecompressCollidable(bullet);

            result.DamageDealt = bullet[this.BulletContract.DamageDealt];

            return result;
        }

        private DecompressLeaderboardEntry(data: any): ILeaderboardEntryData {
            return {
                Name: data[this.LeaderboardEntryContract.Name],
                Photo: data[this.LeaderboardEntryContract.Photo],
                ID: data[this.LeaderboardEntryContract.ID],
                Level: data[this.LeaderboardEntryContract.Level],
                Kills: data[this.LeaderboardEntryContract.Kills],
                Deaths: data[this.LeaderboardEntryContract.Deaths],
                Position: 0
            };
        }

        private DecompressPowerup(data: any): IPowerupData {
            return {
                MovementController: {
                    Position: new eg.Vector2d(data[this.PowerupContract.PositionX] + HealthPack.SIZE.HalfWidth, data[this.PowerupContract.PositionY] + HealthPack.SIZE.HalfHeight),
                    Rotation: 0
                },
                ID: data[this.PowerupContract.ID],
                Disposed: data[this.PowerupContract.Disposed],
                Type: data[this.PowerupContract.Type],
                LifeController: {
                    Alive: true,
                    Health: 0
                }
            };
        }

        public DecompressPayload(data: any): IPayloadData {
            return {
                Ships: data[this.PayloadContract.Ships],
                LeaderboardPosition: data[this.PayloadContract.LeaderboardPosition],
                Kills: data[this.PayloadContract.Kills],
                Deaths: data[this.PayloadContract.Deaths],
                Powerups: data[this.PayloadContract.Powerups],
                Bullets: data[this.PayloadContract.Bullets],
                ShipsInWorld: data[this.PayloadContract.ShipsInWorld],
                BulletsInWorld: data[this.PayloadContract.BulletsInWorld],
                Experience: data[this.PayloadContract.Experience],
                ExperienceToNextLevel: data[this.PayloadContract.ExperienceToNextLevel],
                Notification: data[this.PayloadContract.Notification],
                LastCommandProcessed: data[this.PayloadContract.LastCommandProcessed],
                KilledByName: data[this.PayloadContract.KilledByName],
                KilledByPhoto: data[this.PayloadContract.KilledByPhoto]
            };
        }

        public DecompressLeaderboard(data: any): ILeaderboardEntryData[] {
            var payload: ILeaderboardEntryData[] = [];

            for (var i = 0; i < data.length; i++) {
                var item = this.DecompressLeaderboardEntry(data[i]);
                item.Position = i + 1;

                payload.push(item);
            }

            return payload;
        }        

        public Decompress(data: any): IPayloadData {
            var payload: IPayloadData = this.DecompressPayload(data),
                i: number = 0;

            for (i = 0; i < payload.Ships.length; i++) {
                payload.Ships[i] = this.DecompressShip(payload.Ships[i]);
            }

            for (i = 0; i < payload.Bullets.length; i++) {
                payload.Bullets[i] = this.DecompressBullet(payload.Bullets[i]);
            }

            for (i = 0; i < payload.Powerups.length; i++) {
                payload.Powerups[i] = this.DecompressPowerup(payload.Powerups[i]);
            }

            return payload;
        }
    }

}