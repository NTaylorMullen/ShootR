function PayloadManager() {
    var that = this;
    var CollidableContract;
    var ShipContract;
    var BulletContract;

    function DecompressCollidable(obj) {
        return {
            Collided: obj.n[CollidableContract.Collided],
            CollidedAt: {
                X: obj.n[CollidableContract.CollidedAtX],
                Y: obj.n[CollidableContract.CollidedAtY]
            },
            MovementController: {
                Forces: {
                    X: obj.n[CollidableContract.ForcesX],
                    Y: obj.n[CollidableContract.ForcesY]
                },
                Mass: obj.n[CollidableContract.Mass],
                Position: {
                    X: obj.n[CollidableContract.PositionX],
                    Y: obj.n[CollidableContract.PositionY]
                },
                Rotation: obj.n[CollidableContract.Rotation],
                Velocity: {
                    X: obj.n[CollidableContract.VelocityX],
                    Y: obj.n[CollidableContract.VelocityY]
                }
            }
        };
    }

    that.LoadContracts = function (contracts) {
        CollidableContract = contracts.CollidableContract;
        ShipContract = contracts.ShipContract;
        BulletContract = contracts.BulletContract;
    }

    that.DecompressShip = function (ship) {
        var result = DecompressCollidable(ship);

        result.MovementController.Moving = {
            RotatingLeft: !!ship.n[ShipContract.RotatingLeft],
            RotatingRight: !!ship.n[ShipContract.RotatingRight],
            Forward: !!ship.n[ShipContract.Forward],
            Backward: !!ship.n[ShipContract.Backward]
        };
        result.Name = ship.s[ShipContract.Name];

        return result;
    }

    that.DecompressBullet = function (bullet) {
        var result = DecompressCollidable(bullet);

        result.ID = bullet.s[BulletContract.ID];

        return result;
    }
}