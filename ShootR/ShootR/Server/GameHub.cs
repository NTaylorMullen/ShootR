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

        public DateTime ping()
        {
            return DateTime.UtcNow;
        }

        /// <summary>
        /// Called when a ship fire's a bullet
        /// </summary>
        public void fire()
        {
            if (_game.UserHandler.UserExists(Context.ConnectionId))
            {
                Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                if (ship.LifeController.Alive)
                {
                    ship.WeaponController.Fire();
                }
            }
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public object initializeClient(string registrationID)
        {
            if (_game.RegistrationHandler.RegistrationExists(registrationID))
            {
                return _game.initializeClient(Context.ConnectionId, _game.RegistrationHandler.RemoveRegistration(registrationID));
            }

            return null;
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public object initializeController(string registrationID)
        {
            if (_game.RegistrationHandler.RegistrationExists(registrationID))
            {
                return _game.initializeController(Context.ConnectionId, _game.RegistrationHandler.RemoveRegistration(registrationID));
            }

            return null;
        }

        public void readyForPayloads()
        {
            _game.UserHandler.GetUser(Context.ConnectionId).ReadyForPayloads = true;
        }

        /// <summary>
        /// Resets all movement flags on the ship
        /// </summary>
        /// <param name="pingBack"></param>
        public void resetMovement(List<string> movementList, bool pingBack, long commandID)
        {
            if (_game.UserHandler.UserExists(Context.ConnectionId))
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
                    ship.ResetMoving(result, commandID);
                }
            }
        }

        public void startAndStopMovement(string toStop, string toStart, bool pingBack, long commandID)
        {
            if (_game.UserHandler.UserExists(Context.ConnectionId))
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
                    ship.StopMoving(whereToStop, commandID);
                    ship.StartMoving(whereToStart, commandID);
                }
            }
        }

        /// <summary>
        /// Registers the start of a movement on a clint.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to start moving</param>
        public void registerMoveStart(string movement, bool pingBack, long commandID)
        {
            if (_game.UserHandler.UserExists(Context.ConnectionId))
            {
                if (pingBack)
                {
                    Caller.pingBack();
                }

                Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                if (ship.LifeController.Alive)
                {
                    Movement where = (Movement)Enum.Parse(typeof(Movement), movement);
                    ship.StartMoving(where, commandID);
                }
            }
        }

        /// <summary>
        /// Registers the stop of a movement on a client.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to stop moving</param>
        public void registerMoveStop(string movement, bool pingBack, long commandID)
        {
            if (_game.UserHandler.UserExists(Context.ConnectionId))
            {
                if (pingBack)
                {
                    Caller.pingBack();
                }

                Movement where = (Movement)Enum.Parse(typeof(Movement), movement);

                Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                if (ship.LifeController.Alive)
                {
                    ship.StopMoving(where, commandID);
                }
            }
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
            if (_game.UserHandler.UserExists(Context.ConnectionId))
            {
                _game.UserHandler.GetUser(Context.ConnectionId).IdleManager.RecordActivity();
                _game.Leaderboard.RequestLeaderboard(Context.ConnectionId);
            }
        }

        public void stopLeaderboardPayloads()
        {
            if (_game.UserHandler.UserExists(Context.ConnectionId))
            {
                _game.UserHandler.GetUser(Context.ConnectionId).IdleManager.RecordActivity();
                _game.Leaderboard.StopRequestingLeaderboard(Context.ConnectionId);
            }
        }

        #endregion
    }
}