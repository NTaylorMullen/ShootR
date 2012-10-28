using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class ShipMovementControllerConfiguration
    {
        public ShipMovementControllerConfiguration()
        {
            DRAG_AREA = ShipMovementController.DRAG_AREA;
            DRAG_COEFFICIENT = ShipMovementController.DRAG_COEFFICIENT;
            ENGINE_POWER = ShipMovementController.ENGINE_POWER;
            ROTATE_SPEED = ShipMovementController.ROTATE_SPEED;
            MASS = ShipMovementController.MASS;
        }

        public double ROTATE_SPEED { get; set; }
        public double DRAG_AREA { get; set; }
        public double DRAG_COEFFICIENT { get; set; }
        public double ENGINE_POWER { get; set; }
        public double MASS { get; set; }
    }
}