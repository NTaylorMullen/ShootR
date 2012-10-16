using System;
using System.Collections.Generic;
using System.Drawing;
using System.Threading.Tasks;
using SignalR.Hubs;

namespace ShootR
{
    [HubName("h")]
    public class GameHub : Hub, IConnected, IDisconnect
    {
        private static ControlRequestManager _controlRequestManager = new ControlRequestManager();

        private readonly Game _game;

        public GameHub() : this(Game.Instance) { }

        public GameHub(Game game)
        {
            _game = game;
        }

        #region Connection Methods
        public Task Connect()
        {
            _game.ConnectionManager.OnConnected(Context.ConnectionId);
            return null;
        }

        public Task Reconnect(IEnumerable<string> groups)
        {
            _game.ConnectionManager.OnReconnected(Context.ConnectionId);
            return null;
        }

        public Task Disconnect()
        {
            _game.ConnectionManager.OnDisconnected(Context.ConnectionId);
            return null;
        }

        #endregion

        #region Client Accessor Methods

        #region Control requests

        public bool requestControlOf(string shipName)
        {
            User to = null;
            foreach (string connectionID in _game.UserHandler.GetUserConnectionIds())
            {
                if (connectionID != Context.ConnectionId && _game.UserHandler.GetUserShip(connectionID).Name == shipName)
                {
                    to = _game.UserHandler.GetUser(connectionID);
                    break;
                }
            }

            if (to != null)
            {
                if (_controlRequestManager.Add(Context.ConnectionId, to.ConnectionID))
                {
                    Clients[to.ConnectionID].controlRequest();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public void acceptControlRequest()
        {
            string from = _controlRequestManager.PullControlRequest(Context.ConnectionId);

            _game.UserHandler.GetUser(from).MyShip = _game.UserHandler.GetUserShip(Context.ConnectionId);
            _game.UserHandler.GetUser(Context.ConnectionId).RemoteControllers.Add(_game.UserHandler.GetUser(from));

            Clients[from].controlRequestAccepted();
        }

        public void declineControlRequest()
        {
            string from = _controlRequestManager.PullControlRequest(Context.ConnectionId);

            Clients[from].controlRequestDeclined();
        }

        public void stopControlling()
        {
            stopControlling(Context.ConnectionId);
        }

        private void stopControlling(string connectionID)
        {
            _game.UserHandler.GetUserShip(connectionID).Host.RemoteControllers.Remove(_game.UserHandler.GetUser(connectionID));

            // If there's no more remote controllers
            if (_game.UserHandler.GetUserShip(connectionID).Host.RemoteControllers.Count == 0)
            {
                Clients[_game.UserHandler.GetUserShip(connectionID).Host.ConnectionID].controllersStopped();
            }

            _game.UserHandler.GetUser(connectionID).MyShip = null;
        }

        public void stopRemoteControllers()
        {
            foreach (User u in _game.UserHandler.GetUser(Context.ConnectionId).RemoteControllers)
            {
                u.MyShip = null;
                Clients[u.ConnectionID].stopController();
            }

            _game.UserHandler.GetUser(Context.ConnectionId).RemoteControllers.Clear();
        }

        #endregion

        public DateTime ping()
        {
            return DateTime.UtcNow;
        }

        /// <summary>
        /// Called when a ship fire's a bullet
        /// </summary>
        public void fire()
        {
            Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

            if (ship.LifeController.Alive)
            {
                Bullet bullet = ship.GetWeaponController().Fire();

                if (bullet != null)
                {
                    _game.HandleBullet(bullet);
                }
            }
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public object initializeClient()
        {
            return _game.initializeClient(Context.ConnectionId);
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public object initializeController()
        {
            return _game.initializeController(Context.ConnectionId);
        }

        public void readyForPayloads()
        {
            _game.UserHandler.GetUser(Context.ConnectionId).ReadyForPayloads = true;
        }

        /// <summary>
        /// Resets all movement flags on the ship
        /// </summary>
        /// <param name="pingBack"></param>
        public void resetMovement(List<string> movementList, bool pingBack)
        {
            if (pingBack)
            {
                Caller.pingBack();
            }

            List<Movement> result = new List<Movement>();
            foreach (string where in movementList)
            {
                result.Add((Movement)Enum.Parse(typeof(Movement), where));
            }

            Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

            if (ship.LifeController.Alive)
            {
                ship.ResetMoving(result);
            }
        }

        public void startAndStopMovement(string toStop, string toStart, bool pingBack)
        {
            if (pingBack)
            {
                Caller.pingBack();
            }

            Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

            if (ship.LifeController.Alive)
            {
                Movement whereToStop = (Movement)Enum.Parse(typeof(Movement), toStop);
                Movement whereToStart = (Movement)Enum.Parse(typeof(Movement), toStart);
                ship.StopMoving(whereToStop);
                ship.StartMoving(whereToStart);
            }
        }

        /// <summary>
        /// Registers the start of a movement on a clint.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to start moving</param>
        public void registerMoveStart(string movement, bool pingBack)
        {
            if (pingBack)
            {
                Caller.pingBack();
            }

            Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

            if (ship.LifeController.Alive)
            {
                Movement where = (Movement)Enum.Parse(typeof(Movement), movement);
                ship.StartMoving(where);
            }
        }

        /// <summary>
        /// Registers the stop of a movement on a client.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to stop moving</param>
        public void registerMoveStop(string movement, bool pingBack)
        {
            if (pingBack)
            {
                Caller.pingBack();
            }

            Movement where = (Movement)Enum.Parse(typeof(Movement), movement);

            Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

            if (ship.LifeController.Alive)
            {
                ship.StopMoving(where);
            }
        }

        public void changeName(string newName)
        {
            if (newName.Length > 25)
            {
                newName = newName.Substring(0, 25);
            }

            _game.UserHandler.GetUserShip(Context.ConnectionId).Name = newName;
        }

        public void changeViewport(int viewportWidth, int viewportHeight)
        {
            if (_game.UserHandler.UserExists(Context.ConnectionId))
            {
                _game.UserHandler.GetUser(Context.ConnectionId).Viewport = new Size(viewportWidth, viewportHeight);
            }
        }

        public void readyForLeaderboardPayloads()
        {
            _game.UserHandler.GetUser(Context.ConnectionId).IdleManager.RecordActivity();
            _game.Leaderboard.RequestLeaderboard(Context.ConnectionId);
        }

        public void stopLeaderboardPayloads()
        {
            _game.UserHandler.GetUser(Context.ConnectionId).IdleManager.RecordActivity();
            _game.Leaderboard.StopRequestingLeaderboard(Context.ConnectionId);
        }

        #endregion
    }
}