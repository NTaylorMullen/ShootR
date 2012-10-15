using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class ShipLifeController : LifeController
    {
        public ShipLifeController(double life)
            : base(life)
        {
        }

        /// <summary>
        /// Triggered on level
        /// </summary>
        public void LeveledUp(object sender, LevelUpEventArgs e)
        {
            MaxLife = Convert.ToInt32(MaxLife * LEVEL_UP_LIFE_INCREASE);
            HealFull();
        }
    }
}