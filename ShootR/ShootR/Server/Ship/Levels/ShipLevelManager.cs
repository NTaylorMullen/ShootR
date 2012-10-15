using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class ShipLevelManager
    {
        private Ship _me;
        private LevelCalculator _levelCalculator;

        public ShipLevelManager(Ship me)
        {
            Level = 1;
            Experience = 0;
            _me = me;
            _levelCalculator = new LevelCalculator();

            _me.OnKill += Killed;
            _me.OnDeath += Died;
        }

        public int Level { get; private set; }
        public int Experience { get; private set; }
        public int ExperienceToNextLevel { get; private set; }

        public void Killed(object sender, KillEventArgs e)
        {
            int exp = _levelCalculator.CalculateKillExperience(_me, e.Killed as Ship);
        }

        public void Died(object sender, DeathEventArgs e)
        {
        }
    }
}