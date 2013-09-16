using System;
using System.Collections.Generic;
using System.Diagnostics;
namespace ShootR
{
    /// <summary>
    /// Ship's Movement Controller.  Handles all of the movement.
    /// </summary>
    public class ShipMovementController : MovementController
    {
        public const double ROTATE_SPEED = 180;
        public const double MASS = 50;
        public const double ENGINE_POWER = 110000;
        public const double DRAG_COEFFICIENT = .2;
        public const double DRAG_AREA = 5;

        private Vector2 _acceleration = Vector2.Zero;

        public ShipMovementController(Vector2 position) :
            base(MASS, ENGINE_POWER)
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
            double velocityLength;

            _acceleration = Forces / Mass;

            Position += Velocity * percentOfSecond + _acceleration * percentOfSecond * percentOfSecond;
            Velocity += _acceleration * percentOfSecond;
            velocityLength = Velocity.Length();

            // Stop moving if the "speed" is less than 10
            if (velocityLength < 10)
            {
                Velocity = Vector2.Zero;
            }
            else if (velocityLength > 3000) // Hack
            {
                Velocity = new Vector2(Rotation) * 600;
            }

            _acceleration = new Vector2();
            Forces = new Vector2();

            Vector2 direction = new Vector2(Rotation),
                    dragForce = .5 * Velocity * Velocity.Abs() * DRAG_COEFFICIENT * DRAG_AREA * -1;

            if (Moving.Forward)
            {
                ApplyForce(direction * Power);
            }
            if (Moving.Backward)
            {
                ApplyForce(direction * Power * -1);
            }

            ApplyForce(dragForce);

            double rotationIncrementor = percentOfSecond * ROTATE_SPEED;

            if (Moving.RotatingLeft)
            {
                Rotation -= rotationIncrementor;
            }
            if (Moving.RotatingRight)
            {
                Rotation += rotationIncrementor;
            }
        }

        public void StopMovement()
        {
            FlagMovement(Movement.Forward, false);
            FlagMovement(Movement.Backward, false);
            FlagMovement(Movement.RotatingLeft, false);
            FlagMovement(Movement.RotatingRight, false);
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
            else if (where == Movement.RotatingRight)
            {
                Moving.RotatingRight = flag;
            }
            else if (where == Movement.Forward)
            {
                Moving.Forward = flag;
            }
            else if (where == Movement.Backward)
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

        public void Update(GameTime gameTime)
        {
            Update(gameTime.PercentOfSecond);
        }

        public override void Update(double PercentOfSecond)
        {
            base.Update(PercentOfSecond);
            Move(PercentOfSecond);
        }
    }
}