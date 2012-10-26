using System.Diagnostics;
namespace ShootR
{
    public class GameHandler
    {
        private ShipManager _shipManager;
        private PowerupManager _powerupManager;
        private CollisionManager _collisionManager;
        private Map _space;

        public GameHandler(Map space)
        {
            BulletManager = new BulletManager();
            _collisionManager = new CollisionManager(space);
            _shipManager = new ShipManager(this);
            _powerupManager = new PowerupManager();

            _space = space;
        }

        public BulletManager BulletManager { get; set; }

        public void RemoveShipFromGame(Ship ship)
        {
            if (ship != null)
            {
                _shipManager.Remove(ship.Host.ConnectionID);
                _collisionManager.UnMonitor(ship);
            }
        }

        public void AddShipToGame(Ship ship)
        {
            if (ship != null)
            {
                _shipManager.Add(ship);
                _collisionManager.Monitor(ship);
            }
        }

        public void AddBulletToGame(Bullet bullet)
        {
            _space.Insert(bullet);
        }

        public void AddPowerupToGame(Powerup powerup)
        {
            _powerupManager.Add(powerup);
            _space.Insert(powerup);
        }

        public int ShipCount()
        {
            return _shipManager.Ships.Count;
        }

        public void Update(GameTime gameTime)
        {
            _shipManager.Update(gameTime);
            _powerupManager.Update(gameTime);
            BulletManager.Update(gameTime);

            _collisionManager.Update(gameTime);
        }
    }
}