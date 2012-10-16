using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using SignalR;
using SignalR.Hubs;

namespace ShootR
{
    public class Game
    {
        private readonly static Lazy<Game> _instance = new Lazy<Game>(() => new Game());
        private Timer _gameLoop, _leaderboardLoop;
        private ConfigurationManager _configuration;
        private GameTime _gameTime;
        private Map _space;        
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
            GameHandler = new GameHandler(_space);
            _payloadManager = new PayloadManager();

            UserHandler = new UserHandler(GameHandler);
            Leaderboard = new Leaderboard(UserHandler);
            ConnectionManager = new ConnectionManager(UserHandler, _locker);
        }

        public UserHandler UserHandler { get; private set; }
        public ConnectionManager ConnectionManager { get; private set; }
        public Leaderboard Leaderboard { get; private set; }
        public GameHandler GameHandler { get; set; }

        private void Update(object state)
        {
            lock (_locker)
            {
                try
                {
                    _gameTime.Update();
                    GameHandler.Update(_gameTime);
                    _space.Update();

                    if (++_updateCount % DRAW_AFTER == 0)
                    {
                        _updateCount = 0; // Reset update count to 0
                        Draw();
                    }
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);                    
                }
            }
        }

        /// <summary>
        /// Sends down batches of data to the clients in order to update their screens
        /// </summary>
        private void Draw()
        {
            Dictionary<string, object[]> payloads = _payloadManager.GetGamePayloads(UserHandler.GetUsers(), GameHandler.ShipCount(), GameHandler.BulletManager.Bullets.Count, _space);
            dynamic Clients = GetContext().Clients;

            foreach (string connectionID in payloads.Keys)
            {
                Clients[connectionID].d(payloads[connectionID]);
            }
        }

        private void UpdateLeaderboard(object state)
        {
            List<object> leaderboardEntries = _payloadManager.GetLeaderboardPayloads(Leaderboard.GetAndUpdateLeaderboard());
            PushLeaderboard(leaderboardEntries);
        }

        private void PushLeaderboard(List<object> leaderboard)
        {
            GetContext().Clients[Leaderboard.LEADERBOARD_REQUESTEE_GROUP].l(leaderboard);
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
                Ship ship = new Ship(RespawnManager.GetRandomStartPosition(), GameHandler.BulletManager);

                User user = new User(connectionId, ship) { Controller = false };
                ship.Host = user;
                UserHandler.AddUser(user);
                GameHandler.AddShipToGame(ship);
                ship.Name = "Ship" + ship.ID;
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

            GameHandler.AddBulletToGame(bullet);
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