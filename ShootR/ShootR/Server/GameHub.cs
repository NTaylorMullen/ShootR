using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Threading;
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
            _game.ConnectionManager.OnConnect(Context.ConnectionId);            
            return null;
        }

        public Task Reconnect(IEnumerable<string> groups)
        {
            _game.ConnectionManager.OnReconnect(Context.ConnectionId);
            return null;
        }

        public Task Disconnect()
        {
            _game.ConnectionManager.OnDisconnect(Context.ConnectionId);
            return null;
        }

        #endregion

        #region Client Accessor Methods

        public bool requestControlOf(string shipName)
        {
            User to = null;
            foreach (string connectionID in _game.UserList.Keys)
            {
                if (connectionID != Context.ConnectionId && _game.UserList[connectionID].MyShip.Name == shipName)
                {
                    to = _game.UserList[connectionID];
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

            _game.UserList[from].MyShip = _game.UserList[Context.ConnectionId].MyShip;
            _game.UserList[Context.ConnectionId].RemoteControllers.Add(_game.UserList[from]);

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
            _game.UserList[connectionID].MyShip.Host.RemoteControllers.Remove(_game.UserList[connectionID]);

            // If there's no more remote controllers
            if (_game.UserList[connectionID].MyShip.Host.RemoteControllers.Count == 0)
            {
                Clients[_game.UserList[connectionID].MyShip.Host.ConnectionID].controllersStopped();
            }

            _game.UserList[connectionID].MyShip = null;
        }

        public void stopRemoteControllers()
        {
            foreach (User u in _game.UserList[Context.ConnectionId].RemoteControllers)
            {
                u.MyShip = null;
                Clients[u.ConnectionID].stopController();
            }

            _game.UserList[Context.ConnectionId].RemoteControllers.Clear();
        }

        public DateTime ping()
        {
            return DateTime.UtcNow;
        }

        /// <summary>
        /// Called when a ship fire's a bullet
        /// </summary>
        public void fire()
        {
            Bullet bullet = _game.UserList[Context.ConnectionId].MyShip.GetWeaponController().Fire();


            if (bullet != null)
            {
                _game.HandleBullet(bullet);
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
            _game.UserList[Context.ConnectionId].ReadyForPayloads = true;
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

            _game.UserList[Context.ConnectionId].MyShip.ResetMoving(result);
        }

        public void startAndStopMovement(string toStop, string toStart, bool pingBack)
        {
            if (pingBack)
            {
                Caller.pingBack();
            }

            Movement whereToStop = (Movement)Enum.Parse(typeof(Movement), toStop);
            Movement whereToStart = (Movement)Enum.Parse(typeof(Movement), toStart);
            _game.UserList[Context.ConnectionId].MyShip.StopMoving(whereToStop);
            _game.UserList[Context.ConnectionId].MyShip.StartMoving(whereToStart);
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

            Movement where = (Movement)Enum.Parse(typeof(Movement), movement);
            _game.UserList[Context.ConnectionId].MyShip.StartMoving(where);
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
            _game.UserList[Context.ConnectionId].MyShip.StopMoving(where);
        }

        public void changeName(string newName)
        {
            if (newName.Length > 25)
            {
                newName = newName.Substring(0, 25);
            }
            _game.UserList[Context.ConnectionId].MyShip.Name = newName;
        }

        public void changeViewport(int viewportWidth, int viewportHeight)
        {
            if (_game.UserList.ContainsKey(Context.ConnectionId))
            {
                _game.UserList[Context.ConnectionId].Viewport = new Size(viewportWidth, viewportHeight);
            }
        }

        #endregion
    }
}