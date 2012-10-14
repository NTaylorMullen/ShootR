using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class ShipStatRecorder
    {
        private Ship _me;

        public ShipStatRecorder(Ship me)
        {
            _me = me;
        }

        public int HitsDealt { get; set; }
        public int HitsTaken { get; set; }
        public int DamageDealt { get; set; }
        public int DamageTaken { get; set; }
        public int Kills { get; set; }
        public int Deaths { get; set; }

        public void BulletCollision(Bullet bullet)
        {
            HitsTaken++;
            DamageTaken += bullet.DamageDealt;

            // Only increment dealt statistics if it's not by me
            if (bullet.FiredBy != _me)
            {                
                bullet.FiredBy.StatRecorder.HitsDealt++;
                bullet.FiredBy.StatRecorder.DamageDealt += bullet.DamageDealt;
            }
            
        }

        public void ShipDeath(object sender, DeathEventArgs e)
        {
            Deaths++;
            // Do not increment kills if we killed ourself
            if ((e.KilledBy as Bullet).FiredBy != _me)
            {
                (e.KilledBy as Bullet).FiredBy.StatRecorder.Kills++;
            }
        }
    }
}