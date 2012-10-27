using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class AbilityConfiguration
    {
        public AbilityConfiguration()
        {
            BOOST_SPEED_INCREASE = Boost.SPEED_INCREASE;
            BOOST_DURATION = Convert.ToInt32(Boost.DURATION.TotalMilliseconds);
        }

        public double BOOST_SPEED_INCREASE { get; set; }
        public int BOOST_DURATION { get; set; }
    }    
}