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
        public const int DISPOSE_AFTER = 5; // Disposes bullet after 5 seconds of not being seen.
        private DateTime _lastSeen;

        public Bullet(Vector2 position, Vector2 direction, Vector2 initialVelocity)
            : base(WIDTH, HEIGHT, new BulletMovementController(position, direction, initialVelocity))
        {
            ID = Guid.NewGuid();
            _lastSeen = DateTime.Now;
        }

        public void Seen()
        {
            _lastSeen = DateTime.Now;
        }

        public bool ShouldDispose()
        {
            // Check if bullet should die
            if ((DateTime.Now - _lastSeen).TotalSeconds >= DISPOSE_AFTER)
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

        public Guid ID { get; set; }

        /// <summary>
        /// When a bullet hits another object it must be destroyed.  So we dispose of it.
        /// </summary>
        /// <param name="c">The object that I colided with.</param>
        public override void HandleCollisionWith(Collidable c, QuadTree map)
        {
            base.HandleCollisionWith(c, map);
            Dispose(); // Destroy bullet when collision
        }

        public void Update(GameTime gameTime)
        {
            MovementController.Update(gameTime);
            base.Update();
        }
    }
}