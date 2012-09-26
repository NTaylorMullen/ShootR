using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class PayloadCompressor
    {
        public CollidableCompressionContract CollidableCompressionContract = new CollidableCompressionContract();
        public ShipCompressionContract ShipCompressionContract = new ShipCompressionContract();
        public BulletCompressionContract BulletCompressionContract = new BulletCompressionContract();

        private void SetCollidableContractMembers(double[] numberList, Collidable obj)
        {
            numberList[CollidableCompressionContract.Collided] = Convert.ToInt32(obj.Collided);
            numberList[CollidableCompressionContract.CollidedAtX] = Math.Round(obj.CollidedAt.X, 2);
            numberList[CollidableCompressionContract.CollidedAtY] = Math.Round(obj.CollidedAt.Y, 2);
            numberList[CollidableCompressionContract.ForcesX] = Math.Round(obj.MovementController.Forces.X, 2);
            numberList[CollidableCompressionContract.ForcesY] = Math.Round(obj.MovementController.Forces.Y, 2);
            numberList[CollidableCompressionContract.Mass] = obj.MovementController.Mass;
            numberList[CollidableCompressionContract.PositionX] = Math.Round(obj.MovementController.Position.X, 2);
            numberList[CollidableCompressionContract.PositionY] = Math.Round(obj.MovementController.Position.Y, 2);
            numberList[CollidableCompressionContract.Rotation] = Math.Round(obj.MovementController.Rotation, 2);
            numberList[CollidableCompressionContract.VelocityX] = Math.Round(obj.MovementController.Velocity.X, 2);
            numberList[CollidableCompressionContract.VelocityY] = Math.Round(obj.MovementController.Velocity.Y, 2);
        }

        public object Compress(Ship ship)
        {
            double[] numberList = new double[15];
            string[] stringList = new string[1];

            SetCollidableContractMembers(numberList, ship);

            numberList[ShipCompressionContract.RotatingLeft] = Convert.ToInt32(ship.MovementController.Moving.RotatingLeft);
            numberList[ShipCompressionContract.RotatingRight] = Convert.ToInt32(ship.MovementController.Moving.RotatingRight);
            numberList[ShipCompressionContract.Forward] = Convert.ToInt32(ship.MovementController.Moving.Forward);
            numberList[ShipCompressionContract.Backward] = Convert.ToInt32(ship.MovementController.Moving.Backward);
            stringList[ShipCompressionContract.Name] = ship.Name;

            return new
            {
                n = numberList,
                s = stringList
            };
        }

        public object Compress(Bullet bullet)
        {
            double[] numberList = new double[15];
            string[] stringList = new string[1];

            SetCollidableContractMembers(numberList, bullet);

            stringList[BulletCompressionContract.ID] = bullet.ID.ToString();

            return new
            {
                n = numberList,
                s = stringList
            };
        }
    }
}