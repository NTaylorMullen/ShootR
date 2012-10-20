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
        public const int AIShipsToSpawn = 500;

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

            //SpawnAIShips(AIShipsToSpawn);
        }

        public UserHandler UserHandler { get; private set; }
        public ConnectionManager ConnectionManager { get; private set; }
        public Leaderboard Leaderboard { get; private set; }
        public GameHandler GameHandler { get; set; }

        private void Update(object state)
        {
            lock (_locker)
            {
                DateTime utcNow = DateTime.UtcNow;

                try
                {
                    _gameTime.Update(utcNow);

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

        public void SpawnAIShips(int number)
        {
            for (int i = 0; i < number; i++)
            {
                string connectionidAI = Guid.NewGuid().ToString();
                ShipAI shipAI = new ShipAI(RespawnManager.GetRandomStartPosition(), GameHandler.BulletManager);
                UserAI userAI = new UserAI(connectionidAI, shipAI) { Controller = false };
                UserHandler.AddUser(userAI);
                GameHandler.AddShipToGame(shipAI);
                shipAI.Name = "Ship0" + shipAI.ID;
            }
        }

        /// <summary>
        /// Sends down batches of data to the clients in order to update their screens
        /// </summary>
        private void Draw()
        {
            int shipCount = GameHandler.ShipCount();
            _space.CheckIncreaseMapSize(shipCount);

            Dictionary<string, object[]> payloads = _payloadManager.GetGamePayloads(UserHandler.GetUsers(), shipCount, GameHandler.BulletManager.Bullets.Count, _space);
            dynamic Clients = GetContext().Clients;

            foreach (string connectionID in payloads.Keys)
            {
                UserHandler.GetUser(connectionID).PushToClient(payloads[connectionID], Clients);
            }
        }

        private void UpdateLeaderboard(object state)
        {
            // This will in-frequently throw an error due to race conditions.  Instead of locking I'd rather it fail in means of maintaining speed.
            try
            {
                List<object> leaderboardEntries = _payloadManager.GetLeaderboardPayloads(Leaderboard.GetAndUpdateLeaderboard());
                PushLeaderboard(leaderboardEntries);
            }
            catch (Exception e)
            {
                ErrorLog.Instance.Log(e);
            }
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
            if (!UserHandler.UserExists(connectionId))
            {
                SpawnAIShips(AIShipsToSpawn);
                lock (_locker)
                {
                    Ship ship = new Ship(RespawnManager.GetRandomStartPosition(), GameHandler.BulletManager);
                    User user = new User(connectionId, ship) { Controller = false };
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

            return null;
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public object initializeController(string connectionId)
        {
            if (!UserHandler.UserExists(connectionId))
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
            else
            {
                return null;
            }
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