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
        private int _serverID;
        private static int _itemCount = 0;

        protected static bool _altered = true;

        public Collidable(MovementController mc)
        {
            MovementController = mc;
            CollidedAt = new Vector2();
            _width = 0;
            _height = 0;
            _bounds = new Rectangle(Convert.ToInt32(mc.Position.X), Convert.ToInt32(mc.Position.Y), _width, _height);

            _serverID = _itemCount++;
        }

        public Collidable(int w, int h)
        {
            _width = w;
            _height = h;
            CollidedAt = new Vector2();
            _bounds = new Rectangle(0, 0, _width, _height);

            _serverID = _itemCount++;
        }

        public Collidable(int w, int h, MovementController mc)
        {
            _width = w;
            _height = h;
            CollidedAt = new Vector2();
            MovementController = mc;
            _bounds = new Rectangle(Convert.ToInt32(mc.Position.X), Convert.ToInt32(mc.Position.Y), _width, _height);

            _serverID = _itemCount++;
        }

        public MovementController MovementController { get; set; }
        public bool Disposed { get; set; }
        public int ID { get; set; }
        public bool Collided { get; set; }
        public Vector2 CollidedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        protected int _width { get; set; }
        protected int _height { get; set; }

        public bool Altered()
        {
            return _altered;
        }

        public void ResetAltered()
        {
            _altered = false;
        }

        public int ServerID()
        {
            return _serverID;
        }

        public int Width()
        {
            return _width;
        }

        public int Height()
        {
            return _height;
        }

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
            _altered = true;
            Collided = true;
            // Copy over the position to find collision location
            CollidedAt.X = MovementController.Position.X;
            CollidedAt.Y = MovementController.Position.Y;
        }

        public virtual void HandleOutOfBounds()
        {
            _altered = true;
            // Re-position object in bounds
            MovementController.RepositionInBounds(_width, _height);

            // Reverse velocity, aka bounce
            MovementController.Forces *= -Map.BARRIER_DEPRECATION;
            MovementController.Velocity *= -Map.BARRIER_DEPRECATION;
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
            return new Vector2(this.MovementController.Position.X + .5 * this._width, this.MovementController.Position.Y + .5 * this._height);
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
            LastUpdated = DateTime.UtcNow;
            UpdateBounds();
        }

        public void UpdateBounds()
        {
            _bounds.X = Convert.ToInt32(MovementController.Position.X);
            _bounds.Y = Convert.ToInt32(MovementController.Position.Y);
        }
    }
}