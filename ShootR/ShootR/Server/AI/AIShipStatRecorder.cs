using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class AIShipStatRecorder : ShipStatRecorder
    {
        public AIShipStatRecorder(ShipAI me)
            : base(me)
        {

        }

        public override void BulletCollision(Bullet bullet)
        {
            (_me as ShipAI).SeekingShip = bullet.FiredBy.ID;

            base.BulletCollision(bullet);
        }
    }
}