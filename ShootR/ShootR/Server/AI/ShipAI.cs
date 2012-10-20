using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class ShipAI : Ship
    {
        public const int KILL_DISTANCE = 500;
        public const int DISTANCE_AWAY_FROM_BOUNDARY = 400;
        public const int ROTATION_BUFFER = 20;
        public const int TIME_TO_WAIT_AFTER_BOUNDARY_LEAVE = 1000;

        private List<dynamic> _shipsOnScreen;
        private AIState _state;
        private int _seekingShip = -1;
        private double _targetRotation = -1;
        private double _currentRotation = 0;
        private static Random _gen = new Random();

        private DateTime _lastBoundaryRedirection = DateTime.UtcNow;

        public ShipAI(Vector2 position, BulletManager bulletManager)
            : base(position, bulletManager)
        {
            _state = AIState.Wandering;
            MovementController.Rotation = _gen.Next(0, 360);
        }

        public override void StartMoving(Movement where, long commandID)
        {
            Host.IdleManager.RecordActivity();
            MovementController.StartMoving(where);
        }

        public override void StopMoving(Movement where, long commandID)
        {
            Host.IdleManager.RecordActivity();
            MovementController.StopMoving(where);
        }

        public void LoadShipsOnScreen(List<dynamic> shipList)
        {
            _shipsOnScreen = shipList;
        }

        public void ChangeState(AIState state)
        {
            _state = state;
        }

        public void StartWandering()
        {
            ChangeState(AIState.Wandering);
            _seekingShip = -1;
        }

        public void SeekClosestShip()
        {
            int closestID = -1;
            double dist = 0, closestDistance = 100000;

            foreach (dynamic ship in _shipsOnScreen)
            {
                dist = DistanceFrom(Convert.ToInt32(ship.MovementController.Position.X), Convert.ToInt32(ship.MovementController.Position.Y));
                if (dist < closestDistance)
                {
                    closestID = ship.ID;
                    closestDistance = dist;
                }
            }

            if (closestID == -1) // There's no ship to seek, go to wandering
            {
                StartWandering();
            }
            else
            {
                _seekingShip = closestID;
                ChangeState(AIState.Seeking);
            }
        }

        public void TryAndKillSeekingShip()
        {
            foreach (dynamic ship in _shipsOnScreen)
            {
                // Check if we've found our ship
                if (_seekingShip == ship.ID)
                {
                    if (DistanceFrom(Convert.ToInt32(ship.MovementController.Position.X), Convert.ToInt32(ship.MovementController.Position.Y)) <= KILL_DISTANCE)
                    {
                        ChangeState(AIState.Killing);
                    }
                    return;
                }
            }

            // The Seeking ship is no longer on the screen
            StartWandering();
        }

        public void VerifySeekIsOnScreen()
        {
            foreach (dynamic ship in _shipsOnScreen)
            {
                // Check if we've found our ship
                if (_seekingShip == ship.ID)
                {
                    // Ship is still on screen
                    return;
                }
            }

            // Ship is no longer on screen
            StartWandering();
        }

        public void CheckCurrentState()
        {
            // We're either seeking or killing
            if (_shipsOnScreen != null && _shipsOnScreen.Count > 0)
            {
                // We're not seeking
                if (_seekingShip == -1)
                {
                    SeekClosestShip();
                    return;
                }
                else if (_seekingShip != -1) // We're seeking or killing a ship
                {
                    // Currently seeking, need to check if we need to Kill
                    if (_state == AIState.Seeking)
                    {
                        TryAndKillSeekingShip();
                    }
                    else if (_state == AIState.Killing)
                    {
                        VerifySeekIsOnScreen();
                    }

                    return;
                }
            }

            StartWandering();
        }

        public void ActOnCurrentState()
        {
            if (_state == AIState.Wandering)
            {
                Wander();
            }
            else if (_state == AIState.Seeking)
            {
                Seek();
            }
            else if (_state == AIState.Killing)
            {
                Kill();
            }
        }

        public void DetermineRotation(int centralRotation, int fromRL, int toRL, int fromRR, int toRR)
        {
            // If we're not already moving away from the boundary
            if (!MovementController.Moving.RotatingRight && !MovementController.Moving.RotatingLeft)
            {
                if (_currentRotation >= centralRotation) // We want to rotate left
                {
                    StopMoving(Movement.RotatingRight);
                    StartMoving(Movement.RotatingLeft);
                    _targetRotation = _gen.Next(fromRL, toRL);
                }
                else if (_currentRotation < centralRotation) // We want to rotate left
                {
                    StopMoving(Movement.RotatingLeft);
                    StartMoving(Movement.RotatingRight);
                    _targetRotation = _gen.Next(fromRR, toRR);
                }
            }
            else
            {
                if (Math.Abs(_currentRotation - _targetRotation) <= ROTATION_BUFFER)
                {
                    StopMoving(Movement.RotatingLeft);
                    StopMoving(Movement.RotatingRight);
                    _targetRotation = -1;
                }
            }
        }

        public void Wander()
        {
            if (!MovementController.Moving.Forward)
            {
                StartMoving(Movement.Forward);
            }

            // Too close to left side
            if (MovementController.Position.X - DISTANCE_AWAY_FROM_BOUNDARY < 0 && ((_currentRotation <= 269 && _currentRotation >= 91) || _targetRotation != -1))
            {
                DetermineRotation(180, 270, 359, 0, 90);
            }
            else if (MovementController.Position.Y - DISTANCE_AWAY_FROM_BOUNDARY < 0 && (_currentRotation <= 179 || _targetRotation != -1)) // To Close to top
            {
                DetermineRotation(90, 180, 270, 270, 360);
            }
            else if (MovementController.Position.X + DISTANCE_AWAY_FROM_BOUNDARY > Map.WIDTH && (_currentRotation <= 91 || _currentRotation >= 271 || _targetRotation != -1)) // To close to right
            {
                // Crosses origin so we need to calculate in line
                // If we're not already moving away from the boundary
                if (!MovementController.Moving.RotatingRight && !MovementController.Moving.RotatingLeft)
                {
                    if (_currentRotation >= 270) // Rotate Right
                    {
                        StopMoving(Movement.RotatingLeft);
                        StartMoving(Movement.RotatingRight);
                        _targetRotation = _gen.Next(180, 270);
                    }
                    else if (_currentRotation <= 90)
                    {
                        StopMoving(Movement.RotatingRight);
                        StartMoving(Movement.RotatingLeft);
                        _targetRotation = _gen.Next(90, 180);
                    }
                }
                else
                {
                    if (Math.Abs(_currentRotation - _targetRotation) <= ROTATION_BUFFER)
                    {
                        StopMoving(Movement.RotatingLeft);
                        StopMoving(Movement.RotatingRight);
                        _targetRotation = -1;
                    }
                }
            }
            else if (MovementController.Position.Y + DISTANCE_AWAY_FROM_BOUNDARY > Map.HEIGHT && (_currentRotation >= 181 || _targetRotation != -1)) // To close to bottom
            {
                DetermineRotation(270, 90, 180, 0, 90);
            }
            else
            {
                StopMoving(Movement.RotatingLeft);
                StopMoving(Movement.RotatingRight);
                _targetRotation = -1;
            }
        }

        public void Seek()
        {
            Vector2 otherPosition = null; ;
            // Grab the position of the ship that i'm seeking
            foreach (dynamic ship in _shipsOnScreen)
            {
                if (ship.ID == _seekingShip)
                {
                    otherPosition = new Vector2(ship.MovementController.Position.X, ship.MovementController.Position.Y);
                    break;
                }
            }

            // Calculate angle between me and ship that i'm seeking
            double angle = (Math.Atan2(MovementController.Position.Y - otherPosition.Y, MovementController.Position.X - otherPosition.X) * (180 / Math.PI) + 180) % 360;
            angle = Math.Abs(angle - 360);
           
            var angleDiff = angle-_currentRotation;
            if (Math.Abs(angleDiff) > 5) // Only adjust movement if we're out of sync
            {
                if (angleDiff > 0 && Math.Abs(angleDiff) <= 180)
                {
                    StopMoving(Movement.RotatingRight);
                    StartMoving(Movement.RotatingLeft);
                }
                else if(angleDiff > 0 && Math.Abs(angleDiff) > 180)
                {
                    StopMoving(Movement.RotatingLeft);
                    StartMoving(Movement.RotatingRight);
                }
                else if (angleDiff < 0 && Math.Abs(angleDiff) <= 180)
                {
                    StopMoving(Movement.RotatingLeft);
                    StartMoving(Movement.RotatingRight);
                }
                else if (angleDiff < 0 && Math.Abs(angleDiff) > 180)
                {
                    StopMoving(Movement.RotatingRight);
                    StartMoving(Movement.RotatingLeft);
                }
            }
            else if (Math.Abs(angleDiff) >= 90)
            {
                StopMoving(Movement.Forward);
            }
            else
            {
                StartMoving(Movement.Forward);
                StopMoving(Movement.RotatingLeft);
                StopMoving(Movement.RotatingRight);
            }
        }

        public void Kill()
        {
            Seek();
            GetWeaponController().Fire();
        }

        public override void Update(double PercentOfSecond)
        {           
            // Used to convert the calculated ship rotation to a usable 0-360 rotation
            UpdateCurrentRotation();

            CheckCurrentState();
            ActOnCurrentState();

            base.Update(PercentOfSecond);
        }

        public void UpdateCurrentRotation()
        {
            _currentRotation = MovementController.Rotation % 360;

            if (_currentRotation < 0)
            {
                _currentRotation += 360;
            }

            _currentRotation = Math.Abs(_currentRotation - 360);
        }
    }
}