namespace ShootR
{
    /// <summary>
    /// Ship's Movement Controller.  Handles all of the movement.
    /// </summary>
    public class ShipMovementController : MovementController
    {
        public const double ROTATE_SPEED = 180;
        public const double MASS = 50;
        public const double ENGINE_POWER = 100000;
        public const double DRAG_COEFFICIENT = .2;
        public const double DRAG_AREA = 5;

        public ShipMovementController(Vector2 position) :
            base(MASS)
        {
            Position = position;
            Moving = new MovementFlags();
        }

        public MovementFlags Moving { get; set; }

        /// <summary>
        /// Calculates how far to move based on the current movement.
        /// </summary>
        /// <param name="percentOfSecond">How much time, percentage wise, has passed since the last Update.</param>
        public override void Move(double percentOfSecond)
        {
            double rotationIncrementor = percentOfSecond * ROTATE_SPEED;
            Vector2 direction = new Vector2(Rotation),
                    dragForce = .5 * Velocity * Velocity.Abs() * DRAG_COEFFICIENT * DRAG_AREA * -1;

            if (Moving.RotatingLeft)
            {
                Rotation -= rotationIncrementor;
            }
            if (Moving.RotatingRight)
            {
                Rotation += rotationIncrementor;
            }
            if (Moving.Forward)
            {
                ApplyForce(direction * ENGINE_POWER);
            }
            if (Moving.Backward)
            {
                ApplyForce(direction * ENGINE_POWER * -1);
            }

            ApplyForce(dragForce);
        }

        /// <summary>
        /// Used to register a start or a stop of a movement in a given direction.
        /// </summary>
        /// <param name="where">Where the Ship is moving.</param>
        /// <param name="flag">Whether to start or stop moving in the <paramref name="where"/> direction.</param>
        private void FlagMovement(Movement where, bool flag)
        {
            if (where == Movement.RotatingLeft)
            {
                Moving.RotatingLeft = flag;
            }
            if (where == Movement.RotatingRight)
            {
                Moving.RotatingRight = flag;
            }
            if (where == Movement.Forward)
            {
                Moving.Forward = flag;
            }
            if (where == Movement.Backward)
            {
                Moving.Backward = flag;
            }
        }

        /// <summary>
        /// Starts the movement in the given direction <paramref name="where"/>.
        /// </summary>
        /// <param name="where">Where to start moving</param>
        public void StartMoving(Movement where)
        {
            FlagMovement(where, true);
        }

        /// <summary>
        /// Stops the movement in the given direction <paramref name="where"/>.
        /// </summary>
        /// <param name="where">Where to start moving</param>
        public void StopMoving(Movement where)
        {
            FlagMovement(where, false);
        }

        public override void Update(double PercentOfSecond)
        {
            base.Update(PercentOfSecond);
            Move(PercentOfSecond);            
        }
    }
}