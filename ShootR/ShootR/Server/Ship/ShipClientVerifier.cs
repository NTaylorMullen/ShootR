using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class ShipClientVerifier
    {
        // Ping Threshold is the max ping a client can show in their movement commands
        public static double PING_THRESHOLD = 750;
        public static double PING_FRACTION = PING_THRESHOLD / 1000;
        public static double MAX_ROTATE_DIFFERENCE = PING_FRACTION * ShipMovementController.ROTATE_SPEED;

        private ShipMovementController _movementController;

        public ShipClientVerifier(ShipMovementController movementController)
        {
            _movementController = movementController;
        }

        public void VerifyMovement(Vector2 at, double angle, Vector2 velocity)
        {
            if(Math.Abs(_movementController.Rotation - angle) < MAX_ROTATE_DIFFERENCE)
            {
                _movementController.Rotation = angle;
            }

            double maxDistanceDifference = (PING_FRACTION * _movementController.Velocity).Length();

            if(_movementController.Position.DistanceTo(at) < maxDistanceDifference)
            {
                _movementController.Position = at;
            }

            double movementVelocity = _movementController.Velocity.Length();

            if(movementVelocity == 0)
            {
                movementVelocity = 1;
            }

            if ((velocity.Length() / _movementController.Velocity.Length()) < 1.2)
            {
                _movementController.Velocity = velocity;
            }
        }
    }
}