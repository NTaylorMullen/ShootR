using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class User
    {
        public const int MAX_SCREEN_WIDTH = 2000;
        public const int MAX_SCREEN_HEIGHT = 1000;

        public User(string connectionID)
        {
            ConnectionID = connectionID;
            ReadyForPayloads = false;
            Viewport = new Size(0, 0);
            RemoteControllers = new List<User>();
        }

        public User(string connectionID, Ship ship)
        {
            ConnectionID = connectionID;
            MyShip = ship;
            ReadyForPayloads = false;
            Viewport = new Size(0, 0); // Initialize the viewport to 0 by 0
            RemoteControllers = new List<User>();
        }

        public List<User> RemoteControllers { get; set; }
        public string ConnectionID { get; set; }
        public Ship MyShip { get; set; }
        public bool Controller { get; set; }
        public bool ReadyForPayloads { get; set; }
        public int CurrentLeaderboardPosition { get; set; }
        private Size _viewport;
        public Size Viewport
        {
            get
            {
                return _viewport;
            }
            set
            {
                if (value.Width > MAX_SCREEN_WIDTH)
                {
                    value.Width = MAX_SCREEN_WIDTH;
                }
                if (value.Height > MAX_SCREEN_HEIGHT)
                {
                    value.Height = MAX_SCREEN_HEIGHT;
                }

                _viewport = value;
            }
        }
    }
}