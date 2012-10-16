using System;
namespace ShootR
{
    /// <summary>
    /// The ship weapon controller.
    /// </summary>
    public class ShipWeaponController
    {
        // Fire once per X milliseconds
        public const int FIRE_RATE = 190;
        // Lead the weapon by X pixels
        public const double BULLET_LEAD = 50;

        private BulletManager _bulletManager;
        private Ship _ship;

        public ShipWeaponController(Ship s, BulletManager bm)
        {
            _bulletManager = bm;
            _ship = s;
            DamageModifier = 1;
            LastFired = DateTime.UtcNow;
        }

        public double DamageModifier { get; set; }
        public DateTime LastFired { get; set; }

        /// <summary>
        /// Create's a bullet in the direction of the ship
        /// </summary>
        /// <returns>Newly created bullet</returns>
        public Bullet Fire()
        {
            if ((DateTime.UtcNow - LastFired).TotalMilliseconds >= FIRE_RATE)
            {
                var shipCenter = new Vector2(_ship.MovementController.Position.X + .5 * _ship.Width(), _ship.MovementController.Position.Y + .5 * _ship.Height());
                var shipDirection = new Vector2(_ship.MovementController.Rotation);
                var bulletOffset = new Vector2(Bullet.WIDTH / 2, Bullet.HEIGHT / 2);
                var startPosition = new Vector2((shipCenter + (BULLET_LEAD * shipDirection)) + bulletOffset);

                Bullet spawnedBullet = new Bullet(startPosition, shipDirection, _ship.MovementController.Velocity, _ship, DamageModifier);
                _bulletManager.Add(spawnedBullet);

                LastFired = DateTime.UtcNow;
                return spawnedBullet;
            }

            return null;
        }

        /// <summary>
        /// Triggered on level
        /// </summary>
        public void LeveledUp(object sender, LevelUpEventArgs e)
        {
            DamageModifier += .1;
        }
    }
}