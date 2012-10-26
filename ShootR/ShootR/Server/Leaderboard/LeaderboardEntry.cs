using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class LeaderboardEntry
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public int Level { get; set; }
        public int Kills { get; set; }
        public int Deaths { get; set; }
        public int HitsDealt { get; set; }
        public int HitsTaken { get; set; }
        public int DamageDealt { get; set; }
        public int DamageTaken { get; set; }
        public double KillDeathRatio { get; set; }

        public string ConnectionID { get; set; }
    }
}