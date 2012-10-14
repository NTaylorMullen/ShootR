using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class LeaderboardEntryCompressionContract
    {
        public short Name = 0;
        public short Kills = 1;
        public short Deaths = 2;
        public short HitsDealt = 3;
        public short HitsTaken = 4;
        public short DamageDealt = 5;
        public short DamageTaken = 6;
        public short KillDeathRatio = 7;
    }
}