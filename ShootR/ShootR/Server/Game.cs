using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace ShootR
{
    public class FpsTimer
    {
        private readonly int _fps;
        private readonly Action _callback;
        private Thread _runner;

        public FpsTimer(int fps, Action callback)
        {
            _fps = fps;
            _callback = callback;
        }

        public void Start()
        {
            if (_runner != null)
            {
                return;
            }

            _runner = new Thread(() =>
            {
                var frameTicks = (int)Math.Round(1000.0 / _fps);
                var lastUpdate = 0;

                while (true)
                {
                    int delta = (lastUpdate + frameTicks) - Environment.TickCount;
                    if (delta < 0)
                    {
                        lastUpdate = Environment.TickCount;

                        _callback();
                    }
                    else
                    {
                        Thread.Sleep(TimeSpan.FromTicks(delta));
                    }
                }
            });

            _runner.Start();
        }
    }

    public class Game
    {
        public const int AIShipsToSpawn = 5;
        public const int SpawnsPerInterval = 1;
        private int _spawned = 0;
        private DateTime _lastSpawn = DateTime.UtcNow;

        private readonly static Lazy<Game> _instance = new Lazy<Game>(() => new Game());
        private Timer _leaderboardLoop;
        private FpsTimer _gameLoop;
        private ConfigurationManager _configuration;
        private GameTime _gameTime;
        private Map _space;
        private PayloadManager _payloadManager;

        private int DRAW_AFTER;
        private int _updateCount = 0;
        private int _updating;
        private object _locker = new object();

        private Game()
        {
            _configuration = new ConfigurationManager();
            DRAW_AFTER = _configuration.gameConfig.DRAW_INTERVAL / _configuration.gameConfig.UPDATE_INTERVAL;
            // _gameLoop = new Timer(Update, null, _configuration.gameConfig.UPDATE_INTERVAL, _configuration.gameConfig.UPDATE_INTERVAL);
            
            

            _leaderboardLoop = new Timer(UpdateLeaderboard, null, _configuration.gameConfig.LEADERBOARD_PUSH_INTERVAL, _configuration.gameConfig.LEADERBOARD_PUSH_INTERVAL);

            _gameTime = new GameTime();
            _space = new Map();
            GameHandler = new GameHandler(_space);
            _payloadManager = new PayloadManager();

            UserHandler = new UserHandler(GameHandler);
            Leaderboard = new Leaderboard(UserHandler);
            ConnectionManager = new ConnectionManager(UserHandler, _locker);
            _gameLoop = new FpsTimer(25, Update);
            _gameLoop.Start();
            //SpawnAIShips(AIShipsToSpawn);
        }

        public UserHandler UserHandler { get; private set; }
        public ConnectionManager ConnectionManager { get; private set; }
        public Leaderboard Leaderboard { get; private set; }
        public GameHandler GameHandler { get; set; }

        private void Update()
        {
            if (Interlocked.Exchange(ref _updating, 1) == 1)
            {
                return;
            }

            DateTime utcNow = DateTime.UtcNow;

            try
            {
                if ((utcNow - _lastSpawn).TotalSeconds >= 1 && _spawned < AIShipsToSpawn)
                {
                    _spawned += SpawnsPerInterval;
                    SpawnAIShips(SpawnsPerInterval);
                    _lastSpawn = utcNow;
                }

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
            finally
            {
                Interlocked.Exchange(ref _updating, 0);
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
                shipAI.Name = "CPU" + shipAI.ID;
            }
        }

        /// <summary>
        /// Sends down batches of data to the clients in order to update their screens
        /// </summary>
        private void Draw()
        {
            int shipCount = GameHandler.ShipCount();
            _space.CheckIncreaseMapSize(shipCount);

            ConcurrentDictionary<string, object[]> payloads = _payloadManager.GetGamePayloads(UserHandler.GetUsers(), shipCount, GameHandler.BulletManager.Bullets.Count, _space);
            IHubContext Context = GetContext();

            foreach (string connectionID in payloads.Keys)
            {
                UserHandler.GetUser(connectionID).PushToClient(payloads[connectionID], Context);
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
            GetContext().Client(Leaderboard.LEADERBOARD_REQUESTEE_GROUP).l(leaderboard);
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