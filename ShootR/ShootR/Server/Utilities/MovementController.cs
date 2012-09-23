using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class MovementController
    {
        public MovementController(double mass)
        {
            Acceleration = new Vector2();
            Forces = new Vector2();
            Mass = mass;
            Position = new Vector2();
            Rotation = 0;
            Velocity = new Vector2();
            RotateSpeed = 0;
            MaxSpeed = 0;
        }

        public MovementController(Vector2 position, double mass)
            : this(mass)
        {
            Position = position;
        }

        public Vector2 Acceleration { get; set; }
        public Vector2 Forces { get; set; }
        public double Mass { get; set; }
        public Vector2 Position { get; set; }
        public double Rotation { get; set; }
        public Vector2 Velocity { get; set; }

        public double MaxSpeed { get; set; }
        public double RotateSpeed { get; set; }

        public void ApplyForce(Vector2 force)
        {
            Forces += force;
        }

        public void Accelerate(Vector2 acceleration)
        {
            Acceleration += acceleration;
        }

        public virtual void Move(double percentOfSecond)
        {
        }

        public virtual void Update(GameTime gameTime)
        {
            double PercentOfSecond = gameTime.PercentOfSecond;
            Acceleration += Forces / Mass;
            Position += Velocity * PercentOfSecond + Acceleration * PercentOfSecond * PercentOfSecond;
            Velocity += Acceleration * PercentOfSecond;

            Acceleration = new Vector2();
            Forces = new Vector2();
        }
    }
}