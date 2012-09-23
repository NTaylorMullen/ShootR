using System;
using System.Collections.Generic;
using System.Timers;
using SignalR.Hubs;

namespace ShootR
{
    public class GameEnvironment : Hub, IConnected, IDisconnect
    {
        public const int MAP_WIDTH = 5000;
        public const int MAP_HEIGHT = 5000;
        public const int MAP_MIN_WIDTH = 156;
        public const int MAP_MIN_HEIGHT = 156;

        // How frequently the Update loop is executed
        public const int UPDATE_INTERVAL = 20; // Must evenly divide into DRAW_INTERVAL
        // How frequently the Draw loop is executed.  Draw is what triggers the client side pings, it must be larger than UPDATE_INTERVAL but
        public const int DRAW_INTERVAL = 40;
        // Will trigger Draw after X many update intervals;
        private const int DRAW_AFTER = DRAW_INTERVAL / UPDATE_INTERVAL;

        public static PayloadManager payloadManager = new PayloadManager();
        public static Timer updateTimer = new Timer(UPDATE_INTERVAL);
        public static GameTime gameTime = new GameTime();

        private static ConfigurationManager _configuration = new ConfigurationManager();
        private static int _updateCount = 0;
        private static QuadTree Map = new QuadTree(MAP_WIDTH, MAP_HEIGHT, MAP_MIN_WIDTH, MAP_MIN_HEIGHT);
        private static GameHandler _gameHandler = new GameHandler(Map);

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
            Dictionary<string, Payload> payloads = payloadManager.GetPayloads(_gameHandler.ships, _gameHandler.bulletManager.bulletsInAir, _gameHandler.GetDisposedAmunition());

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
            gameTime.Update();
            _gameHandler.Update(gameTime);
            Map.Update();

            if (++_updateCount % DRAW_AFTER == 0)
            {
                _updateCount = 0; // Reset update count to 0
                Draw();
            }
        }

        #region Connection Methods
        public System.Threading.Tasks.Task Connect()
        {
            _gameHandler.collisionManager.Monitor(_gameHandler.AddShip(new Ship(new Vector2(MAP_WIDTH * .5, MAP_HEIGHT * .5), _gameHandler.bulletManager), Context.ConnectionId));
            return null;
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
            // Map.Remove(_gameHandler.RemoveShipByKey(Context.ConnectionId));
            _gameHandler.RemoveShipByKey(Context.ConnectionId);
            return Clients.RemoveShip(Context.ConnectionId);
        }

        #endregion

        #region Client Accessor Methods

        /// <summary>
        /// Called when a ship fire's a bullet
        /// </summary>
        public void fire()
        {
            _gameHandler.collisionManager.Monitor(_gameHandler.ships[Context.ConnectionId].WeaponController.Fire());
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

        #endregion
    }
}