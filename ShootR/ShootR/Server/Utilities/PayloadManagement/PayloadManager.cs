using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Drawing;

namespace ShootR
{
    public class PayloadManager
    {
        public const int SCREEN_BUFFER_AREA = 100; // Send X extra pixels down to the client to allow for latency between client and server

        public PayloadCompressor Compressor = new PayloadCompressor();

        private PayloadCache _payloadCache = new PayloadCache();

        public Dictionary<string, object[]> GetGamePayloads(ICollection<User> userList, int shipCount, int bulletCount, Map space)
        {
            _payloadCache.StartNextPayloadCache();

            Dictionary<string, object[]> payloads = new Dictionary<string, object[]>();            

            foreach (User user in userList)
            {
                if (user.ReadyForPayloads)
                {
                    Vector2 screenOffset = new Vector2((user.Viewport.Width / 2) + Ship.WIDTH / 2, (user.Viewport.Height / 2) + Ship.HEIGHT / 2);
                    string connectionID = user.ConnectionID;

                    _payloadCache.CreateCacheFor(connectionID);

                    var payload = GetInitializedPayload(shipCount, bulletCount, user);

                    if (!user.IdleManager.CheckIdle())
                    {
                        Vector2 screenPosition = user.MyShip.MovementController.Position - screenOffset;
                        List<Collidable> onScreen = space.Query(new Rectangle(Convert.ToInt32(screenPosition.X), Convert.ToInt32(screenPosition.Y), user.Viewport.Width + SCREEN_BUFFER_AREA, user.Viewport.Height + SCREEN_BUFFER_AREA));

                        foreach (Collidable obj in onScreen)
                        {
                            if (obj.GetType() == typeof(Bullet))
                            {
                                _payloadCache.Cache(connectionID, obj);

                                // This bullet has been seen so tag the bullet as seen                                
                                ((Bullet)obj).Seen();

                                if (obj.Altered() || !_payloadCache.ExistedLastPayload(connectionID, obj))
                                {
                                    payload.Bullets.Add(Compressor.Compress((Bullet)obj));
                                }
                            }
                            else if (obj.GetType() == typeof(Ship))
                            {
                                payload.Ships.Add(Compressor.Compress(((Ship)obj)));
                            }
                        }
                    }
                    else // User is Idle, push down "MyShip"
                    {
                        payload.Ships.Add(Compressor.Compress(user.MyShip));
                    }

                    payloads[connectionID] = Compressor.Compress(payload);                                      
                }
            }

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

        public Payload GetInitializedPayload(int shipCount, int bulletCount, User user)
        {
            return new Payload()
            {
                LeaderboardPosition = user.CurrentLeaderboardPosition,
                ShipsInWorld = shipCount,
                BulletsInWorld = bulletCount,
                Experience = user.MyShip.LevelManager.Experience,
                ExperienceToNextLevel = user.MyShip.LevelManager.ExperienceToNextLevel,
                Notification = user.NotificationManager.PullNotification()
            };
        }
    }
}