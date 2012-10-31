using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class AIShipStatRecorder : ShipStatRecorder
    {
        private const double CHANCE_TO_SEEK = .5;
        public AIShipStatRecorder(ShipAI me)
            : base(me)
        {

        }

        public override void BulletCollision(Bullet bullet)
        {
            // Only seek those who hit me X% of the time
            if (Game.GEN.NextDouble() >= CHANCE_TO_SEEK)
            {
                (_me as ShipAI).SeekingShip = bullet.FiredBy.ID;
            }

            base.BulletCollision(bullet);
        }
    }
}