using System;
using System.Collections.Generic;
using System.Timers;
using SignalR.Hubs;

namespace ShootR
{
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
        public static int shipCount = 0;

        private static ConfigurationManager _configuration = new ConfigurationManager();
        private static int _updateCount = 0;
        private static Map _space = new Map();
        private static GameHandler _gameHandler = new GameHandler(_space);
        private static Random gen = new Random();
        public static object locker = new object();

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
            Dictionary<string, Payload> payloads = payloadManager.GetPayloads(_gameHandler.ships, _gameHandler.BulletManager.BulletsInAir.Count, _space);

            foreach (string connectionID in payloads.Keys)
            {
                Clients[connectionID].LoadMapInfo(payloads[connectionID]);
            }
        }

        /// <summary>
        /// Keeps the physics and the movements of the game calculated.  This is used primarily to do server side validation.
        /// If there is an innaproprite move on the client the server will correct it.
        /// </summary>
        public void Update(object sender, ElapsedEventArgs e)
        {
            lock (locker)
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
            lock (locker)
            {
                int x = gen.Next(Ship.WIDTH * 2, Map.WIDTH - Ship.WIDTH * 2);
                int y = gen.Next(Ship.HEIGHT * 2, Map.HEIGHT - Ship.HEIGHT * 2);

                Ship s = new Ship(Context.ConnectionId, new Vector2(x,y), _gameHandler.BulletManager);
                s.Name = "Ship" + shipCount++;
                _gameHandler.AddShip(s, Context.ConnectionId);
                _gameHandler.CollisionManager.Monitor(s);
                Caller.updateShipName(s.Name);
                return null;
            }
        }

        public System.Threading.Tasks.Task Reconnect(IEnumerable<string> groups)
        {
            return null;
        }

        /// <summary>
        /// On disconnect we need to remove the ship from our list of ships within the gameHandler.
        /// This also means we need to notify clients that the ship has been removed.
        /// </summary>
        public System.Threading.Tasks.Task Disconnect()
        {
            lock (locker)
            {
                _gameHandler.ships[Context.ConnectionId].Dispose();
                return null;
            }
        }

        #endregion

        #region Client Accessor Methods

        /// <summary>
        /// Called when a ship fire's a bullet
        /// </summary>
        public void fire()
        {
            _gameHandler.CollisionManager.Monitor(_gameHandler.ships[Context.ConnectionId].GetWeaponController().Fire());
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public ConfigurationManager getConfiguration()
        {
            return _configuration;
        }

        /// <summary>
        /// Registers the start of a movement on a clint.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to start moving</param>
        public void registerMoveStart(string movement)
        {
            //DateTime dt = DateTime.FromFileTimeUtc(when);
            Movement where = (Movement)Enum.Parse(typeof(Movement), movement);
            _gameHandler.ships[Context.ConnectionId].MovementController.StartMoving(where);
        }

        /// <summary>
        /// Registers the stop of a movement on a client.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to stop moving</param>
        public void registerMoveStop(string movement)
        {
            Movement where = (Movement)Enum.Parse(typeof(Movement), movement);
            _gameHandler.ships[Context.ConnectionId].MovementController.StopMoving(where);
        }

        public void changeName(string newName)
        {
            _gameHandler.ships[Context.ConnectionId].Name = newName;
        }

        #endregion
    }
}