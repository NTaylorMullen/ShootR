using System;
using System.Collections.Concurrent;

namespace ShootR
{
    public class ShipManager
    {
        // Having an int GUID to reduce payload size
        private static int _shipGUID = 0;
        private RespawnManager _respawnManager;

        public ShipManager(CollisionManager collisionManager)
        {
            Ships = new ConcurrentDictionary<string, Ship>();
            _respawnManager = new RespawnManager(collisionManager, this);
        }

        public ConcurrentDictionary<string, Ship> Ships { get; set; }

        /// <summary>
        /// Adds a ship and returns the added ship.  Used to chain methods together.
        /// </summary>
        /// <param name="s">The ship to add</param>
        /// <param name="key">The connection ID for a key</param>
        public void Add(Ship s, string key)
        {
            if (s.ID == -1)
            {
                s.ID = _shipGUID++;
            }
            // Only enable respawn if it hasn't been enabled yet
            if (!s.RespawnEnabled)
            {
                s.RespawnEnabled = true;
                s.LifeController.OnDeath += new DeathEventHandler(_respawnManager.StartRespawnCountdown);                
            }
            Ships.TryAdd(key, s);
        }

        /// <summary>
        /// Removes ship from the game handler.  This is used when a ship is destroyed and no longer needs to be monitored.
        /// </summary>
        /// <param name="key"></param>
        public Ship RemoveShipByKey(string key)
        {
            Ship removedShip;
            Ships.TryRemove(key, out removedShip);

            if (removedShip != null && !removedShip.Disposed)
            {
                removedShip.Dispose();
            }

            return removedShip;
        }

        public void Update(GameTime gameTime)
        {
            _respawnManager.Update();

            foreach (string key in Ships.Keys)
            {
                if (!Ships[key].Disposed)
                {
                    Ships[key].Update(gameTime);
                }
                else
                {
                    RemoveShipByKey(key);
                }
            }
        }
    }
}