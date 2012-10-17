using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class AIPayloadDecompressor
    {
        public PayloadCompressionContract PayloadContract = new PayloadCompressionContract();
        public CollidableCompressionContract CollidableContract = new CollidableCompressionContract();
        public ShipCompressionContract ShipContract = new ShipCompressionContract();
        public BulletCompressionContract BulletContract = new BulletCompressionContract();
        public LeaderboardEntryCompressionContract LeaderboardContract = new LeaderboardEntryCompressionContract();

        public dynamic DecompressShip(object[] data)
        {
            return new
            {
                ID = data[CollidableContract.ID],
                MovementController = new
                {
                    Position = new
                    {
                        X = data[CollidableContract.PositionX],
                        Y = data[CollidableContract.PositionY]
                    }
                }
            };
        }

        public dynamic DecompressPayload(object[] data)
        {
            return new
            {
                Ships = data[PayloadContract.Ships],
            };
        }

        public List<dynamic> DecompressShips(object[] data, int myID)
        {
            var payload = DecompressPayload(data);
            List<dynamic> shipList = new List<dynamic>();

            foreach (object[] ship in payload.Ships)
            {
                var s = DecompressShip(ship);
                if (s.ID != myID)
                {
                    shipList.Add(s);
                }
            }

            return shipList;
        }

    }
}