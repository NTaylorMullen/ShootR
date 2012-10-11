using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace ShootR
{
    public class ConnectionManager
    {
        private GameHandler _gameHandler;
        private ConcurrentDictionary<string, User> _userList;
        private object _locker;

        public ConnectionManager(GameHandler gameHandler, ConcurrentDictionary<string, User> userList, object locker)
        {
            _gameHandler = gameHandler;
            _userList = userList;
            _locker = locker;
        }

        public void OnConnect(string connectionId)
        {
        }

        public void OnReconnect(string connectionId)
        {
            lock (_locker)
            {
                // On reconnect, force the user to refresh
                if (_userList.ContainsKey(connectionId))
                {
                    User u;
                    _userList.TryRemove(connectionId, out u);
                }

                if (_gameHandler.ShipManager.Ships.ContainsKey(connectionId))
                {
                    _gameHandler.ShipManager.RemoveShipByKey(connectionId);
                }
            }
        }

        /// <summary>
        /// On disconnect we need to remove the ship from our list of ships within the gameHandler.
        /// This also means we need to notify clients that the ship has been removed.
        /// </summary>
        public void OnDisconnect(string connectionId)
        {
            lock (_locker)
            {
                if (_userList.ContainsKey(connectionId))
                {
                    User u;
                    _userList.TryRemove(connectionId, out u);

                    if (_gameHandler.ShipManager.Ships.ContainsKey(connectionId))
                    {
                        _gameHandler.ShipManager.Ships[connectionId].Dispose();
                    }
                }
            }
        }
    }
}