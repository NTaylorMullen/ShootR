using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class Boost : MovementAbility
    {
        // Increase speed by X, multiplies it
        public const double SPEED_INCREASE = 3;
        public const string NAME = "Boost";
        public static readonly TimeSpan DURATION = TimeSpan.FromSeconds(1.5);

        private ValueRef<bool> _controllable;
        
        public Boost(ShipMovementController movementController, ValueRef<bool> controllable)
            : base(NAME, movementController)
        {
            _controllable = controllable;
        }

        public override void Activate()
        {
            ShipMovementController smc = _movementController as ShipMovementController;
            smc.StopMovement();
            smc.Moving.Forward = true;

            _controllable.Value = false;
            MultiplySpeedBy(SPEED_INCREASE);
            base.Activate();
        }

        public override void Deactivate()
        {
            (_movementController as ShipMovementController).Moving.Forward = false;
            _controllable.Value = true;
            ResetSpeed();
            base.Deactivate();
        }

        public override void Update(DateTime utcNow)
        {
            if (Active && utcNow - ActivatedAt >= DURATION)
            {
                Deactivate();
                base.Update(utcNow);
            }
        }
    }
}