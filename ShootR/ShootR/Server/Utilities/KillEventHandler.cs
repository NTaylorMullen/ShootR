using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public delegate void KillEventHandler(object sender, KillEventArgs e);

    public class KillEventArgs : EventArgs
    {
        public KillEventArgs(Collidable killed)
        {
            Killed = killed;
        }

        public Collidable Killed { get; private set; }
    }
}