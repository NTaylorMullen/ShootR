using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
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
        private static ConfigurationManager _configuration = new ConfigurationManager();
        private static int _updateCount = 0;
        private static Map _space = new Map();
        private static GameHandler _gameHandler = new GameHandler(_space);
        private static Random gen = new Random();
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
        public void Draw()
        {
            Dictionary<string, object[]> payloads = payloadManager.GetPayloads(_userList, _gameHandler.ShipManager.Ships.Count, _gameHandler.BulletManager.BulletsInAir.Count, _space);

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
        public void Update(object sender, ElapsedEventArgs e)
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

        /// <summary>
        /// Used to indicate to the client the "movement" that.Latency, aka the time it takes for a movement command to get to the server
        /// </summary>
        public void FlagMovementTimestamp()
        {
            if (!_userList[Context.ConnectionId].MovementReceivedAt.HasValue)
            {
                _userList[Context.ConnectionId].MovementReceivedAt = new DateTime?(DateTime.UtcNow);
            }
        }

        #region Connection Methods
        public System.Threading.Tasks.Task Connect()
        {
            lock (_locker)
            {
                PayloadCompressor comp = new PayloadCompressor();

                int x = gen.Next(Ship.WIDTH * 2, Map.WIDTH - Ship.WIDTH * 2);
                int y = gen.Next(Ship.HEIGHT * 2, Map.HEIGHT - Ship.HEIGHT * 2);

                Ship ship = new Ship(new Vector2(x, y), _gameHandler.BulletManager);
                _gameHandler.ShipManager.AddShip(ship, Context.ConnectionId);
                ship.Name = "Ship" + ship.ID;

                _userList.TryAdd(Context.ConnectionId, new User(Context.ConnectionId, ship));
                _gameHandler.CollisionManager.Monitor(ship);
                return null;
            }
        }

        public System.Threading.Tasks.Task Reconnect(IEnumerable<string> groups)
        {
            lock (_locker)
            {
                // On reconnect, re-instantiate the entire user
                if (_userList.ContainsKey(Context.ConnectionId))
                {
                    User u;
                    _userList.TryRemove(Context.ConnectionId, out u);
                }

                if (_gameHandler.ShipManager.Ships.ContainsKey(Context.ConnectionId))
                {
                    _gameHandler.ShipManager.RemoveShipByKey(Context.ConnectionId);
                }

                Connect();
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
                User u;
                _userList.TryRemove(Context.ConnectionId, out u);
                _gameHandler.ShipManager.Ships[Context.ConnectionId].Dispose();
                return null;
            }
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
            Bullet bullet = _gameHandler.ShipManager.Ships[Context.ConnectionId].GetWeaponController().Fire();

            if (!_space.OnMap(bullet))
            {
                bullet.HandleOutOfBounds();
            }

            if (bullet != null)
            {
                _gameHandler.CollisionManager.Monitor(bullet);
            }
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public object initializeClient()
        {
            return new
            {
                Configuration = _configuration,
                CompressionContracts = new
                {
                    PayloadContract = payloadManager.Compressor.PayloadCompressionContract,
                    CollidableContract = payloadManager.Compressor.CollidableCompressionContract,
                    ShipContract = payloadManager.Compressor.ShipCompressionContract,
                    BulletContract = payloadManager.Compressor.BulletCompressionContract
                },
                ShipID = _userList[Context.ConnectionId].MyShip.ID,
                ShipName = _userList[Context.ConnectionId].MyShip.Name
            };
        }

        public void readyForPayloads()
        {
            _userList[Context.ConnectionId].ReadyForPayloads = true;
        }

        /// <summary>
        /// Registers the start of a movement on a clint.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to start moving</param>
        public void registerMoveStart(string movement)
        {
            FlagMovementTimestamp();
            Movement where = (Movement)Enum.Parse(typeof(Movement), movement);
            _gameHandler.ShipManager.Ships[Context.ConnectionId].StartMoving(where);
        }

        /// <summary>
        /// Registers the stop of a movement on a client.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to stop moving</param>
        public void registerMoveStop(string movement)
        {
            FlagMovementTimestamp();
            Movement where = (Movement)Enum.Parse(typeof(Movement), movement);
            _gameHandler.ShipManager.Ships[Context.ConnectionId].StopMoving(where);
        }

        public void changeName(string newName)
        {
            _gameHandler.ShipManager.Ships[Context.ConnectionId].Name = newName;
        }

        #endregion
    }
}