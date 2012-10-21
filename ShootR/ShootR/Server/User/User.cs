using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace ShootR
{
    public class User
    {
        public const int MAX_SCREEN_WIDTH = 2000;
        public const int MAX_SCREEN_HEIGHT = 1000;

        public User(string connectionID)
            : this(connectionID, null)
        {
        }

        public User(string connectionID, Ship ship)
        {
            ConnectionID = connectionID;
            MyShip = ship;
            ReadyForPayloads = false;
            Viewport = new Size(0, 0); // Initialize the viewport to 0 by 0
            RemoteControllers = new List<User>();
            NotificationManager = new NotificationManager();
            IdleManager = new IdleManager(ship, NotificationManager);

            if (ship != null)
            {
                ship.Host = this;
            }
        }

        public List<User> RemoteControllers { get; set; }
        public NotificationManager NotificationManager { get; private set; }
        public IdleManager IdleManager { get; private set; }
        public string ConnectionID { get; set; }
        public Ship MyShip { get; set; }
        public bool Controller { get; set; }
        public bool ReadyForPayloads { get; set; }
        public int CurrentLeaderboardPosition { get; set; }

        public long LastCommandID { get; set; }

        public virtual void PushToClient(object[] payload, IHubContext Context)
        {
            //GlobalHost.ConnectionManager.GetHubContext<GameHub>().Client(ConnectionID)
            Context.Client(ConnectionID).d(payload);
        }

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