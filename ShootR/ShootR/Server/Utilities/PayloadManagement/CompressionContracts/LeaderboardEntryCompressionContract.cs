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
        public short DamageDealt = 3;
        public short DamageTaken = 4;
        public short KillDeathRatio = 5;
    }
}