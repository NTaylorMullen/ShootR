class PayloadDecompressor {
    public PayloadContract: any;
    public CollidableContract: any;
    public ShipContract: any;
    public BulletContract: any;
    public LeaderboardEntryContract: any;
    public PowerupContract: any;

    constructor () { }    

    private DecompressCollidable(obj: any): any {
        return {
            Collided: !!obj[this.CollidableContract.Collided],
            CollidedAt: {
                X: obj[this.CollidableContract.CollidedAtX],
                Y: obj[this.CollidableContract.CollidedAtY]
            },
            MovementController: {
                Forces: {
                    X: obj[this.CollidableContract.ForcesX],
                    Y: obj[this.CollidableContract.ForcesY]
                },
                Mass: obj[this.CollidableContract.Mass],
                Position: {
                    X: obj[this.CollidableContract.PositionX],
                    Y: obj[this.CollidableContract.PositionY]
                },
                Rotation: obj[this.CollidableContract.Rotation],
                Velocity: {
                    X: obj[this.CollidableContract.VelocityX],
                    Y: obj[this.CollidableContract.VelocityY]
                }
            },
            LifeController: {
                Alive: obj[this.CollidableContract.Alive],
                Health: obj[this.CollidableContract.Health]
            },
            ID: obj[this.CollidableContract.ID],
            Disposed: !!obj[this.CollidableContract.Disposed]
        };
    }

    private DecompressShip(ship: any): any {
        var result = this.DecompressCollidable(ship);

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

    private DecompressBullet(bullet: any): any {
        var result = this.DecompressCollidable(bullet);

        result.DamageDealt = bullet[this.BulletContract.DamageDealt];

        return result;
    }

    public DecompressPayload(data: any): any {
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

    private DecompressLeaderboardEntry(data: any): any {
        return {
            Name: data[this.LeaderboardEntryContract.Name],
            Photo: data[this.LeaderboardEntryContract.Photo],
            ID: data[this.LeaderboardEntryContract.ID],
            Level: data[this.LeaderboardEntryContract.Level],
            Kills: data[this.LeaderboardEntryContract.Kills],
            Deaths: data[this.LeaderboardEntryContract.Deaths]                     
        };
    }

    private DecompressPowerup(data: any): any {
        return {
            MovementController: {
                Position: {
                    X: data[this.PowerupContract.PositionX],
                    Y: data[this.PowerupContract.PositionY]
                },
                Rotation: 0
            },
            ID: data[this.PowerupContract.ID],
            Disposed: data[this.PowerupContract.Disposed],
            Type: data[this.PowerupContract.Type],
            LifeController: {
                Alive: true
            }
        };
    }

    public DecompressLeaderboard (data: any): any {
        var payload = [],
            leaderboardEntryCount = data.length;

        for (var i = 0; i < leaderboardEntryCount; i++) {
            var item = this.DecompressLeaderboardEntry(data[i]);
            item.Position = i + 1;

            payload.push(item);
        }

        return payload;
    }

    public LoadContracts (contracts: any): void {
        this.PayloadContract = contracts.PayloadContract;
        this.CollidableContract = contracts.CollidableContract;
        this.ShipContract = contracts.ShipContract;
        this.BulletContract = contracts.BulletContract;
        this.LeaderboardEntryContract = contracts.LeaderboardEntryContract;
        this.PowerupContract = contracts.PowerupContract;
    }

    public Decompress (data: any): any {
        var payload = this.DecompressPayload(data),
            shipCount = payload.Ships.length,
            bulletCount = payload.Bullets.length,
            powerupCount = payload.Powerups.length,
            i = 0;

        for (i = 0; i < shipCount; i++) {
            payload.Ships[i] = this.DecompressShip(payload.Ships[i]);
        }

        for (i = 0; i < bulletCount; i++) {
            payload.Bullets[i] = this.DecompressBullet(payload.Bullets[i]);
        }

        for (i = 0; i < powerupCount; i++) {
            payload.Powerups[i] = this.DecompressPowerup(payload.Powerups[i]);
        }

        return payload;
    }
}