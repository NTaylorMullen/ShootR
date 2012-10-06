namespace ShootR
{
    public class MovementController
    {
        private Vector2 _acceleration;
        private bool _moving;

        public MovementController(double mass)
        {
            _acceleration = new Vector2();
            Forces = new Vector2();
            Mass = mass;
            Position = new Vector2();
            Rotation = 0;
            Velocity = new Vector2();
            _moving = true;
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

        public bool IsMoving()
        {
            return _moving;
        }

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

        public virtual void Update(double PercentOfSecond)
        {
            if (_moving)
            {
                _acceleration += Forces / Mass;
                Position += Velocity * PercentOfSecond + _acceleration * PercentOfSecond * PercentOfSecond;
                Velocity += _acceleration * PercentOfSecond;

                // Stop moving if the "speed" is less than 10
                if (Velocity.Length() < 10)
                {
                    Velocity = Vector2.Zero;
                }

                _acceleration = new Vector2();
                Forces = new Vector2();
            }
        }
    }
}