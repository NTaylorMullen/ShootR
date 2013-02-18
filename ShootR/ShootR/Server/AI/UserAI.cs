using Microsoft.AspNet.SignalR;
using System.Drawing;

namespace ShootR
{
    public class UserAI : User
    {
        private static AIPayloadDecompressor _decompressor = new AIPayloadDecompressor();

        public UserAI(string connectionID, ShipAI ship)
            : base(connectionID, ship, new RegisteredClient("", ship.Name, ship.Name, "/Images/Page/SignalRLogoIdea.png"))
        {
            Viewport = new Size(1280, 600);
            ReadyForPayloads = true;
        }

        public override void PushToClient(object[] payload, IHubContext context)
        {
            (MyShip as ShipAI).LoadShipsOnScreen(_decompressor.DecompressShips(payload, MyShip.ID));
        }
    }
}