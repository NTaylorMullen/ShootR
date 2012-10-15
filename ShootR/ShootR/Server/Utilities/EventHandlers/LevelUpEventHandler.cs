using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public delegate void LevelUpEventHandler(object sender, LevelUpEventArgs e);

    public class LevelUpEventArgs : EventArgs
    {
        public LevelUpEventArgs(int newLevel)
        {
            NewLevel = newLevel;
        }

        public int NewLevel { get; private set; }
    }
}