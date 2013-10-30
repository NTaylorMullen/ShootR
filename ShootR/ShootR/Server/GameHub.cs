using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Threading.Tasks;
using System.Diagnostics;

namespace ShootR
{
    [HubName("h")]
    public class GameHub : Hub
    {
        private readonly Game _game;

        public GameHub() : this(Game.Instance) { }

        public GameHub(Game game)
        {
            _game = game;
        }

        #region Connection Methods
        public override Task OnConnected()
        {
            _game.ConnectionManager.OnConnected(Context.ConnectionId);
            return base.OnConnected();
        }

        public override Task OnReconnected()
        {
            _game.ConnectionManager.OnReconnected(Context.ConnectionId);
            return base.OnReconnected();
        }

        public override Task OnDisconnected()
        {
            _game.ConnectionManager.OnDisconnected(Context.ConnectionId);
            return base.OnDisconnected();
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
        public double fire()
        {
            try
            {
                if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
                {

                    Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                    if (ship.Controllable.Value)
                    {
                        ship.WeaponController.Fire(DateTime.UtcNow);
                    }
                    return ship.WeaponController.Energy;

                }
                throw new Exception("Could not find user when firing.");

            }
            catch (Exception e)
            {
                ErrorLog.Instance.Log(e);
            }

            return 0;
        }

        /// <summary>
        /// Called when a ship starts firing a stream of bullet at the maximum possible rate
        /// </summary>
        public void startFire()
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                try
                {
                    Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                    if (ship.Controllable.Value)
                    {
                        ship.WeaponController.AutoFire = true;
                    }
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }
            }
        }


        /// <summary>
        /// Called when a ship stops firing a stream of bullet
        /// </summary>
        public double stopFire()
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                try
                {
                    Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                    ship.WeaponController.AutoFire = false;
                    return ship.WeaponController.Energy;
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }
            }

            return 0;
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
            try
            {
                _game.UserHandler.GetUser(Context.ConnectionId).ReadyForPayloads = true;
            }
            catch (Exception e)
            {
                ErrorLog.Instance.Log(e);
            }
        }

        public virtual void syncMovement(Vector2 at, double angle, Vector2 velocity)
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                try
                {
                    _game.UserHandler.GetUserShip(Context.ConnectionId).SyncMovement(at, angle, velocity);
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }
            }
        }

        /// <summary>
        /// Resets all movement flags on the ship
        /// </summary>
        /// <param name="pingBack"></param>
        public void resetMovement(List<string> movementList, Vector2 at, double angle, Vector2 velocity, bool pingBack)
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                try
                {
                    if (pingBack)
                    {
                        Clients.Caller.pingBack();
                    }

                    Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                    if (ship.Controllable.Value)
                    {
                        List<Movement> result = new List<Movement>();
                        foreach (string where in movementList)
                        {
                            result.Add((Movement)Enum.Parse(typeof(Movement), where));
                        }

                        ship.ResetMoving(result, at, angle, velocity);
                    }
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }
            }
        }

        public void startAndStopMovement(string toStop, string toStart, Vector2 at, double angle, Vector2 velocity, bool pingBack)
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                try
                {
                    if (pingBack)
                    {
                        Clients.Caller.pingBack();
                    }

                    Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                    if (ship.Controllable.Value)
                    {
                        Movement whereToStop = (Movement)Enum.Parse(typeof(Movement), toStop);
                        Movement whereToStart = (Movement)Enum.Parse(typeof(Movement), toStart);
                        ship.StopMoving(whereToStop, at, angle, velocity);
                        ship.StartMoving(whereToStart, at, angle, velocity);
                    }
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }
            }
        }

        /// <summary>
        /// Registers the start of a movement on a clint.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to start moving</param>
        public void registerMoveStart(string movement, Vector2 at, double angle, Vector2 velocity, bool pingBack)
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                try
                {
                    if (pingBack)
                    {
                        Clients.Caller.pingBack();
                    }

                    Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                    if (ship.Controllable.Value)
                    {
                        Movement where = (Movement)Enum.Parse(typeof(Movement), movement);
                        ship.StartMoving(where, at, angle, velocity);
                    }
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }
            }
        }

        /// <summary>
        /// Registers the stop of a movement on a client.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to stop moving</param>
        public void registerMoveStop(string movement, Vector2 at, double angle, Vector2 velocity, bool pingBack)
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                try
                {
                    if (pingBack)
                    {
                        Clients.Caller.pingBack();
                    }

                    Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                    if (ship.Controllable.Value)
                    {
                        Movement where = (Movement)Enum.Parse(typeof(Movement), movement);
                        ship.StopMoving(where, at, angle, velocity);
                    }
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }
            }
        }

        public void registerAbilityStart(string abilityName, Vector2 at, double angle, Vector2 velocity, bool pingBack)
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                try
                {
                    if (pingBack)
                    {
                        Clients.Caller.pingBack();
                    }

                    Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                    if (ship.Controllable.Value)
                    {
                        ship.ActivateAbility(abilityName, at, angle, velocity);
                    }
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }
            }
        }

        public void registerAbilityStop(string abilityName, Vector2 at, double angle, Vector2 velocity, bool pingBack)
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                try
                {
                    if (pingBack)
                    {
                        Clients.Caller.pingBack();
                    }

                    Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                    if (ship.Controllable.Value)
                    {
                        ship.DeactivateAbility(abilityName, at, angle, velocity);
                    }
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }
            }
        }

        public void registerAbilityStop(string ability)
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
            }
        }

        public void changeViewport(int viewportWidth, int viewportHeight)
        {
            try
            {
                if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
                {
                    _game.UserHandler.GetUser(Context.ConnectionId).Viewport = new Size(viewportWidth, viewportHeight);
                }
            }
            catch (Exception e)
            {
                ErrorLog.Instance.Log(e);
            }
        }

        public void readyForLeaderboardPayloads()
        {
            try
            {
                if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
                {
                    _game.UserHandler.GetUser(Context.ConnectionId).IdleManager.RecordActivity();
                    _game.Leaderboard.RequestLeaderboard(Context.ConnectionId);
                }
            }
            catch (Exception e)
            {
                ErrorLog.Instance.Log(e);
            }
        }

        public void stopLeaderboardPayloads()
        {
            try
            {
                if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
                {
                    _game.UserHandler.GetUser(Context.ConnectionId).IdleManager.RecordActivity();
                    _game.Leaderboard.StopRequestingLeaderboard(Context.ConnectionId);
                }
            }
            catch (Exception e)
            {
                ErrorLog.Instance.Log(e);
            }
        }

        public void sendMessage(string message)
        {
            try
            {
                if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
                {
                    Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);
                    var from = ship.Name;

                    //TODO: send a message to #shootr using the jabbr c# client later
                    Clients.Others.chatMessage(from, message, 0 /* standard message */);
                }
            }
            catch (Exception e)
            {
                ErrorLog.Instance.Log(e);
            }
        }
        #endregion
    }
}