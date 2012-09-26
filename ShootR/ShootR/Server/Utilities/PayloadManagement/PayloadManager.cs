using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Drawing;

namespace ShootR
{
    public class PayloadManager
    {
        public const int SCREEN_BUFFER_AREA = 100; // Send X extra pixels down to the client to allow for latency between client and server

        public PayloadCompressor Compressor = new PayloadCompressor();

        public Dictionary<string, Payload> GetPayloads(ConcurrentDictionary<string, Ship> ships, int bulletCount, Map space)
        {
            Dictionary<string, Payload> payloads = new Dictionary<string, Payload>();
            int shipCount = ships.Count;

            Vector2 screenOffset = new Vector2((Ship.SCREEN_WIDTH / 2) + Ship.HEIGHT / 2, (Ship.SCREEN_HEIGHT / 2) + Ship.HEIGHT / 2);

            foreach (string connectionID in ships.Keys)
            {
                payloads.Add(connectionID, new Payload()
                {
                    ShipsInWorld = shipCount,
                    BulletsInWorld = bulletCount
                });

                Vector2 screenPosition = ships[connectionID].MovementController.Position - screenOffset;
                List<Collidable> onScreen = space.Query(new Rectangle(Convert.ToInt32(screenPosition.X), Convert.ToInt32(screenPosition.Y), Ship.SCREEN_WIDTH + SCREEN_BUFFER_AREA, Ship.SCREEN_HEIGHT + SCREEN_BUFFER_AREA));

                foreach (Collidable obj in onScreen)
                {
                    if (obj.GetType() == typeof(Bullet))
                    {
                        // This bullet has been seen so tag the bullet as seen
                        ((Bullet)obj).Seen();
                        payloads[connectionID].Bullets.Add(Compressor.Compress((Bullet)obj));
                    }
                    else if (obj.GetType() == typeof(Ship))
                    {
                        payloads[connectionID].Ships.TryAdd(((Ship)obj).GetConnectionID(), Compressor.Compress(((Ship)obj)));
                    }
                }
            }

            // Remove all disposed objects from the map
            space.Clean();

            return payloads;
        }
    }
}