using System;
using System.Drawing;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR.Hubs;

namespace ShootR
{
    public class UserAI : User
    {       
        private static AIPayloadDecompressor _decompressor = new AIPayloadDecompressor();

        public UserAI(string connectionID, ShipAI ship)
            : base(connectionID, ship)
        {
            Viewport = new Size(1280, 600);
            ReadyForPayloads = true;            
        }

        public override void PushToClient(object[] payload, IHubContext Context)
        {
            (MyShip as ShipAI).LoadShipsOnScreen(_decompressor.DecompressShips(payload,MyShip.ID));
        }
    }
}