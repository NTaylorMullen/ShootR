using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class MovementController
    {
        private Vector2 _acceleration;

        public MovementController(double mass)
        {
            _acceleration = new Vector2();
            Forces = new Vector2();
            Mass = mass;
            Position = new Vector2();
            Rotation = 0;
            Velocity = new Vector2();
            RotateSpeed = 0;
            MaxSpeed = 0;
            Moving = true;
        }

        public MovementController(Vector2 position, double mass)
            : this(mass)
        {
            Position = position;
        }
        
        public Vector2 Forces { get; set; }
        public double Mass { get; set; }
        public Vector2 Position { get; set; }
        public double Rotation { get; set; }
        public Vector2 Velocity { get; set; }
        public bool Moving { get; set; }
        public double MaxSpeed { get; set; }
        public double RotateSpeed { get; set; }

        public void ApplyForce(Vector2 force)
        {
            Forces += force;
        }

        public void Accelerate(Vector2 acceleration)
        {
            _acceleration += acceleration;
        }

        public void RepositionInBounds(int objectWidth, int objectHeight)
        {
            // Re-position to be in-bounds
            if (Position.X < 0)
            {
                Position.X = 0;
            }
            else if (Position.X + objectWidth > Map.WIDTH)
            {
                Position.X = Map.WIDTH - objectWidth;
            }

            if (Position.Y < 0)
            {
                Position.Y = 0;
            }
            else if (Position.Y + objectHeight > Map.HEIGHT)
            {
                Position.Y = Map.HEIGHT - objectHeight;
            }
        }

        public virtual void Move(double percentOfSecond)
        {
        }

        public virtual void Update(GameTime gameTime)
        {
            if (Moving)
            {
                double PercentOfSecond = gameTime.PercentOfSecond;
                _acceleration += Forces / Mass;
                Position += Velocity * PercentOfSecond + _acceleration * PercentOfSecond * PercentOfSecond;
                Velocity += _acceleration * PercentOfSecond;

                _acceleration = new Vector2();
                Forces = new Vector2();
            }
        }
    }
}