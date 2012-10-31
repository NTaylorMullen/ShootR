using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

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
                try
                {
                    if (_userHandler.UserExistsAndReady(connectionId))
                    {
                        User user = _userHandler.GetUser(connectionId);

                        //It's possible for a controller to disconnect without a ship
                        if (!user.Controller)
                        {
                            user.MyShip.Dispose();
                            user.Connected = false;
                        }
                        else
                        {
                            // Remove me from the ship hosts remote controllers
                            if (user.MyShip != null)
                            {
                                user.MyShip.Host.RemoteControllers.Remove(user);
                                user.MyShip.Host.NotificationManager.Notify("Detached controller.");
                                user.MyShip = null;
                            }

                            _userHandler.RemoveUser(connectionId);
                        }

                        // Leave the leaderboard group just in case user was in it
                        IHubContext context = Game.GetContext();
                        context.Groups.Remove(connectionId, Leaderboard.LEADERBOARD_REQUESTEE_GROUP);

                        // Clear controllers
                        foreach (User u in user.RemoteControllers)
                        {
                            u.MyShip = null;
                            context.Clients.Client(u.ConnectionID).stopController("Primary account has been stopped!");
                        }

                        user.RemoteControllers.Clear();
                    }
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }
            }
        }
    }
}