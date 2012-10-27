using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class Boost : MovementAbility
    {
        // Increase speed by X, multiplies it
        public const double SPEED_INCREASE = 1.35;
        public static readonly TimeSpan DURATION = TimeSpan.FromSeconds(4);

        public Boost(MovementController movementController)
            : base(movementController)
        {
        }

        public override void Activate()
        {
            MultiplySpeedBy(SPEED_INCREASE);
            base.Activate();
        }

        public override void Deactivate()
        {
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