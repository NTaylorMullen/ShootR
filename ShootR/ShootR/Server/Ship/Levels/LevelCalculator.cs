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
        public const int BASE_EXPERIENCE_GAIN = 25; // X experience per kill at level 1
        public const int MIN_EXPERIENCE = 5; // Cannot gain less than 5 experience per kill

        public int CalculateKillExperience(Ship Killer, Ship Killed)
        {
            var levelDiff = Killer.LevelManager.Level - Killed.LevelManager.Level;

            return Convert.ToInt32(Math.Max(Math.Round(BASE_EXPERIENCE_GAIN + levelDiff * LEVEL_DIFFERENCE_MULTIPLIER), MIN_EXPERIENCE));
        }

        public static double NextLevelExperience(double level)
        {
            return Math.Round(Bias(0.55, (level + 1) / 100) * MAX_EXPERIENCE_PER_LEVEL);
        }

        private static double Bias(double x, double y)
        {
            return y / ((1 / x - 2) * (1 - y) + 1);
        }
    }
}