using System.Diagnostics;
namespace ShootR
{
    public class GameHandler
    {
        private ShipManager _shipManager;
        private CollisionManager _collisionManager;

        public GameHandler(Map map)
        {
            BulletManager = new BulletManager();
            _collisionManager = new CollisionManager(map);
            _shipManager = new ShipManager(this);
        }

        public BulletManager BulletManager { get; set; }

        public void RemoveShipFromGame(Ship ship)
        {
            if (ship != null)
            {
                _shipManager.RemoveShipByKey(ship.Host.ConnectionID);
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
            _collisionManager.Monitor(bullet);
        }

        public int ShipCount()
        {
            return _shipManager.Ships.Count;
        }

        public void Update(GameTime gameTime)
        {
            BulletManager.Update(gameTime);
            _shipManager.Update(gameTime);

            _collisionManager.Update(gameTime);
        }
    }
}