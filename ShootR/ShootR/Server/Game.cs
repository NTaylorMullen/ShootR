using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace ShootR
{
    public class Game
    {
        public const int MAX_SERVER_SIZE = 2000;
        public const int AIShipsToSpawn = 5;
        public const int SpawnsPerInterval = 1;
        private int _spawned = 0;
        private DateTime _lastSpawn = DateTime.UtcNow;        

        private readonly static Lazy<Game> _instance = new Lazy<Game>(() => new Game());
        private Timer _leaderboardLoop;
        private HighFrequencyTimer _gameLoop;
        private GameTime _gameTime;
        private Map _space;
        private PayloadManager _payloadManager;

        private long _drawCount = 0;
        private long _actualFPS = 0;
        private long _drawFPS = 0;
        private int DRAW_AFTER;
        private object _locker = new object();
        public static Random GEN = new Random();

        private Game()
        {
            Configuration = new GameConfigurationManager();
            DRAW_AFTER = Configuration.gameConfig.DRAW_INTERVAL / Configuration.gameConfig.UPDATE_INTERVAL;
            _drawFPS = 1000 / Configuration.gameConfig.DRAW_INTERVAL;
            _gameLoop = new HighFrequencyTimer(1000 / Configuration.gameConfig.UPDATE_INTERVAL, id => Update(id), () => { }, () => { }, (fps) =>
            {
                _actualFPS = fps;
            });
            _leaderboardLoop = new Timer(UpdateLeaderboard, null, Configuration.gameConfig.LEADERBOARD_PUSH_INTERVAL, Configuration.gameConfig.LEADERBOARD_PUSH_INTERVAL);

            _gameTime = new GameTime();
            _space = new Map();
            GameHandler = new GameHandler(_space);
            _payloadManager = new PayloadManager();

            UserHandler = new UserHandler(GameHandler);
            Leaderboard = new Leaderboard(UserHandler);
            ConnectionManager = new ConnectionManager(UserHandler, _locker);

            RegistrationHandler = new RegistrationHandler();
            RuntimeConfiguration = new RuntimeConfiguration();

            _gameLoop.Start();
        }

        public RuntimeConfiguration RuntimeConfiguration { get; set; }
        public GameConfigurationManager Configuration { get; set; }
        public RegistrationHandler RegistrationHandler { get; private set; }
        public UserHandler UserHandler { get; private set; }
        public ConnectionManager ConnectionManager { get; private set; }
        public Leaderboard Leaderboard { get; private set; }
        public GameHandler GameHandler { get; set; }

        private long Update(long id)
        {
            lock (_locker)
            {
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

                    if (_actualFPS <= _drawFPS || (++_drawCount) % DRAW_AFTER == 0)
                    {
                        Draw();
                        _drawCount = 0;
                    }
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }

                return id;
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
            }
        }

        /// <summary>
        /// Sends down batches of data to the clients in order to update their screens
        /// </summary>
        private void Draw()
        {
            _space.CheckIncreaseMapSize(UserHandler.TotalActiveUsers);
            UserHandler.Update();

            ConcurrentDictionary<string, object[]> payloads = _payloadManager.GetGamePayloads(UserHandler.GetUsers(), UserHandler.TotalActiveUsers, GameHandler.BulletManager.Bullets.Count, _space);
            IHubContext context = GetContext();

            foreach (string connectionID in payloads.Keys)
            {
                UserHandler.GetUser(connectionID).PushToClient(payloads[connectionID], context);
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
            GetContext().Clients.Group(Leaderboard.LEADERBOARD_REQUESTEE_GROUP).l(leaderboard);
        }

        public static IHubContext GetContext()
        {
            return GlobalHost.ConnectionManager.GetHubContext<GameHub>();
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public object initializeClient(string connectionId, RegisteredClient rc)
        {
            if (!UserHandler.UserExistsAndReady(connectionId))
            {
                try
                {
                    lock (_locker)
                    {
                        User user = UserHandler.FindUserByIdentity(rc.Identity);
                        Ship ship;

                        if (user == null)
                        {
                            if (UserHandler.TotalActiveUsers >= RuntimeConfiguration.MaxServerUsers)
                            {
                                return new
                                {
                                    ServerFull = true
                                };
                            }
                            else
                            {
                                ship = new Ship(RespawnManager.GetRandomStartPosition(), GameHandler.BulletManager);
                                ship.Name = rc.DisplayName;
                                user = new User(connectionId, ship, rc) { Controller = false };
                                UserHandler.AddUser(user);
                            }
                        }
                        else
                        {
                            string previousConnectionID = user.ConnectionID;
                            UserHandler.ReassignUser(connectionId, user);
                            ship = user.MyShip;

                            if (user.Connected) // Check if it's a duplicate login
                            {
                                GetContext().Clients.Client(previousConnectionID).controlTransferred();
                                user.NotificationManager.Notify("Transfering control to this browser.  You were already logged in.");
                            }
                            else
                            {
                                ship.Disposed = false;
                                ship.LifeController.HealFull();
                                user.Connected = true;
                            }

                            user.IdleManager.RecordActivity();
                            user.IdleManager.Idle = false;
                        }

                        GameHandler.AddShipToGame(ship);
                    }

                    return new
                    {
                        Configuration = Configuration,
                        ServerFull = false,
                        CompressionContracts = new
                        {
                            PayloadContract = _payloadManager.Compressor.PayloadCompressionContract,
                            CollidableContract = _payloadManager.Compressor.CollidableCompressionContract,
                            ShipContract = _payloadManager.Compressor.ShipCompressionContract,
                            BulletContract = _payloadManager.Compressor.BulletCompressionContract,
                            LeaderboardEntryContract = _payloadManager.Compressor.LeaderboardEntryCompressionContract,
                            PowerupContract = _payloadManager.Compressor.PowerupCompressionContract
                        },
                        ShipID = UserHandler.GetUserShip(connectionId).ID,
                        ShipName = UserHandler.GetUserShip(connectionId).Name
                    };
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }
            }

            return null;
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public object initializeController(string connectionId, RegisteredClient rc)
        {
            if (!UserHandler.UserExistsAndReady(connectionId))
            {
                try
                {
                    User main = UserHandler.FindUserByIdentity(rc.Identity);

                    if (main != null)
                    {
                        User controllerUser = new User(connectionId, rc) { Controller = true };

                        controllerUser.MyShip = main.MyShip;

                        UserHandler.AddUser(controllerUser);
                        main.RemoteControllers.Add(controllerUser);

                        main.NotificationManager.Notify("Controller attached.");

                        return new
                        {
                            Configuration = Configuration,
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
                        return new
                        {
                            FailureMessage = "Could not find logged in user to control."
                        };
                    }
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e);
                }
            }

            return null;
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