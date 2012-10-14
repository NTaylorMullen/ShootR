using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public delegate void DeathEventHandler(object sender, DeathEventArgs e);

    public class DeathEventArgs : EventArgs
    {
        public DeathEventArgs(Collidable killedBy)
        {
            KilledBy = killedBy;
        }

        public Collidable KilledBy { get; private set; }
    }
}