using System;
using System.Drawing;

namespace ShootR
{
    /// <summary>
    /// Base object for all collidable objects which is used to check collisions.  Some examples of usage are through the Ship and Bullet classes.
    /// </summary>
    public class Collidable : IDisposable
    {
        protected Rectangle _bounds;
        private QuadTreeNode _mapLocation;

        public Collidable(MovementController mc)
        {
            MovementController = mc;
            CollidedAt = new Vector2();
            Width = 0;
            Height = 0;
            _bounds = new Rectangle(Convert.ToInt32(mc.Position.X), Convert.ToInt32(mc.Position.Y), Width, Height);
        }

        public Collidable(int w, int h)
        {
            Width = w;
            Height = h;
            CollidedAt = new Vector2();
            _bounds = new Rectangle(0, 0, Width, Height);
        }

        public Collidable(int w, int h, MovementController mc)
        {
            Width = w;
            Height = h;
            CollidedAt = new Vector2();
            MovementController = mc;
            _bounds = new Rectangle(Convert.ToInt32(mc.Position.X), Convert.ToInt32(mc.Position.Y), Width, Height);
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
        public virtual void HandleCollisionWith(Collidable c, Map space)
        {
            HandleCollision();
        }

        public virtual void HandleCollision()
        {
            Collided = true;
            // Copy over the position to find collision location
            CollidedAt.X = MovementController.Position.X;
            CollidedAt.Y = MovementController.Position.Y;
        }

        public virtual void HandleOutOfBounds()
        {
            // Re-position object in bounds
            MovementController.RepositionInBounds(Width, Height);

            // Reverse velocity, aka bounce
            MovementController.Forces *= -1;
            MovementController.Velocity *= -1;
            UpdateBounds();
        }

        /// <summary>
        /// Calculates whether me and the collidable object <paramref name="c"/> are colliding.
        /// </summary>
        /// <param name="c">The object to check the collision against.</param>
        /// <returns>Whether or not I am colliding with <paramref name="c"/>.</returns>
        public bool IsCollidingWith(Collidable c)
        {
            return _bounds.IntersectsWith(c.GetBounds());
        }

        public Rectangle GetBounds()
        {
            return _bounds;
        }

        public Vector2 Center()
        {
            return new Vector2(this.MovementController.Position.X + .5 * this.Width, this.MovementController.Position.Y + .5 * this.Height);
        }

        #region Quad Tree methods

        public void ClearMapArea()
        {
            _mapLocation = null;
        }

        public void SetMapArea(QuadTreeNode node)
        {
            _mapLocation = node;
        }

        public QuadTreeNode GetMapArea()
        {
            return _mapLocation;
        }

        #endregion


        public void Update()
        {
            UpdateBounds();
        }

        public void UpdateBounds()
        {
            _bounds.X = Convert.ToInt32(MovementController.Position.X);
            _bounds.Y = Convert.ToInt32(MovementController.Position.Y);
        }
    }
}