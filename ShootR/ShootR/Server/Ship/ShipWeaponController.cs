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
        public const double BULLET_LEAD = 70;

        private BulletManager _bulletManager;
        private Ship _me;

        public ShipWeaponController(Ship ship, BulletManager bm)
        {
            _bulletManager = bm;
            _me = ship;
            DamageModifier = 1;
            LastFired = DateTime.UtcNow;
        }

        public double DamageModifier { get; set; }
        public DateTime LastFired { get; set; }

        /// <summary>
        /// Create's a bullet in the direction of the ship
        /// </summary>
        /// <returns>Newly created bullet</returns>
        public void Fire()
        {
            if ((DateTime.UtcNow - LastFired).TotalMilliseconds >= FIRE_RATE)
            {
                var shipCenter = new Vector2(_me.MovementController.Position.X + .5 * _me.Width(), _me.MovementController.Position.Y + .5 * _me.Height());
                var shipDirection = new Vector2(_me.MovementController.Rotation);
                var bulletOffset = new Vector2(Bullet.WIDTH / 2, Bullet.HEIGHT / 2);
                var startPosition = new Vector2((shipCenter + (BULLET_LEAD * shipDirection)) + bulletOffset);

                Bullet spawnedBullet = new Bullet(startPosition, shipDirection, _me.MovementController.Velocity, _me, DamageModifier);
                _bulletManager.Add(spawnedBullet);

                LastFired = DateTime.UtcNow;

                _me.Fired(spawnedBullet);

            }
        }

        /// <summary>
        /// Triggered on level
        /// </summary>
        public void LeveledUp(object sender, LevelUpEventArgs e)
        {
            DamageModifier += .1;
        }

        public void Reset()
        {
            DamageModifier = 1;
        }
    }
}