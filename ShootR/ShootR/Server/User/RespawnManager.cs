using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class RespawnManager
    {
        public const int RESPAWN_TIMER = 7;
        
        private List<KeyValuePair<Ship, DateTime>> _respawningShips;
        private CollisionManager _collisionManager;
        private ShipManager _shipManager;
        private static Random _gen;

        public RespawnManager(CollisionManager collisionManager, ShipManager shipManager)
        {
            _respawningShips = new List<KeyValuePair<Ship, DateTime>>();
            _collisionManager = collisionManager;
            _shipManager = shipManager;
            _gen = new Random();
        }

        public bool TryRespawn(Ship ship, DateTime startedAt)
        {
            // We should respawn
            // We also check the ships host to ensure that we did not remove the user
            if ((DateTime.UtcNow - startedAt).TotalSeconds >= RESPAWN_TIMER && ship.Host != null)
            {
                ship.LifeController.Heal(Ship.LIFE);
                ship.MovementController.Position = GetRandomStartPosition();
                ship.Disposed = false;
                _shipManager.Add(ship, ship.Host.ConnectionID);
                _collisionManager.Monitor(ship);
                return true;
            }
            else
            {
                return false;
            }
        }

        public void StartRespawnCountdown(object sender, EventArgs e)
        {
            _respawningShips.Add(new KeyValuePair<Ship, DateTime>(sender as Ship, DateTime.UtcNow));
        }

        public static Vector2 GetRandomStartPosition()
        {
            return new Vector2(_gen.Next(Ship.WIDTH * 2, Map.WIDTH - Ship.WIDTH * 2), _gen.Next(Ship.HEIGHT * 2, Map.HEIGHT - Ship.HEIGHT * 2));
        }

        public void Update()
        {
            for (int i = 0; i < _respawningShips.Count; i++)
            {
                // If respawn was successful
                if (TryRespawn(_respawningShips[i].Key, _respawningShips[i].Value))
                {
                    _respawningShips.RemoveAt(i--);
                }
            }
        }
    }
}