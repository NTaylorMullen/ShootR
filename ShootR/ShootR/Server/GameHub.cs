using System;
using System.Collections.Generic;
using System.Drawing;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Hubs;

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
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                try
                {
                    Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                    if (ship.Controllable.Value)
                    {
                        ship.WeaponController.Fire(DateTime.UtcNow);
                    }
                    return ship.WeaponController.Energy;
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }
            }
            throw new Exception();
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
            throw new Exception();
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

                        ship.ResetMoving(result, commandID);
                    }
                }
                catch (Exception e)
                {
                    //ErrorLog.Instance.Log(e);
                }
            }
        }

        public void startAndStopMovement(string toStop, string toStart, bool pingBack, long commandID)
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
                        ship.StopMoving(whereToStop, commandID);
                        ship.StartMoving(whereToStart, commandID);
                    }
                }
                catch (Exception e)
                {
                    //ErrorLog.Instance.Log(e);
                }
            }
        }

        /// <summary>
        /// Registers the start of a movement on a clint.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to start moving</param>
        public void registerMoveStart(string movement, bool pingBack, long commandID)
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
                        ship.StartMoving(where, commandID);
                    }
                }
                catch (Exception e)
                {
                    //ErrorLog.Instance.Log(e);
                }
            }
        }

        /// <summary>
        /// Registers the stop of a movement on a client.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to stop moving</param>
        public void registerMoveStop(string movement, bool pingBack, long commandID)
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
                        ship.StopMoving(where, commandID);
                    }
                }
                catch (Exception e)
                {
                    //ErrorLog.Instance.Log(e);
                }
            }
        }

        public void registerAbilityStart(string abilityName, bool pingBack, long commandID)
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
                        ship.ActivateAbility(abilityName, commandID);
                    }
                }
                catch (Exception e)
                {
                }
            }
        }

        public void registerAbilityStop(string abilityName, bool pingBack, long commandID)
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
                        ship.DeactivateAbility(abilityName, commandID);
                    }
                }
                catch (Exception e)
                {
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
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                _game.UserHandler.GetUser(Context.ConnectionId).Viewport = new Size(viewportWidth, viewportHeight);
            }
        }

        public void readyForLeaderboardPayloads()
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                _game.UserHandler.GetUser(Context.ConnectionId).IdleManager.RecordActivity();
                _game.Leaderboard.RequestLeaderboard(Context.ConnectionId);
            }
        }

        public void stopLeaderboardPayloads()
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                _game.UserHandler.GetUser(Context.ConnectionId).IdleManager.RecordActivity();
                _game.Leaderboard.StopRequestingLeaderboard(Context.ConnectionId);
            }
        }

        #endregion

        public void activateLaserCatBomb()
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                try
                {
                    Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                    ship.AbilityHandler.Activate(LaserCatBomb.NAME);
                }
                catch (Exception e)
                {
                }
            }
        }

        public void deactivateLaserCatBomb()
        {
            if (_game.UserHandler.UserExistsAndReady(Context.ConnectionId))
            {
                try
                {
                    Ship ship = _game.UserHandler.GetUserShip(Context.ConnectionId);

                    ship.AbilityHandler.Deactivate(LaserCatBomb.NAME);
                }
                catch (Exception e)
                {
                }
            }
        }
    }
}