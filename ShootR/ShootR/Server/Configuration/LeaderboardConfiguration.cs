using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class LeaderboardConfiguration
    {
        public LeaderboardConfiguration()
        {
            LEADERBOARD_SIZE = Leaderboard.LEADERBOARD_SIZE;
        }

        public int LEADERBOARD_SIZE { get; set; }        
    }
}