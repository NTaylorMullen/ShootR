using System;
using System.Diagnostics;

namespace ShootR
{
    public class BulletMovementController : MovementController
    {
        public const double MAX_SPEED = 1100;
        public const double MASS = 800;

        public BulletMovementController(Vector2 position, Vector2 direction, double rotation)
            : base(MASS)
        {
            Position = position;
            Velocity = direction * MAX_SPEED;
            Rotation = rotation;
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