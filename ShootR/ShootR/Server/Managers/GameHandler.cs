using System.Collections.Concurrent;
using System.Collections.Generic;

namespace ShootR
{
    public class GameHandler
    {
        public GameHandler(QuadTree map)
        {
            ships = new ConcurrentDictionary<string, Ship>();
            bulletManager = new BulletManager();
            collisionManager = new CollisionManager(map);
        }

        public ConcurrentDictionary<string, Ship> ships { get; set; }
        public BulletManager bulletManager { get; set; }
        public CollisionManager collisionManager { get; set; }

        /// <summary>
        /// Adds a ship and returns the added ship.  Used to chain methods together.
        /// </summary>
        /// <param name="s">The ship to add</param>
        /// <param name="key">The connection ID for a key</param>
        public Ship AddShip(Ship s, string key)
        {
            ships.TryAdd(key, s);
            return s;
        }

        /// <summary>
        /// Used to capture all of the amunition that needs to be cleaned up on the client.
        /// </summary>
        /// <returns>A combined list of the bullets that are out of range and the list of bullets that have collided with objects.</returns>
        public List<Collidable> GetDisposedAmunition()
        {
            Collidable[] collisions = collisionManager.GetAmunitionCollisions();
            Collidable[] cleaning = BulletManager.GetBulletsToBeCleanedUp();
            Collidable[] result = new Collidable[collisions.Length + cleaning.Length];

            collisions.CopyTo(result, 0);
            cleaning.CopyTo(result, collisions.Length);

            return new List<Collidable>(result);
        }

        /// <summary>
        /// Removes ship from the game handler.  This is used when a ship is destroyed and no longer needs to be monitored.
        /// </summary>
        /// <param name="key"></param>
        public Ship RemoveShipByKey(string key)
        {
            Ship removedShip;
            ships.TryRemove(key, out removedShip);

            if (removedShip != null && !removedShip.Disposed)
            {
                removedShip.Dispose();
            }

            return removedShip;
        }

        public void Update(GameTime gameTime)
        {
            bulletManager.Update(gameTime);

            foreach (string key in ships.Keys)
            {
                if (!ships[key].Disposed)
                {
                    ships[key].Update(gameTime);
                }
                else
                {
                    RemoveShipByKey(key);
                }
            }

            collisionManager.Update(gameTime);
        }
    }
}