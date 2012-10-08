using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Timers;
using SignalR.Hubs;

namespace ShootR
{
    [HubName("h")]
    public class GameEnvironment : Hub, IConnected, IDisconnect
    {
        // How frequently the Update loop is executed
        public const int UPDATE_INTERVAL = 20; // Must evenly divide into DRAW_INTERVAL
        // How frequently the Draw loop is executed.  Draw is what triggers the client side pings, it must be larger than UPDATE_INTERVAL but
        public const int DRAW_INTERVAL = 40;
        // Will trigger Draw after X many update intervals;
        private const int DRAW_AFTER = DRAW_INTERVAL / UPDATE_INTERVAL;

        public static PayloadManager payloadManager = new PayloadManager();
        public static Timer updateTimer = new Timer(UPDATE_INTERVAL);
        public static GameTime gameTime = new GameTime();

        private static ConcurrentDictionary<string, User> _userList = new ConcurrentDictionary<string, User>();
        private static ControlRequestManager _controlRequestManager = new ControlRequestManager();
        private static ConfigurationManager _configuration = new ConfigurationManager();        
        private static Map _space = new Map();
        private static GameHandler _gameHandler = new GameHandler(_space);
        private static Random _gen = new Random();
        private static int _updateCount = 0;
        private static object _locker = new object();

        public GameEnvironment()
        {
            if (!updateTimer.Enabled)
            {
                updateTimer.Enabled = true;
                updateTimer.Elapsed += new ElapsedEventHandler(Update);
                updateTimer.Start();
            }
        }

        /// <summary>
        /// Sends down batches of data to the clients in order to update their screens
        /// </summary>
        private void Draw()
        {
            Dictionary<string, object[]> payloads = payloadManager.GetPayloads(_userList, _gameHandler.ShipManager.Ships.Count, _gameHandler.BulletManager.Bullets.Count, _space);

            foreach (string connectionID in payloads.Keys)
            {
                // Client function is small to limit payload size
                Clients[connectionID].d(payloads[connectionID]);
            }
        }

        /// <summary>
        /// Keeps the physics and the movements of the game calculated.  This is used primarily to do server side validation.
        /// If there is an innaproprite move on the client the server will correct it.
        /// </summary>
        private void Update(object sender, ElapsedEventArgs e)
        {
            lock (_locker)
            {
                gameTime.Update();
                _gameHandler.Update(gameTime);
                _space.Update();

                if (++_updateCount % DRAW_AFTER == 0)
                {
                    _updateCount = 0; // Reset update count to 0
                    Draw();
                }
            }
        }

        #region Connection Methods
        public System.Threading.Tasks.Task Connect()
        {
            return null;
        }

        public System.Threading.Tasks.Task Reconnect(IEnumerable<string> groups)
        {
            lock (_locker)
            {
                // On reconnect, force the user to refresh
                if (_userList.ContainsKey(Context.ConnectionId))
                {
                    User u;
                    _userList.TryRemove(Context.ConnectionId, out u);
                }

                if (_gameHandler.ShipManager.Ships.ContainsKey(Context.ConnectionId))
                {
                    _gameHandler.ShipManager.RemoveShipByKey(Context.ConnectionId);
                }
                return null;
            }
        }

        /// <summary>
        /// On disconnect we need to remove the ship from our list of ships within the gameHandler.
        /// This also means we need to notify clients that the ship has been removed.
        /// </summary>
        public System.Threading.Tasks.Task Disconnect()
        {
            lock (_locker)
            {
                if (_userList.ContainsKey(Context.ConnectionId))
                {
                    User u;
                    _userList.TryRemove(Context.ConnectionId, out u);

                    if (_gameHandler.ShipManager.Ships.ContainsKey(Context.ConnectionId))
                    {
                        _gameHandler.ShipManager.Ships[Context.ConnectionId].Dispose();
                    }
                }
                return null;
            }
        }

        #endregion

        #region Client Accessor Methods

        public bool requestControlOf(string shipName)
        {
            User to = null;
            foreach (string connectionID in _userList.Keys)
            {
                if (connectionID != Context.ConnectionId && _userList[connectionID].MyShip.Name == shipName)
                {
                    to = _userList[connectionID];
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

            _userList[from].MyShip = _userList[Context.ConnectionId].MyShip;
            _userList[Context.ConnectionId].RemoteControllers.Add(_userList[from]);

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
            _userList[connectionID].MyShip.Host.RemoteControllers.Remove(_userList[connectionID]);

            // If there's no more remote controllers
            if (_userList[connectionID].MyShip.Host.RemoteControllers.Count == 0)
            {
                Clients[_userList[connectionID].MyShip.Host.ConnectionID].controllersStopped();
            }

            _userList[connectionID].MyShip = null;
        }

        public void stopRemoteControllers()
        {
            foreach (User u in _userList[Context.ConnectionId].RemoteControllers)
            {
                u.MyShip = null;
                Clients[u.ConnectionID].stopController();
            }

            _userList[Context.ConnectionId].RemoteControllers.Clear();
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
            Bullet bullet = _userList[Context.ConnectionId].MyShip.GetWeaponController().Fire();


            if (bullet != null)
            {
                if (!_space.OnMap(bullet))
                {
                    bullet.HandleOutOfBounds();
                }

                _gameHandler.CollisionManager.Monitor(bullet);
            }
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public object initializeClient()
        {
            lock (_locker)
            {
                int x = _gen.Next(Ship.WIDTH * 2, Map.WIDTH - Ship.WIDTH * 2);
                int y = _gen.Next(Ship.HEIGHT * 2, Map.HEIGHT - Ship.HEIGHT * 2);

                Ship ship = new Ship(new Vector2(x, y), _gameHandler.BulletManager);
                _gameHandler.ShipManager.Add(ship, Context.ConnectionId);
                ship.Name = "Ship" + ship.ID;

                User u = new User(Context.ConnectionId, ship);
                ship.Host = u;
                _userList.TryAdd(Context.ConnectionId, u);
                _gameHandler.CollisionManager.Monitor(ship);
            }

            return new
            {
                Configuration = _configuration,
                CompressionContracts = new
                {
                    PayloadContract = payloadManager.Compressor.PayloadCompressionContract,
                    CollidableContract = payloadManager.Compressor.CollidableCompressionContract,
                    ShipContract = payloadManager.Compressor.ShipCompressionContract,
                    BulletContract = payloadManager.Compressor.BulletCompressionContract,
                },
                ShipID = _userList[Context.ConnectionId].MyShip.ID,
                ShipName = _userList[Context.ConnectionId].MyShip.Name
            };
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public object initializeController()
        {
            _userList.TryAdd(Context.ConnectionId, new User(Context.ConnectionId));                

            return new
            {
                Configuration = _configuration,
                CompressionContracts = new
                {
                    PayloadContract = payloadManager.Compressor.PayloadCompressionContract,
                    CollidableContract = payloadManager.Compressor.CollidableCompressionContract,
                    ShipContract = payloadManager.Compressor.ShipCompressionContract,
                    BulletContract = payloadManager.Compressor.BulletCompressionContract,
                }
            };
        }

        public void readyForPayloads()
        {
            _userList[Context.ConnectionId].ReadyForPayloads = true;
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

            _userList[Context.ConnectionId].MyShip.ResetMoving(result);
        }

        public void startAndStopMovement(string toStop, string toStart, bool pingBack)
        {
            if (pingBack)
            {
                Caller.pingBack();
            }

            Movement whereToStop = (Movement)Enum.Parse(typeof(Movement), toStop);
            Movement whereToStart = (Movement)Enum.Parse(typeof(Movement), toStart);
            _userList[Context.ConnectionId].MyShip.StopMoving(whereToStop);
            _userList[Context.ConnectionId].MyShip.StartMoving(whereToStart);
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
            _userList[Context.ConnectionId].MyShip.StartMoving(where);
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
            _userList[Context.ConnectionId].MyShip.StopMoving(where);
        }

        public void changeName(string newName)
        {
            if (newName.Length > 25)
            {
                newName = newName.Substring(0,25);
            }
            _gameHandler.ShipManager.Ships[Context.ConnectionId].Name = newName;
        }

        public void changeViewport(int viewportWidth, int viewportHeight)
        {
            if (_userList.ContainsKey(Context.ConnectionId))
            {
                _userList[Context.ConnectionId].Viewport = new Size(viewportWidth, viewportHeight);
            }
        }

        #endregion
    }
}