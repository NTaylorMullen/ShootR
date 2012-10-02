function PayloadDecompressor() {
    var that = this,
        PayloadContract,
        CollidableContract,
        ShipContract,
        BulletContract;

    that.LoadContracts = function (contracts) {
        PayloadContract = contracts.PayloadContract;
        CollidableContract = contracts.CollidableContract;
        ShipContract = contracts.ShipContract;
        BulletContract = contracts.BulletContract;
    }

    function DecompressCollidable(obj) {
        return {
            Collided: !!obj[CollidableContract.Collided],
            CollidedAt: {
                X: obj[CollidableContract.CollidedAtX],
                Y: obj[CollidableContract.CollidedAtY]
            },
            MovementController: {
                Forces: {
                    X: obj[CollidableContract.ForcesX],
                    Y: obj[CollidableContract.ForcesY]
                },
                Mass: obj[CollidableContract.Mass],
                Position: {
                    X: obj[CollidableContract.PositionX],
                    Y: obj[CollidableContract.PositionY]
                },
                Rotation: obj[CollidableContract.Rotation],
                Velocity: {
                    X: obj[CollidableContract.VelocityX],
                    Y: obj[CollidableContract.VelocityY]
                }
            },
            ID: obj[CollidableContract.ID],
            Disposed: !!obj[CollidableContract.Disposed],
            LastUpdated: GAME_GLOBALS.ClientServerTime.GetServerTime(new Date(obj[CollidableContract.LastUpdated]).getTime()) 
        };
    }

    function DecompressShip(ship) {
        var result = DecompressCollidable(ship);

        result.MovementController.Moving = {
            RotatingLeft: !!ship[ShipContract.RotatingLeft],
            RotatingRight: !!ship[ShipContract.RotatingRight],
            Forward: !!ship[ShipContract.Forward],
            Backward: !!ship[ShipContract.Backward]
        };
        result.Name = ship[ShipContract.Name];

        return result;
    }

    function DecompressBullet(bullet) {
        var result = DecompressCollidable(bullet);

        return result;
    }

    function DecompressPayload(data) {
        return {
            Ships: data[PayloadContract.Ships],
            Bullets: data[PayloadContract.Bullets],
            MovementReceivedAt: (data[PayloadContract.MovementReceivedAt] !== 0) ? GAME_GLOBALS.ClientServerTime.GetServerTime(new Date(data[PayloadContract.MovementReceivedAt]).getTime()) : false,
            ShipsInWorld: data[PayloadContract.ShipsInWorld],
            BulletsInWorld: data[PayloadContract.BulletsInWorld]
        };
    }

    that.Decompress = function (data) {
        var payload = DecompressPayload(data),
            shipCount = payload.Ships.length,
            bulletCount = payload.Bullets.length,
            i = 0;

        for (i = 0; i < shipCount; i++) {
            payload.Ships[i] = DecompressShip(payload.Ships[i]);
        }

        for (i = 0; i < bulletCount; i++) {
            payload.Bullets[i] = DecompressBullet(payload.Bullets[i]);
        }

        return payload;
    }
}