using System.Diagnostics;
namespace ShootR
{
    public class GameHandler
    {
        private ShipManager _shipManager;
        private CollisionManager _collisionManager;
        private Map _space;

        public GameHandler(Map space)
        {
            BulletManager = new BulletManager();
            _collisionManager = new CollisionManager(space);
            _shipManager = new ShipManager(this);

            _space = space;
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
            if (!Map.OnMap(bullet))
            {
                bullet.HandleOutOfBounds();
            }
            else
            {
                _collisionManager.Monitor(bullet);
            }
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