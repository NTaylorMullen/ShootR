using System.Collections.Concurrent;

namespace ShootR
{
    public class ShipManager
    {
        // Having an int GUID to reduce payload size
        private static int _shipGUID = 0;

        public ShipManager()
        {
            Ships = new ConcurrentDictionary<string, Ship>();
        }

        public ConcurrentDictionary<string, Ship> Ships { get; set; }

        /// <summary>
        /// Adds a ship and returns the added ship.  Used to chain methods together.
        /// </summary>
        /// <param name="s">The ship to add</param>
        /// <param name="key">The connection ID for a key</param>
        public Ship AddShip(Ship s, string key)
        {
            s.ID = _shipGUID++;
            Ships.TryAdd(key, s);
            return s;
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
    }
}