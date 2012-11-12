
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
        public PowerupCompressionContract PowerupCompressionContract = new PowerupCompressionContract();

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
            object[] result = new object[23];

            SetCollidableContractMembers(result, ship);

            result[ShipCompressionContract.RotatingLeft] = Convert.ToInt32(ship.MovementController.Moving.RotatingLeft);
            result[ShipCompressionContract.RotatingRight] = Convert.ToInt32(ship.MovementController.Moving.RotatingRight);
            result[ShipCompressionContract.Forward] = Convert.ToInt32(ship.MovementController.Moving.Forward);
            result[ShipCompressionContract.Backward] = Convert.ToInt32(ship.MovementController.Moving.Backward);
            result[ShipCompressionContract.Name] = ship.Name;
            result[ShipCompressionContract.MaxLife] = ship.LifeController.MaxLife;
            result[ShipCompressionContract.Level] = ship.LevelManager.Level;
            result[ShipCompressionContract.Boost] = Convert.ToInt32(ship.AbilityHandler.Ability(Boost.NAME).Active);

            return result;
        }

        public object[] Compress(Bullet bullet)
        {
            object[] result = new object[16];

            SetCollidableContractMembers(result, bullet);

            result[BulletCompressionContract.DamageDealt] = bullet.DamageDealt;

            return result;
        }

        public object[] Compress(Powerup powerup)
        {
            object[] result = new object[5];

            result[PowerupCompressionContract.PositionX] = Convert.ToInt32(powerup.MovementController.Position.X);
            result[PowerupCompressionContract.PositionY] = Convert.ToInt32(powerup.MovementController.Position.Y);
            result[PowerupCompressionContract.ID] = powerup.ID;
            result[PowerupCompressionContract.Disposed] = Convert.ToInt32(powerup.Disposed);
            result[PowerupCompressionContract.Type] = powerup.Type;

            return result;
        }

        public object[] Compress(Payload payload)
        {
            object[] result;
            if (payload.KilledByName != null)
            {
                result = new object[14];
                result[PayloadCompressionContract.KilledByName] = payload.KilledByName;
                result[PayloadCompressionContract.KilledByPhoto] = payload.KilledByPhoto;
            }
            else
            {
                result = new object[12];
            }
            result[PayloadCompressionContract.Ships] = payload.Ships;
            result[PayloadCompressionContract.LeaderboardPosition] = payload.LeaderboardPosition;
            result[PayloadCompressionContract.Powerups] = payload.Powerups;
            result[PayloadCompressionContract.Kills] = payload.Kills;
            result[PayloadCompressionContract.Deaths] = payload.Deaths;
            result[PayloadCompressionContract.Bullets] = payload.Bullets;
            result[PayloadCompressionContract.ShipsInWorld] = payload.ShipsInWorld;
            result[PayloadCompressionContract.BulletsInWorld] = payload.BulletsInWorld;
            result[PayloadCompressionContract.Experience] = payload.Experience;
            result[PayloadCompressionContract.ExperienceToNextLevel] = payload.ExperienceToNextLevel;
            result[PayloadCompressionContract.Notification] = payload.Notification;
            result[PayloadCompressionContract.LastCommandProcessed] = payload.LastCommandProcessed;

            

            return result;
        }

        public object[] Compress(LeaderboardEntry leaderboardEntry)
        {
            object[] result = new object[6];

            result[LeaderboardEntryCompressionContract.Name] = leaderboardEntry.Name;
            result[LeaderboardEntryCompressionContract.Photo] = leaderboardEntry.Photo;
            result[LeaderboardEntryCompressionContract.ID] = leaderboardEntry.ID;            
            result[LeaderboardEntryCompressionContract.Level] = leaderboardEntry.Level;
            result[LeaderboardEntryCompressionContract.Kills] = leaderboardEntry.Kills;
            result[LeaderboardEntryCompressionContract.Deaths] = leaderboardEntry.Deaths;
            /*result[LeaderboardEntryCompressionContract.DamageDealt] = leaderboardEntry.DamageDealt;
            result[LeaderboardEntryCompressionContract.DamageTaken] = leaderboardEntry.DamageTaken;
            result[LeaderboardEntryCompressionContract.KillDeathRatio] = Math.Round(leaderboardEntry.KillDeathRatio,2);*/

            return result;
        }
    }
}