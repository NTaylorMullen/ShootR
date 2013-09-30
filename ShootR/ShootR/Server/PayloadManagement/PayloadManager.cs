using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Drawing;
using System.Threading.Tasks;

namespace ShootR
{
    public class PayloadManager
    {
        public const int SCREEN_BUFFER_AREA = 200; // Send X extra pixels down to the client to allow for latency between client and server

        public PayloadCompressor Compressor = new PayloadCompressor();

        private PayloadCache _payloadCache = new PayloadCache();

        public ConcurrentDictionary<string, object[]> GetGamePayloads(ICollection<User> userList, int playerCount, int bulletCount, Map space)
        {
            _payloadCache.StartNextPayloadCache();

            ConcurrentDictionary<string, object[]> payloads = new ConcurrentDictionary<string, object[]>();

            Parallel.ForEach(userList, user =>
            {
                if (user.ReadyForPayloads && user.Connected)
                {
                    Vector2 screenOffset = new Vector2((user.Viewport.Width / 2) + Ship.WIDTH / 2, (user.Viewport.Height / 2) + Ship.HEIGHT / 2);
                    string connectionID = user.ConnectionID;

                    _payloadCache.CreateCacheFor(connectionID);

                    var payload = GetInitializedPayload(playerCount, bulletCount, user);

                    if (!user.IdleManager.Idle)
                    {
                        Vector2 screenPosition = user.MyShip.MovementController.Position - screenOffset;
                        List<Collidable> onScreen = space.Query(new Rectangle(Convert.ToInt32(screenPosition.X), Convert.ToInt32(screenPosition.Y), user.Viewport.Width + SCREEN_BUFFER_AREA, user.Viewport.Height + SCREEN_BUFFER_AREA));

                        foreach (Collidable obj in onScreen)
                        {
                            if (obj is Bullet)
                            {
                                _payloadCache.Cache(connectionID, obj);

                                if (obj.Altered() || !_payloadCache.ExistedLastPayload(connectionID, obj))
                                {
                                    payload.Bullets.Add(Compressor.Compress((Bullet)obj));
                                }
                            }
                            else if (obj is Ship)
                            {
                                payload.Ships.Add(Compressor.Compress(((Ship)obj)));
                            }
                            else if (obj is Powerup)
                            {
                                _payloadCache.Cache(connectionID, obj);

                                if (obj.Altered() || !_payloadCache.ExistedLastPayload(connectionID, obj))
                                {
                                    payload.Powerups.Add(Compressor.Compress(((Powerup)obj)));
                                }
                            }
                        }
                    }
                    else // User is Idle, push down "MyShip"
                    {
                        payload.Ships.Add(Compressor.Compress(user.MyShip));
                    }

                    // This is used to send down "death" data a single time to the client and not send it repeatedly
                    if (user.DeathOccured)
                    {
                        // We've acknowledged the death
                        user.DeathOccured = false;
                        payload.KilledByName = user.MyShip.LastKilledBy.Host.RegistrationTicket.DisplayName;
                        payload.KilledByPhoto = user.MyShip.LastKilledBy.Host.RegistrationTicket.Photo;
                    }

                    if (user.Connected)
                    {
                        payloads.TryAdd(connectionID, Compressor.Compress(payload));
                    }
                }
            });            

            // Remove all disposed objects from the map
            space.Clean();

            return payloads;
        }

        public List<object> GetLeaderboardPayloads(IEnumerable<LeaderboardEntry> leaderboard)
        {
            List<object> result = new List<object>();

            foreach (LeaderboardEntry entry in leaderboard)
            {
                result.Add(Compressor.Compress(entry));
            }

            return result;
        }

        public Payload GetInitializedPayload(int playerCount, int bulletCount, User user)
        {
            return new Payload()
            {
                LeaderboardPosition = user.CurrentLeaderboardPosition,
                Kills = user.MyShip.StatRecorder.Kills,
                Deaths = user.MyShip.StatRecorder.Deaths,
                ShipsInWorld = playerCount,
                BulletsInWorld = bulletCount,
                Experience = user.MyShip.LevelManager.Experience,
                ExperienceToNextLevel = user.MyShip.LevelManager.ExperienceToNextLevel,
                Notification = user.NotificationManager.PullNotification(),
            };
        }
    }
}