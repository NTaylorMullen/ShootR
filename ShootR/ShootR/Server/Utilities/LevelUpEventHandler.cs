using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class LevelUpEventHandler
    {
    }

    public delegate void LevelUpEventHandler(object sender, LevelUpEventArgs e);

    public class LevelUpEventArgs : EventArgs
    {
        public LevelUpEventArgs(Collidable killedBy)
        {
            KilledBy = killedBy;
        }

        public Collidable KilledBy { get; private set; }
    }
}