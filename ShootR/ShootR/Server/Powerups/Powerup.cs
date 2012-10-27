using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace ShootR
{
    public class Powerup : Collidable
    {
        private static int _powerupGUID = 0;

        public Powerup(int w, int h, MovementController mc, LifeController lc, DamageController dc, short type)
            : base(w, h, mc, lc, dc)
        {
            ID = Interlocked.Increment(ref _powerupGUID);
            Type = type;
        }

        public short Type { get; set; }

        public virtual void Update(DateTime utcNow)
        {
        }
    }
}