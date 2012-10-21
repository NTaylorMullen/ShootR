using System;

namespace ShootR
{
    public class ShipLevelManager
    {
        public const double EXP_REDUCTION_MODIFIER = .5;
        private Ship _me;
        private LevelCalculator _levelCalculator;

        public event LevelUpEventHandler OnLevel;

        public ShipLevelManager(Ship me)
        {
            Level = 1;
            Experience = 0;
            _me = me;
            _levelCalculator = new LevelCalculator();
            ExperienceToNextLevel = Convert.ToInt32(_levelCalculator.NextLevelExperience(Level));

            _me.OnKill += Killed;
            _me.OnDeath += Died;

            OnLevel += _me.LifeController.LeveledUp;
            OnLevel += _me.WeaponController.LeveledUp;
        }

        public int Level { get; private set; }
        public int Experience { get; private set; }
        public int ExperienceToNextLevel { get; private set; }

        public void Killed(object sender, KillEventArgs e)
        {
            // Do not gain experience from killing yourself
            if (_me != e.Killed as Ship)
            {
                int exp = _levelCalculator.CalculateKillExperience(_me, e.Killed as Ship);

                Experience += exp;
                // Need to level
                if (Experience >= ExperienceToNextLevel)
                {
                    Level++;
                    Experience = Experience - ExperienceToNextLevel;
                    ExperienceToNextLevel = Convert.ToInt32(_levelCalculator.NextLevelExperience(Level));

                    if (OnLevel != null)
                    {
                        OnLevel(_me, new LevelUpEventArgs(Level));
                    }
                }
            }
        }

        public void Died(object sender, DeathEventArgs e)
        {
            int exp = Convert.ToInt32(_levelCalculator.CalculateKillExperience((e.KilledBy as Bullet).FiredBy, _me) * EXP_REDUCTION_MODIFIER);
            Experience = Math.Max(Experience - exp, 0);
        }

        public void Reset()
        {
            Level = 1;
            Experience = 0;
            ExperienceToNextLevel = Convert.ToInt32(_levelCalculator.NextLevelExperience(Level));
        }
    }
}