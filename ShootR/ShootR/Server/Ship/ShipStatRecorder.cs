using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class ShipStatRecorder
    {
        protected Ship _me;

        public ShipStatRecorder(Ship me)
        {
            _me = me;
        }

        public int DamageDealt { get; set; }
        public int DamageTaken { get; set; }
        public int Kills { get; set; }
        public int Deaths { get; set; }

        public virtual void BulletCollision(Bullet bullet)
        {
            DamageTaken += bullet.DamageDealt;

            // Only increment dealt statistics if it's not by me
            if (bullet.FiredBy != _me)
            {                
                bullet.FiredBy.StatRecorder.DamageDealt += bullet.DamageDealt;
            }            
        }

        public void ShipDeath(object sender, DeathEventArgs e)
        {
            Deaths++;
            Bullet bullet = (e.KilledBy as Bullet);

            // Do not increment kills if we killed ourself
            if (bullet.FiredBy != _me)
            {
                bullet.FiredBy.StatRecorder.Kills++;
            }
        }

        public void Reset()
        {
            DamageDealt = 0;
            DamageTaken = 0;
            Deaths = 0;
            Kills = 0;
        }
    }
}