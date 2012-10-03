using System;

namespace ShootR
{
    public class PayloadCompressor
    {
        public PayloadCompressionContract PayloadCompressionContract = new PayloadCompressionContract();
        public CollidableCompressionContract CollidableCompressionContract = new CollidableCompressionContract();
        public ShipCompressionContract ShipCompressionContract = new ShipCompressionContract();
        public BulletCompressionContract BulletCompressionContract = new BulletCompressionContract();

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
        }

        public object[] Compress(Ship ship)
        {
            object[] result = new object[19];

            SetCollidableContractMembers(result, ship);

            result[ShipCompressionContract.LastUpdated] = ship.LastUpdated.ToUniversalTime();
            result[ShipCompressionContract.RotatingLeft] = Convert.ToInt32(ship.MovementController.Moving.RotatingLeft);
            result[ShipCompressionContract.RotatingRight] = Convert.ToInt32(ship.MovementController.Moving.RotatingRight);
            result[ShipCompressionContract.Forward] = Convert.ToInt32(ship.MovementController.Moving.Forward);
            result[ShipCompressionContract.Backward] = Convert.ToInt32(ship.MovementController.Moving.Backward);
            result[ShipCompressionContract.Name] = ship.Name;

            return result;
        }

        public object[] Compress(Bullet bullet)
        {
            object[] result = new object[14];

            SetCollidableContractMembers(result, bullet);

            return result;
        }

        public object[] Compress(Payload payload)
        {
            object[] result = new object[6];
            result[PayloadCompressionContract.Ships] = payload.Ships;
            result[PayloadCompressionContract.Bullets] = payload.Bullets;

            if (payload.MovementReceivedAt.HasValue)
            {
                result[PayloadCompressionContract.MovementReceivedAt] = payload.MovementReceivedAt.Value.ToUniversalTime();
            }
            else
            {
                result[PayloadCompressionContract.MovementReceivedAt] = 0;
            }

            result[PayloadCompressionContract.ShipsInWorld] = payload.ShipsInWorld;
            result[PayloadCompressionContract.BulletsInWorld] = payload.BulletsInWorld;
            result[PayloadCompressionContract.SentAt] = payload.SentAt;
            return result;
        }
    }
}