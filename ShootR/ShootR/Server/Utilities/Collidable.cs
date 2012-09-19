using System;

namespace ShootR
{
    /// <summary>
    /// Base object for all collidable objects which is used to check collisions.  Some examples of usage are through the Ship and Bullet classes.
    /// </summary>
    public abstract class Collidable : IDisposable
    {
        public Collidable(MovementController mc)
        {
            MovementController = mc;
            CollidedAt = new Vector2();
        }

        public Collidable(int w, int h)
        {
            Width = w;
            Height = h;
            CollidedAt = new Vector2();
        }

        public Collidable(int w, int h, MovementController mc)
        {
            Width = w;
            Height = h;
            CollidedAt = new Vector2();
            MovementController = mc;
        }

        public MovementController MovementController { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public bool Disposed { get; set; }
        public bool Collided { get; set; }
        public Vector2 CollidedAt { get; set; }

        public void Dispose()
        {
            Disposed = true;
        }

        public double DistanceFrom(Collidable from)
        {
            Vector2 myCenter = this.Center(),
                    theirCenter = from.Center();

            return Math.Sqrt(Math.Pow(myCenter.X - theirCenter.X, 2) + Math.Pow(myCenter.Y - theirCenter.Y, 2));
        }

        /// <summary>
        /// Called when there is a collision with another object "<paramref name="c"/>."
        /// </summary>
        /// <param name="c">The object that I colided with</param>
        public virtual void HandleCollisionWith(Collidable c)
        {
            Collided = true;
            // Copy over the position to find collision location
            CollidedAt.X = MovementController.Position.X;
            CollidedAt.Y = MovementController.Position.Y;
        }

        /// <summary>
        /// Calculates whether me and the collidable object <paramref name="c"/> are colliding.
        /// </summary>
        /// <param name="c">The object to check the collision against.</param>
        /// <returns>Whether or not I am colliding with <paramref name="c"/>.</returns>
        public bool IsCollidingWith(Collidable c)
        {
            // Extending the width of our object and then transposing the c object to a singular point
            // If the singular point falls within the extended width region then the two objects are colliding
            double offsetWidth = c.Width * .5;
            double offsetHeight = c.Height * .5;
            Vector2 offsetPosition = new Vector2(c.MovementController.Position.X + offsetWidth, c.MovementController.Position.Y + offsetHeight);
            Vector2 myOffsetPosition = new Vector2(MovementController.Position.X - offsetWidth, MovementController.Position.Y - offsetHeight);

            return (offsetPosition.X >= myOffsetPosition.X && offsetPosition.Y >= myOffsetPosition.Y && offsetPosition.X <= myOffsetPosition.X + c.Width && offsetPosition.Y <= myOffsetPosition.Y + c.Height);
        }

        public Vector2 Center()
        {
            return new Vector2(this.MovementController.Position.X + .5 * this.Width, this.MovementController.Position.Y + .5 * this.Height);
        }
    }
}