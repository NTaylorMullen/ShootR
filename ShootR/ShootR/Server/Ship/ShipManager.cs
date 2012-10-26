using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShootR
{
    public class ShipManager
    {
        private RespawnManager _respawnManager;
        private GameHandler _gameHandler;

        public ShipManager(GameHandler gameHandler)
        {
            Ships = new ConcurrentDictionary<string, Ship>();
            _gameHandler = gameHandler;
            _respawnManager = new RespawnManager(_gameHandler);
        }

        public ConcurrentDictionary<string, Ship> Ships { get; set; }

        /// <summary>
        /// Adds a ship and returns the added ship.  Used to chain methods together.
        /// </summary>
        /// <param name="s">The ship to add</param>
        public void Add(Ship s)
        {
            // Only enable respawn if it hasn't been enabled yet
            if (!s.RespawnEnabled)
            {
                s.RespawnEnabled = true;
                s.OnDeath += new DeathEventHandler(_respawnManager.StartRespawnCountdown);
            }
            Ships.TryAdd(s.Host.ConnectionID, s);
        }

        /// <summary>
        /// Removes ship from the game handler.  This is used when a ship is destroyed and no longer needs to be monitored.
        /// </summary>
        /// <param name="key"></param>
        public void Remove(string key)
        {
            Ship s;
            Ships.TryRemove(key, out s);
        }

        public void Update(GameTime gameTime)
        {
            _respawnManager.Update();

            List<string> keysToRemove = new List<string>(Ships.Count);
            Parallel.ForEach(Ships, currentShip =>
            {
                if (!currentShip.Value.Disposed)
                {
                    currentShip.Value.Update(gameTime);
                }
                else
                {
                    keysToRemove.Add(currentShip.Key);
                }

            });

            for (int i = keysToRemove.Count - 1; i >= 0; i--)
            {
                Remove(keysToRemove[i]);
            }
        }
    }
}