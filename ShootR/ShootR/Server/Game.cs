using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace ShootR
{
    public class Game
    {
        private readonly static Lazy<Game> _instance = new Lazy<Game>(() => new Game());
        private Timer _gameLoop, _leaderboardLoop;
        private ConfigurationManager _configuration;
        private GameTime _gameTime;
        private Map _space;
        private GameHandler _gameHandler;
        private PayloadManager _payloadManager;

        private int DRAW_AFTER;
        private int _updateCount = 0;
        private object _locker = new object();

        private Game()
        {          
            _configuration = new ConfigurationManager();
            DRAW_AFTER = _configuration.gameConfig.DRAW_INTERVAL / _configuration.gameConfig.UPDATE_INTERVAL;
            _gameLoop = new Timer(Update, null, _configuration.gameConfig.UPDATE_INTERVAL, _configuration.gameConfig.UPDATE_INTERVAL);
            _leaderboardLoop = new Timer(UpdateLeaderboard, null, _configuration.gameConfig.LEADERBOARD_PUSH_INTERVAL, _configuration.gameConfig.LEADERBOARD_PUSH_INTERVAL);

            _gameTime = new GameTime();
            _space = new Map();
            _gameHandler = new GameHandler(_space);
            _payloadManager = new PayloadManager();

            UserHandler = new UserHandler();
            Leaderboard = new Leaderboard(UserHandler);
            ConnectionManager = new ConnectionManager(_gameHandler, UserHandler, _locker);
        }

        public UserHandler UserHandler { get; private set; }
        public ConnectionManager ConnectionManager { get; private set; }
        public Leaderboard Leaderboard { get; private set; }

        private void Update(object state)
        {
            lock (_locker)
            {
                _gameTime.Update();
                _gameHandler.Update(_gameTime);
                _space.Update();

                if (++_updateCount % DRAW_AFTER == 0)
                {
                    _updateCount = 0; // Reset update count to 0
                    Draw();
                }
            }
        }

        /// <summary>
        /// Sends down batches of data to the clients in order to update their screens
        /// </summary>
        private void Draw()
        {
            Dictionary<string, object[]> payloads = _payloadManager.GetGamePayloads(UserHandler.GetUsers(), _gameHandler.ShipManager.Ships.Count, _gameHandler.BulletManager.Bullets.Count, _space);
            IHubContext Context = GetContext();

            foreach (string connectionID in payloads.Keys)
            {
                Context.Client(connectionID).d(payloads[connectionID]);
            }
        }

        private void UpdateLeaderboard(object state)
        {
            List<object> leaderboardEntries = _payloadManager.GetLeaderboardPayloads(Leaderboard.GetAndUpdateLeaderboard());
            PushLeaderboard(leaderboardEntries);
        }

        private void PushLeaderboard(List<object> leaderboard)
        {
            GetContext().Group(Leaderboard.LEADERBOARD_REQUESTEE_GROUP).l(leaderboard);
        }

        public static IHubContext GetContext()
        {            
            return GlobalHost.ConnectionManager.GetHubContext<GameHub>();
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public object initializeClient(string connectionId)
        {
            lock (_locker)
            {                
                Ship ship = new Ship(RespawnManager.GetRandomStartPosition(), _gameHandler.BulletManager);
                _gameHandler.ShipManager.Add(ship, connectionId);
                ship.Name = "Ship" + ship.ID;

                User user = new User(connectionId, ship) { Controller = false };
                ship.Host = user;
                UserHandler.AddUser(user);
                _gameHandler.CollisionManager.Monitor(ship);
            }

            return new
            {
                Configuration = _configuration,
                CompressionContracts = new
                {
                    PayloadContract = _payloadManager.Compressor.PayloadCompressionContract,
                    CollidableContract = _payloadManager.Compressor.CollidableCompressionContract,
                    ShipContract = _payloadManager.Compressor.ShipCompressionContract,
                    BulletContract = _payloadManager.Compressor.BulletCompressionContract,
                    LeaderboardEntryContract = _payloadManager.Compressor.LeaderboardEntryCompressionContract
                },
                ShipID = UserHandler.GetUserShip(connectionId).ID,
                ShipName = UserHandler.GetUserShip(connectionId).Name
            };
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public object initializeController(string connectionId)
        {
            UserHandler.AddUser(new User(connectionId) { Controller = true });

            return new
            {
                Configuration = _configuration,
                CompressionContracts = new
                {
                    PayloadContract = _payloadManager.Compressor.PayloadCompressionContract,
                    CollidableContract = _payloadManager.Compressor.CollidableCompressionContract,
                    ShipContract = _payloadManager.Compressor.ShipCompressionContract,
                    BulletContract = _payloadManager.Compressor.BulletCompressionContract,
                    LeaderboardEntryCompressionContract = _payloadManager.Compressor.LeaderboardEntryCompressionContract
                }
            };
        }

        public void HandleBullet(Bullet bullet)
        {
            if (!_space.OnMap(bullet))
            {
                bullet.HandleOutOfBounds();
            }

            _gameHandler.CollisionManager.Monitor(bullet);
        }

        public static Game Instance
        {
            get
            {
                return _instance.Value;
            }
        }
    }

}