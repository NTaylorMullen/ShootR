using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class HealthPackConfiguration
    {
        public HealthPackConfiguration()
        {
            WIDTH = HealthPack.WIDTH;
            HEIGHT = HealthPack.HEIGHT;
            LIFE_SPAN = Convert.ToInt32(HealthPack.LIFE_SPAN.TotalMilliseconds);
        }

        public int WIDTH { get; set; }
        public int HEIGHT { get; set; }
        public int LIFE_SPAN { get; set; }
    }           
}