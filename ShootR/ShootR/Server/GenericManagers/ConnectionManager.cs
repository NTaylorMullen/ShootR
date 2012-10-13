using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace ShootR
{
    public class ConnectionManager
    {
        private GameHandler _gameHandler;
        private UserHandler _userHandler;
        private object _locker;

        public ConnectionManager(GameHandler gameHandler, UserHandler userHandler, object locker)
        {
            _gameHandler = gameHandler;
            _userHandler = userHandler;
            _locker = locker;
        }

        public void OnConnected(string connectionId)
        {
        }

        public void OnReconnected(string connectionId)
        {
            lock (_locker)
            {
                // On reconnect, force the user to refresh
                if (_userHandler.UserExists(connectionId))
                {
                    _userHandler.RemoveUser(connectionId);
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
        public void OnDisconnected(string connectionId)
        {
            lock (_locker)
            {
                if (_userHandler.UserExists(connectionId))
                {
                    _userHandler.RemoveUser(connectionId);

                    if (_gameHandler.ShipManager.Ships.ContainsKey(connectionId))
                    {
                        _gameHandler.ShipManager.Ships[connectionId].Dispose();
                    }
                }
            }
        }
    }
}