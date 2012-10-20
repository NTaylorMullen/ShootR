using System;

namespace ShootR
{
    public class PayloadCompressor
    {
        public PayloadCompressionContract PayloadCompressionContract = new PayloadCompressionContract();
        public CollidableCompressionContract CollidableCompressionContract = new CollidableCompressionContract();
        public ShipCompressionContract ShipCompressionContract = new ShipCompressionContract();
        public BulletCompressionContract BulletCompressionContract = new BulletCompressionContract();
        public LeaderboardEntryCompressionContract LeaderboardEntryCompressionContract = new LeaderboardEntryCompressionContract();

        private void SetCollidableContractMembers(object[] result, Collidable obj)
        {
            result[CollidableCompressionContract.Collided] = Convert.ToInt32(obj.Collided);
            result[CollidableCompressionContract.CollidedAtX] = Math.Round(obj.CollidedAt.X, 2);
            result[CollidableCompressionContract.CollidedAtY] = Math.Round(obj.CollidedAt.Y, 2);
            result[CollidableCompressionContract.ForcesX] = Math.Round(obj.MovementController.Forces.X, 2);
            result[CollidableCompressionContract.ForcesY] = Math.Round(obj.MovementController.Forces.Y, 2);
            result[CollidableCompressionContract.Mass] = obj.MovementController.Mass;
            result[CollidableCompressionContract.PositionX] = Math.Round(obj.MovementController.Position.X, 2);
            result[CollidableCompressionContract.PositionY] = Math.Round(obj.MovementController.Position.Y, 2);
            result[CollidableCompressionContract.Rotation] = Math.Round(obj.MovementController.Rotation, 2);
            result[CollidableCompressionContract.VelocityX] = Math.Round(obj.MovementController.Velocity.X, 2);
            result[CollidableCompressionContract.VelocityY] = Math.Round(obj.MovementController.Velocity.Y, 2);
            result[CollidableCompressionContract.ID] = obj.ID;
            result[CollidableCompressionContract.Disposed] = Convert.ToInt32(obj.Disposed);
            result[CollidableCompressionContract.Alive] = Convert.ToInt32(obj.LifeController.Alive);
            result[CollidableCompressionContract.Health] = Math.Round(obj.LifeController.Health, 2);
        }

        public object[] Compress(Ship ship)
        {
            object[] result = new object[22];

            SetCollidableContractMembers(result, ship);

            result[ShipCompressionContract.RotatingLeft] = Convert.ToInt32(ship.MovementController.Moving.RotatingLeft);
            result[ShipCompressionContract.RotatingRight] = Convert.ToInt32(ship.MovementController.Moving.RotatingRight);
            result[ShipCompressionContract.Forward] = Convert.ToInt32(ship.MovementController.Moving.Forward);
            result[ShipCompressionContract.Backward] = Convert.ToInt32(ship.MovementController.Moving.Backward);
            result[ShipCompressionContract.Name] = ship.Name;
            result[ShipCompressionContract.MaxLife] = ship.LifeController.MaxLife;
            result[ShipCompressionContract.Level] = ship.LevelManager.Level;

            return result;
        }

        public object[] Compress(Bullet bullet)
        {
            object[] result = new object[16];

            SetCollidableContractMembers(result, bullet);

            result[BulletCompressionContract.DamageDealt] = bullet.DamageDealt;

            return result;
        }

        public object[] Compress(Payload payload)
        {
            object[] result = new object[9];
            result[PayloadCompressionContract.Ships] = payload.Ships;
            result[PayloadCompressionContract.LeaderboardPosition] = payload.LeaderboardPosition;
            result[PayloadCompressionContract.Bullets] = payload.Bullets;
            result[PayloadCompressionContract.ShipsInWorld] = payload.ShipsInWorld;
            result[PayloadCompressionContract.BulletsInWorld] = payload.BulletsInWorld;
            result[PayloadCompressionContract.Experience] = payload.Experience;
            result[PayloadCompressionContract.ExperienceToNextLevel] = payload.ExperienceToNextLevel;
            result[PayloadCompressionContract.Notification] = payload.Notification;
            result[PayloadCompressionContract.ID] = payload.ID;
            return result;
        }

        public object[] Compress(LeaderboardEntry leaderboardEntry)
        {
            object[] result = new object[7];

            result[LeaderboardEntryCompressionContract.Name] = leaderboardEntry.Name;
            result[LeaderboardEntryCompressionContract.Level] = leaderboardEntry.Level;
            result[LeaderboardEntryCompressionContract.Kills] = leaderboardEntry.Kills;
            result[LeaderboardEntryCompressionContract.Deaths] = leaderboardEntry.Deaths;
            result[LeaderboardEntryCompressionContract.DamageDealt] = leaderboardEntry.DamageDealt;
            result[LeaderboardEntryCompressionContract.DamageTaken] = leaderboardEntry.DamageTaken;
            result[LeaderboardEntryCompressionContract.KillDeathRatio] = Math.Round(leaderboardEntry.KillDeathRatio,2);

            return result;
        }
    }
}