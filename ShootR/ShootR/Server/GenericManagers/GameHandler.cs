namespace ShootR
{
    public class GameHandler
    {
        public GameHandler(Map map)
        {
            BulletManager = new BulletManager();
            CollisionManager = new CollisionManager(map);
            ShipManager = new ShipManager();
        }

        public ShipManager ShipManager { get; set; }
        public BulletManager BulletManager { get; set; }
        public CollisionManager CollisionManager { get; set; }

        public void Update(GameTime gameTime)
        {
            BulletManager.Update(gameTime);

            foreach (string key in ShipManager.Ships.Keys)
            {
                if (!ShipManager.Ships[key].IsDisposed())
                {
                    ShipManager.Ships[key].Update(gameTime);
                }
                else
                {
                    ShipManager.RemoveShipByKey(key);
                }
            }
            CollisionManager.Update(gameTime);
        }
    }
}