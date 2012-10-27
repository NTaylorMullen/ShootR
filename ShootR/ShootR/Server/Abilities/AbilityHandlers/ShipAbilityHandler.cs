using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class ShipAbilityHandler : AbilityHandler
    {
        private Ship _me;
        public ShipAbilityHandler(Ship me)
            : base(new Boost(me.MovementController, me.Controllable))
        {
            _me = me;

            _me.OnOutOfBounds += Ability(Boost.NAME).Deactivate;
        }
    }
}