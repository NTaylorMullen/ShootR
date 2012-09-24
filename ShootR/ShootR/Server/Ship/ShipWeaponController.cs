namespace ShootR
{
    /// <summary>
    /// The ship weapon controller.
    /// </summary>
    public class ShipWeaponController
    {
        // Fire once per 200 milliseconds
        public const int FIRE_RATE = 200;
        // Lead the weapon by 50 pixels
        public const double BULLET_LEAD = 50;

        private BulletManager bulletManager;
        private Ship ship;

        public ShipWeaponController(Ship s, BulletManager bm)
        {
            bulletManager = bm;
            ship = s;
        }

        /// <summary>
        /// Create's a bullet in the direction of the ship
        /// </summary>
        /// <returns>Newly created bullet</returns>
        public Bullet Fire()
        {
            var shipCenter = new Vector2(ship.MovementController.Position.X + .5 * ship.Width(), ship.MovementController.Position.Y + .5 * ship.Height());
            var shipDirection = new Vector2(ship.MovementController.Rotation);
            var bulletOffset = new Vector2(Bullet.WIDTH / 2, Bullet.HEIGHT / 2);
            var startPosition = new Vector2((shipCenter + (BULLET_LEAD * shipDirection)) + bulletOffset);

            Bullet spawnedBullet = new Bullet(startPosition, shipDirection, ship.MovementController.Velocity);
            bulletManager.BulletsInAir.Add(spawnedBullet);
            return spawnedBullet;           
        }
    }
}