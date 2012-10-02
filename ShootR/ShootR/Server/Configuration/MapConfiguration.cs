using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class MapConfiguration
    {
        public MapConfiguration()
        {
            WIDTH = Map.WIDTH;
            HEIGHT = Map.HEIGHT;
            BARRIER_DEPRECATION = Map.BARRIER_DEPRECATION;
        }

        public int WIDTH { get; set; }
        public int HEIGHT { get; set; }
        public double BARRIER_DEPRECATION { get; set; }
    }

}