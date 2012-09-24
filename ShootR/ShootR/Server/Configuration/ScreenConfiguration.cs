using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class ScreenConfiguration
    {
        public ScreenConfiguration()
        {
            WIDTH = Ship.SCREEN_WIDTH;
            HEIGHT = Ship.SCREEN_HEIGHT;
        }

        public int WIDTH { get; set; }
        public int HEIGHT { get; set; }
    }

}