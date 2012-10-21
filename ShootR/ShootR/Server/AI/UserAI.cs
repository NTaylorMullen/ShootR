using System;
using System.Drawing;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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

        public override void PushToClient(object[] payload, dynamic Clients)
        {
            (MyShip as ShipAI).LoadShipsOnScreen(_decompressor.DecompressShips(payload,MyShip.ID));
        }
    }
}