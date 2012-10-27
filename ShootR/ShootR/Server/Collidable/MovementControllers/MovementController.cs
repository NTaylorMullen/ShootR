using System;
namespace ShootR
{
    public class MovementController
    {
        public MovementController(double mass, double power)
        {
            Forces = new Vector2();
            Mass = mass;
            Power = power;
            Position = new Vector2();
            Rotation = 0;
            Velocity = new Vector2();
        }

        public MovementController(Vector2 position, double mass, double power)
            : this(mass, power)
        {
            Position = position;
        }

        public double Power { get; set; }
        public Vector2 Forces { get; set; }
        public double Mass { get; set; }
        public Vector2 Position { get; set; }
        public double Rotation { get; set; }
        public Vector2 Velocity { get; set; }

        public void ApplyForce(Vector2 force)
        {
            Forces += force;
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

        public virtual void Update(double PercentOfSecond)
        {            
        }
    }
}