using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class LeaderboardEntryCompressionContract
    {
        public short Name = 0;
        public short Level = 1;
        public short Kills = 2;
        public short Deaths = 3;
        public short DamageDealt = 4;
        public short DamageTaken = 5;
        public short KillDeathRatio = 6;
    }
}