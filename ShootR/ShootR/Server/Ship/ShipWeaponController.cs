using System;
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

        private BulletManager _bulletManager;
        private Ship _ship;
        private DateTime _lastFired = DateTime.UtcNow;

        public ShipWeaponController(Ship s, BulletManager bm)
        {
            _bulletManager = bm;
            _ship = s;
        }

        /// <summary>
        /// Create's a bullet in the direction of the ship
        /// </summary>
        /// <returns>Newly created bullet</returns>
        public Bullet Fire()
        {
            if ((DateTime.UtcNow - _lastFired).TotalMilliseconds >= FIRE_RATE)
            {
                var shipCenter = new Vector2(_ship.MovementController.Position.X + .5 * _ship.Width(), _ship.MovementController.Position.Y + .5 * _ship.Height());
                var shipDirection = new Vector2(_ship.MovementController.Rotation);
                var bulletOffset = new Vector2(Bullet.WIDTH / 2, Bullet.HEIGHT / 2);
                var startPosition = new Vector2((shipCenter + (BULLET_LEAD * shipDirection)) + bulletOffset);

                Bullet spawnedBullet = new Bullet(startPosition, shipDirection, _ship.MovementController.Velocity);
                _lastFired = DateTime.UtcNow;
                _bulletManager.BulletsInAir.Add(spawnedBullet);
                return spawnedBullet;
            }

            return null;
        }
    }
}