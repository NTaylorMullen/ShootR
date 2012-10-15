using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class LevelCalculator
    {
        public const int MAX_EXPERIENCE_PER_LEVEL = 10000;
        public const double LEVEL_DIFFERENCE_MULTIPLIER = .25;
        public const int BASE_EXPERIENCE_GAIN = 125; // X experience per kill at level 1
        public const int MIN_EXPERIENCE = 40; // Cannot gain less than 5 experience per kill

        public int CalculateKillExperience(Ship Killer, Ship Killed)
        {
            var levelDiff = Killed.LevelManager.Level - Killer.LevelManager.Level;

            return Convert.ToInt32(Math.Max(Math.Round(BASE_EXPERIENCE_GAIN + BASE_EXPERIENCE_GAIN * levelDiff * LEVEL_DIFFERENCE_MULTIPLIER), MIN_EXPERIENCE));
        }

        public double NextLevelExperience(double level)
        {
            return Math.Round(Bias(0.53, (level + 1) / 100) * MAX_EXPERIENCE_PER_LEVEL);
        }

        private double Bias(double x, double y)
        {
            return y / ((1 / x - 2) * (1 - y) + 1);
        }
    }
}