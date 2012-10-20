using System.Collections.Concurrent;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace ShootR
{
    public class ConnectionManager
    {
        private UserHandler _userHandler;
        private object _locker;

        public ConnectionManager(UserHandler userHandler, object locker)
        {
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
                OnDisconnected(connectionId);
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
                    User user = _userHandler.GetUser(connectionId);
                    
                    //It's possible for a controller to disconnect without a ship
                    if (user.MyShip != null)
                    {
                        user.MyShip.Dispose();
                    }

                    _userHandler.RemoveUser(connectionId);                    

                    // Leave the leaderboard group just in case user was in it
                    GlobalHost.ConnectionManager.GetHubContext<GameHub>().Groups.Remove(connectionId, Leaderboard.LEADERBOARD_REQUESTEE_GROUP);
                }
            }
        }
    }
}