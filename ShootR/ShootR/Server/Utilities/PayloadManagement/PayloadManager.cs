using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Drawing;

namespace ShootR
{
    public class PayloadManager
    {
        public const int SCREEN_BUFFER_AREA = 100; // Send X extra pixels down to the client to allow for that.Latency between client and server

        public PayloadCompressor Compressor = new PayloadCompressor();

        private PayloadCache _payloadCache = new PayloadCache();

        public Dictionary<string, object[]> GetPayloads(ConcurrentDictionary<string, User> userList, int shipCount, int bulletCount, Map space)
        {
            _payloadCache.StartNextPayloadCache();

            Dictionary<string, object[]> payloads = new Dictionary<string, object[]>();

            Vector2 screenOffset = new Vector2((Ship.SCREEN_WIDTH / 2) + Ship.HEIGHT / 2, (Ship.SCREEN_HEIGHT / 2) + Ship.HEIGHT / 2);

            foreach (User user in userList.Values)
            {
                if (user.ReadyForPayloads)
                {
                    string connectionID = user.ConnectionID;

                    _payloadCache.CreateCacheFor(connectionID);

                    var payload = GetInitializedPayload(user.MovementReceivedAt, shipCount, bulletCount);

                    // Reset the received at flag
                    user.MovementReceivedAt = null;

                    Vector2 screenPosition = user.MyShip.MovementController.Position - screenOffset;
                    List<Collidable> onScreen = space.Query(new Rectangle(Convert.ToInt32(screenPosition.X), Convert.ToInt32(screenPosition.Y), Ship.SCREEN_WIDTH + SCREEN_BUFFER_AREA, Ship.SCREEN_HEIGHT + SCREEN_BUFFER_AREA));

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
                    payloads[connectionID] = Compressor.Compress(payload);
                }
            }

            // Remove all disposed objects from the map
            space.Clean();

            return payloads;
        }

        public Payload GetInitializedPayload(DateTime? movementReceivedAt, int shipCount, int bulletCount)
        {
            return new Payload()
            {
                MovementReceivedAt = movementReceivedAt,
                ShipsInWorld = shipCount,
                BulletsInWorld = bulletCount
            };
        }
    }
}