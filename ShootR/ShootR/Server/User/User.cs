using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class User
    {
        public User(string connectionID, Ship ship)
        {
            ConnectionID = connectionID;
            MyShip = ship;
            ReadyForPayloads = false;
        }

        public string ConnectionID { get; set; }
        public Ship MyShip { get; set; }
        public bool ReadyForPayloads { get; set; }
        public DateTime? MovementReceivedAt { get; set; }
    }
}