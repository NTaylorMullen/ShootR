using System.Collections.Concurrent;
using System.Collections.Generic;

namespace ShootR
{
    public class PayloadManager
    {
        public const int SCREEN_PERIMETER = 700;

        public Dictionary<string, Payload> GetPayloads(ConcurrentDictionary<string, Ship> ships, List<Bullet> bullets, List<Collidable> collisions)
        {
            Dictionary<string, Payload> payloads = GetInitializedPayloads(ships.Keys, ships.Count, bullets.Count, collisions.Count);

            GenerateShipPayloads(payloads, ships);
            GenerateBulletPayloads(payloads, ships, bullets);
            GenerateCollisionPayloads(payloads, ships, collisions);

            return payloads;
        }

        private Dictionary<string, Payload> GetInitializedPayloads(ICollection<string> connectionIDs, int shipCount, int bulletCount, int collisionCount)
        {
            Dictionary<string, Payload> payloads = new Dictionary<string, Payload>();

            foreach (string connectionID in connectionIDs)
            {
                payloads.Add(connectionID, new Payload()
                {
                    ShipsInWorld = shipCount,
                    BulletsInWorld = bulletCount,
                    CollisionsInWorld = collisionCount
                });
            }

            return payloads;
        }

        private void GenerateShipPayloads(Dictionary<string, Payload> payloads, ConcurrentDictionary<string, Ship> ships)
        {
            foreach (string connectionIDA in ships.Keys)
            {
                payloads[connectionIDA].Ships.TryAdd(connectionIDA, ships[connectionIDA]);

                bool first = true;
                foreach (string connectionIDB in ships.Keys)
                {
                    if (first)
                    {
                        first = false;
                        continue;
                    }

                    // If the ships are on the screen then we need to add them to eachothers draw list
                    if (ShareScreen(ships[connectionIDA], ships[connectionIDB]))
                    {
                        payloads[connectionIDA].Ships.TryAdd(connectionIDB, ships[connectionIDB]);
                        payloads[connectionIDB].Ships.TryAdd(connectionIDA, ships[connectionIDA]);
                    }
                }
            }
        }

        private void GenerateBulletPayloads(Dictionary<string, Payload> payloads, ConcurrentDictionary<string, Ship> ships, List<Bullet> bullets)
        {
            int bulletCount = bullets.Count;

            foreach (string connectionIDA in ships.Keys)
            {
                foreach (Bullet bullet in bullets)
                {
                    if (ShareScreen(ships[connectionIDA], bullet))
                    {
                        payloads[connectionIDA].Bullets.Add(bullet);
                    }
                }
            }
        }

        private void GenerateCollisionPayloads(Dictionary<string, Payload> payloads, ConcurrentDictionary<string, Ship> ships, List<Collidable> collisions)
        {
            int bulletCount = collisions.Count;

            foreach (string connectionIDA in ships.Keys)
            {
                foreach (Bullet collision in collisions)
                {
                    if (ShareScreen(ships[connectionIDA], collision))
                    {
                        payloads[connectionIDA].Collisions.Add(collision);
                    }
                }
            }
        }

        private bool ShareScreen(Collidable A, Collidable B)
        {
            return (A.DistanceFrom(B) <= SCREEN_PERIMETER);
        }
    }
}