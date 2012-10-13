using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class LifeController
    {
        public event EventHandler OnDeath;

        public LifeController(double life)
        {
            Health = life;
            Alive = true;
        }

        public Collidable Host { get; set; }
        public double Health { get; private set; }
        public bool Alive { get; private set; }

        public void Hurt(double life)
        {
            Health -= life;

            // Dead
            if (Health <= 0)
            {
                Health = 0;
                Alive = false;

                if (OnDeath != null)
                {
                    OnDeath(Host, new EventArgs());
                }
            }
        }

        public void Heal(double life)
        {
            Alive = true;
            Health += life;
        }
    }
}