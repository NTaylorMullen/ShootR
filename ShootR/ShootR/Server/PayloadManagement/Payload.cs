using System;
using System.Collections.Generic;

namespace ShootR
{
    public class Payload
    {
        public Payload()
        {
            Ships = new List<object>();
            Bullets = new List<object>();
            Powerups = new List<object>();
        }

        public List<object> Ships { get; set; }        
        public List<object> Bullets { get; set; }
        public List<object> Powerups { get; set; }
        public int ShipsInWorld { get; set; }
        public int BulletsInWorld { get; set; }

        public int Experience { get; set; }
        public int ExperienceToNextLevel { get; set; }

        public string Notification { get; set; }
        public long LastCommandProcessed { get; set; }

        public int LeaderboardPosition { get; set; }
        public int Kills { get; set; }
        public int Deaths { get; set; }

        public string KilledByName { get; set; }
        public string KilledByPhoto { get; set; }
    }
}