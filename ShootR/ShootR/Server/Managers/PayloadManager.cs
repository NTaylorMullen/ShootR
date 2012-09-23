using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Drawing;

namespace ShootR
{
    public class PayloadManager
    {
        public Dictionary<string, Payload> GetPayloads(ConcurrentDictionary<string, Ship> ships, List<Bullet> bullets, List<Collidable> collisions, QuadTree map)
        {
            Dictionary<string, Payload> payloads = new Dictionary<string, Payload>();
            int shipCount = ships.Count,
                bulletCount = bullets.Count;
            Vector2 screenOffset = new Vector2((Ship.SCREEN_WIDTH / 2) + Ship.HEIGHT / 2, (Ship.SCREEN_HEIGHT / 2) + Ship.HEIGHT / 2);

            foreach (string connectionID in ships.Keys)
            {
                payloads.Add(connectionID, new Payload()
                {
                    ShipsInWorld = shipCount,
                    BulletsInWorld = bulletCount
                });

                Vector2 screenPosition = ships[connectionID].MovementController.Position - screenOffset;
                List<Collidable> onScreen = map.Query(new Rectangle(Convert.ToInt32(screenPosition.X), Convert.ToInt32(screenPosition.Y), Ship.SCREEN_WIDTH, Ship.SCREEN_HEIGHT));

                foreach (Collidable obj in onScreen)
                {
                    if (obj.GetType() == typeof(Bullet))
                    {
                        // This bullet has been seen so tag the bullet as seen
                        ((Bullet)obj).Seen();
                        payloads[connectionID].Bullets.Add((Bullet)obj);
                    }
                    else if (obj.GetType() == typeof(Ship))
                    {
                        payloads[connectionID].Ships.TryAdd(((Ship)obj).GetConnectionID(), (Ship)obj);
                    }
                }
            }

            // Once we've created our payload we now need to remove all of the collisions from our map
            foreach (Collidable obj in collisions)
            {
                map.Remove(obj);
            }

            return payloads;
        }
    }
}