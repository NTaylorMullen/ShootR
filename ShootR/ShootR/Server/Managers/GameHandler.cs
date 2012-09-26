using System.Collections.Concurrent;
using System.Collections.Generic;

namespace ShootR
{
    public class GameHandler
    {
        public GameHandler(Map map)
        {
            ships = new ConcurrentDictionary<string, Ship>();
            BulletManager = new BulletManager();
            CollisionManager = new CollisionManager(map);
        }

        public ConcurrentDictionary<string, Ship> ships { get; set; }
        public BulletManager BulletManager { get; set; }
        public CollisionManager CollisionManager { get; set; }

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
        /// Removes ship from the game handler.  This is used when a ship is destroyed and no longer needs to be monitored.
        /// </summary>
        /// <param name="key"></param>
        public Ship RemoveShipByKey(string key)
        {
            Ship removedShip;
            ships.TryRemove(key, out removedShip);

            if (removedShip != null && !removedShip.IsDisposed())
            {
                removedShip.Dispose();
            }

            return removedShip;
        }

        public void Update(GameTime gameTime)
        {
            BulletManager.Update(gameTime);

            foreach (string key in ships.Keys)
            {
                if (!ships[key].IsDisposed())
                {
                    ships[key].Update(gameTime);
                }
                else
                {
                    RemoveShipByKey(key);
                }
            }
            CollisionManager.Update(gameTime);
        }
    }
}