using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class StationaryMovementController : MovementController
    {
        public StationaryMovementController(Vector2 position)
            : base(position, 0, 0)
        {
        }

        public override void Update(double PercentOfSecond)
        {
            // Do nothing because we do not want to move
        }
    }
}