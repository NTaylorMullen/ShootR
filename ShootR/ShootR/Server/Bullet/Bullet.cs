using System;

namespace ShootR
{
    /// <summary>
    /// The Bullet is fired by Ships and can be used to damage other ships.
    /// </summary>
    public class Bullet : Collidable
    {
        public const int HEIGHT = 10;
        public const int WIDTH = 4;
        public const int DISPOSE_AFTER = 5; // Disposes bullet after X seconds of not being seen.
        public const int LIFE = 1;
        public const int BASE_DAMAGE = 10;
        public const int DIE_AFTER = 3000; // Die after X milliseconds

        private DateTime _spawnedAt;
        private int _damage;

        private static int _bulletGUID = -1;

        public Bullet(Vector2 position, Vector2 direction, Vector2 initialVelocity, Ship firedBy, double damageModifier)
            : base(WIDTH, HEIGHT, new BulletMovementController(position, direction, initialVelocity), new LifeController(LIFE))
        {
            ID = _bulletGUID--; // Reverse bullet GUID's to go below 0
            _spawnedAt = DateTime.UtcNow;
            FiredBy = firedBy;
            _damage = Convert.ToInt32(BASE_DAMAGE * damageModifier);
        }

        public int DamageDealt { get; private set; }
        public Ship FiredBy { get; private set; }

        public bool ShouldDispose()
        {
            // Check if bullet should die
            return ((DateTime.UtcNow - _spawnedAt).TotalMilliseconds >= DIE_AFTER);
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
            DamageDealt = _damage;
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