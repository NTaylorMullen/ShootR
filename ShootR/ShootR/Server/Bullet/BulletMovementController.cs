using System;

namespace ShootR
{
    public class BulletMovementController : MovementController
    {
        public const double MAX_SPEED = 300;
        public const double MASS = 800;

        public BulletMovementController(Vector2 position, Vector2 direction, Vector2 initialVelocity)
            : base(MASS)
        {
            Position = position;
            Velocity = direction * MAX_SPEED + initialVelocity;
            Rotation = Math.Atan(direction.Y / direction.X) * 180 / Math.PI;
        }

        public override void Move(double percentOfSecond)
        {
            var incrementor = Velocity * percentOfSecond;

            Position += incrementor;
        }

        public override void Update(double PercentOfSecond)
        {
            Move(PercentOfSecond);
        }
    }
}