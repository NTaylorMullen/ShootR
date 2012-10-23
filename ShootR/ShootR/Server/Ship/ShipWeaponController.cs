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

        private const double HALF_SHIP_WIDTH = Ship.WIDTH * .5;
        private const double HALF_SHIP_HEIGHT = Ship.HEIGHT * .5;
        
        private const double HALF_BULLET_WIDTH = Bullet.WIDTH * .5;
        private const double HALF_BULLET_HEIGHT = Bullet.HEIGHT * .5;

        private static readonly Vector2 BULLET_OFFSET = new Vector2(HALF_BULLET_WIDTH, HALF_BULLET_HEIGHT);

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
        public void Fire(DateTime now)
        {
            if ((now - LastFired).TotalMilliseconds >= FIRE_RATE)
            {
                var shipCenter = new Vector2(_me.MovementController.Position.X + HALF_SHIP_WIDTH, _me.MovementController.Position.Y + HALF_SHIP_HEIGHT);
                var shipDirection = new Vector2(_me.MovementController.Rotation);
                var startPosition = new Vector2((shipCenter + (BULLET_LEAD * shipDirection)) - BULLET_OFFSET);

                Bullet spawnedBullet = new Bullet(startPosition, shipDirection, _me, DamageModifier);
                _bulletManager.Add(spawnedBullet);

                LastFired = now;

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