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
        public const int DAMAGE = 10;

        private DateTime _lastSeen;

        public Bullet(Vector2 position, Vector2 direction, Vector2 initialVelocity, Ship firedBy)
            : base(WIDTH, HEIGHT, new BulletMovementController(position, direction, initialVelocity), new LifeController(LIFE))
        {
            _lastSeen = DateTime.UtcNow;
            FiredBy = firedBy;
        }

        public int DamageDealt { get; private set; }
        public Ship FiredBy { get; private set; }

        public void Seen()
        {
            _lastSeen = DateTime.UtcNow;
        }

        public bool ShouldDispose()
        {
            // Check if bullet should die
            if ((DateTime.UtcNow - _lastSeen).TotalSeconds >= DISPOSE_AFTER)
            {
                return true;
            }

            return false;
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
            DamageDealt = DAMAGE;
            c.LifeController.Hurt(DamageDealt, this);

            if(c.GetType() == typeof(Ship))
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