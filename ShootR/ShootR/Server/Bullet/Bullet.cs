using System;
using System.Threading;

namespace ShootR
{
    /// <summary>
    /// The Bullet is fired by Ships and can be used to damage other ships.
    /// </summary>
    public class Bullet : Collidable
    {
        public const int HEIGHT = 13;
        public const int WIDTH = 13;
        public const int DISPOSE_AFTER = 2; // Disposes bullet after X seconds of not being seen.
        public const int LIFE = 1;
        public const int BASE_DAMAGE = 10;
        public static readonly TimeSpan DIE_AFTER = TimeSpan.FromSeconds(2);

        private DateTime _spawnedAt;

        private static int _bulletGUID = 0;

        public Bullet(Vector2 position, Vector2 direction, Ship firedBy, double damageModifier)
            : base(WIDTH, HEIGHT, new BulletMovementController(position, direction, firedBy.MovementController.Rotation), new LifeController(LIFE), new DamageController(BASE_DAMAGE))
        {
            ID = Interlocked.Increment(ref _bulletGUID);// Reverse bullet GUID's to go below 0
            _spawnedAt = DateTime.UtcNow;
            FiredBy = firedBy;
            DamageController.MultiplyDamage(damageModifier);
            
        }

        public int DamageDealt { get; private set; }
        public Ship FiredBy { get; private set; }

        public bool ShouldDispose(DateTime utcNow)
        {
            // Check if bullet should die
            return (utcNow - _spawnedAt) >= DIE_AFTER;
        }

        public BulletMovementController MovementController
        {
            get
            {
                return (BulletMovementController)base.MovementController;
            }
            set
            {
                base.MovementController = value;
            }
        }

        /// <summary>
        /// When a bullet hits another object it must be destroyed.  So we dispose of it.
        /// </summary>
        /// <param name="c">The object that I colided with.</param>
        public override void HandleCollisionWith(Collidable c, Map space)
        {
            base.HandleCollisionWith(c, space);
            DamageDealt = DamageController.Damage;
            c.LifeController.Hurt(DamageDealt, this);

            if(c is Ship)
            {
                (c as Ship).StatRecorder.BulletCollision(this);
            }

            Dispose(); // Destroy bullet when collision
        }

        public override void HandleOutOfBounds()
        {
            MovementController.RepositionInBounds(_width, _height);
            DamageDealt = 0;
            UpdateBounds();
            base.HandleCollision();
            Dispose(); // Destroy bullet when out of bounds
        }

        public void Update(GameTime gameTime)
        {
            MovementController.Update(gameTime.PercentOfSecond);
            base.Update();
        }
    }
}