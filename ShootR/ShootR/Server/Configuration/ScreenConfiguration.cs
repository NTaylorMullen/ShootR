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
            SCREEN_BUFFER_AREA = PayloadManager.SCREEN_BUFFER_AREA;
            MAX_SCREEN_WIDTH = User.MAX_SCREEN_WIDTH;
            MAX_SCREEN_HEIGHT = User.MAX_SCREEN_HEIGHT;
            MIN_SCREEN_WIDTH = User.MIN_SCREEN_WIDTH;
            MIN_SCREEN_HEIGHT = User.MIN_SCREEN_HEIGHT;
        }

        public int SCREEN_BUFFER_AREA { get; set; }
        public int MAX_SCREEN_WIDTH { get; set; }
        public int MAX_SCREEN_HEIGHT { get; set; }
        public int MIN_SCREEN_WIDTH { get; set; }
        public int MIN_SCREEN_HEIGHT { get; set; }
    }    
}