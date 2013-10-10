using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using ShootR.Server.Tweening;

namespace ShootR
{
    public class ShipInterpolationManager
    {
        // Ping Threshold is the max ping a client can show in their movement commands
        public static double PING_THRESHOLD = 750;
        public static double PING_FRACTION = PING_THRESHOLD / 1000;
        public static double MAX_ROTATE_DIFFERENCE = PING_FRACTION * ShipMovementController.ROTATE_SPEED;

        private Vector2Tween _positionTween;
        private NumberTween _rotationTween;
        private ShipMovementController _movementController;
        private int _tweensComplete;
        private object _lock;
        private Action _onComplete;

        public ShipInterpolationManager(ShipMovementController movementController)
        {
            _movementController = movementController;
            _positionTween = new Vector2Tween(Vector2.Zero, Vector2.Zero, 1);
            _rotationTween = new NumberTween(0, 0, 1);
            _tweensComplete = 0;
            _lock = new object();
            _onComplete = () =>
            {
                lock (_lock)
                {
                    if (++_tweensComplete % 2 == 0)
                    {
                        Interpolating = false;
                        _tweensComplete = 0;
                    }
                }
            };

            _positionTween.OnComplete += (_) =>
            {
                _onComplete();
            };

            _rotationTween.OnComplete += (_) =>
            {
                _onComplete();
            };

            _positionTween.OnChange += (newPosition) =>
            {
                _movementController.Position = newPosition;
            };

            _rotationTween.OnChange += (newRotation) =>
            {
                _movementController.Rotation = newRotation;
            };
        }

        public bool Interpolating { get; private set; }

        public void Update(GameTime gameTime)
        {
            lock (_lock)
            {
                _positionTween.Update(gameTime);
                _rotationTween.Update(gameTime);
            }
        }

        public void SyncMovement(Vector2 at, double angle, Vector2 velocity)
        {
            lock (_lock)
            {
                Interpolating = true;
                _tweensComplete = 0;

                _movementController.Velocity = velocity;

                _rotationTween.From = _movementController.Rotation;
                _rotationTween.To = angle;
                _rotationTween.Duration = _rotationTween.DurationFromSpeed(ShipMovementController.ROTATE_SPEED);
                _rotationTween.Restart();

                _positionTween.From = _movementController.Position;
                _positionTween.To = at;
                _positionTween.Duration = _positionTween.DurationFromSpeed(900);
                _positionTween.Restart();
            }
        }
    }
}