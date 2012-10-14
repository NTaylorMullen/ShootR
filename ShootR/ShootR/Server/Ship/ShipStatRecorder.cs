using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class ShipStatRecorder
    {
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

            bullet.FiredBy.StatRecorder.HitsDealt++;
            bullet.FiredBy.StatRecorder.DamageDealt += bullet.DamageDealt;
        }

        public void ShipDeath(object sender, DeathEventArgs e)
        {
            Deaths++;
            (e.KilledBy as Bullet).FiredBy.StatRecorder.Kills++;
        }
    }
}