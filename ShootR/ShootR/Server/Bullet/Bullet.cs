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

        public Bullet(Vector2 position, Vector2 direction, Vector2 initialVelocity)
            : base(WIDTH, HEIGHT, new BulletMovementController(position, direction, initialVelocity))
        {
            ID = Guid.NewGuid();
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
        public override void HandleCollisionWith(Collidable c)
        {
            base.HandleCollisionWith(c);
            Dispose(); // Destroy bullet when collision
        }

        public void Update(GameTime gameTime)
        {
            MovementController.Update(gameTime);
            base.Update();
        }
    }
}