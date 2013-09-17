using System;
using System.Drawing;
using System.Threading;

namespace ShootR
{
    /// <summary>
    /// Base object for all collidable objects which is used to check collisions.  Some examples of usage are through the Ship and Bullet classes.
    /// </summary>
    public class Collidable
    {
        protected Rectangle _bounds;
        private QuadTreeNode _mapLocation;
        private int _serverID = 0;
        private static int _itemCount = 0;

        protected static bool _altered = true;

        public ValueRef<bool> Controllable;

        public Collidable(int w, int h, MovementController mc, LifeController lc, DamageController dc)
        {
            ID = -1;
            _width = w;
            _height = h;
            CollidedAt = new Vector2();            
            _bounds = new Rectangle(Convert.ToInt32(mc.Position.X), Convert.ToInt32(mc.Position.Y), _width, _height);
            MovementController = mc;
            LifeController = lc;
            DamageController = dc;
            Controllable = new ValueRef<bool>(true);

            _serverID = Interlocked.Increment(ref _itemCount);
        }

        public MovementController MovementController { get; set; }
        public LifeController LifeController { get; set; }
        public DamageController DamageController { get; set; }        
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

        public virtual void ResetFlags()
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

        /// <summary>
        /// Does not null out the object.  Simply used to represent when an object is no longer needed in the game world.
        /// </summary>
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

        public double DistanceFrom(int x, int y)
        {
            Vector2 myCenter = this.Center();

            return Math.Sqrt(Math.Pow(myCenter.X - x, 2) + Math.Pow(myCenter.Y - y, 2));
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
            var bounceMultiplier = new Vector2(1, 1);

            // Collided with left or right side
            if (MovementController.Position.X <= 0 || (MovementController.Position.X + Width()) >= Map.WIDTH)
            {
                bounceMultiplier = new Vector2(-Map.BARRIER_DEPRECATION, Map.BARRIER_DEPRECATION);                
            }
            else if (MovementController.Position.Y <= 0 || (MovementController.Position.Y + Height()) >= Map.HEIGHT) // Top or bottom
            {
                bounceMultiplier = new Vector2(Map.BARRIER_DEPRECATION, -Map.BARRIER_DEPRECATION);
            }

            // Re-position object in bounds
            MovementController.RepositionInBounds(_width, _height);

            //Bounce 
            MovementController.Forces *= bounceMultiplier;
            MovementController.Velocity *= bounceMultiplier;
            UpdateBounds();
        }

        /// <summary>
        /// Calculates whether me and the collidable object <paramref name="c"/> are colliding.
        /// </summary>
        /// <param name="c">The object to check the collision against.</param>
        /// <returns>Whether or not I am colliding with <paramref name="c"/>.</returns>
        public virtual bool IsCollidingWith(Collidable c)
        {
            return _bounds.IntersectsWith(c.GetBounds());
        }

        public virtual Rectangle GetBounds()
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


        public virtual void Update()
        {
            LastUpdated = DateTime.UtcNow;
            UpdateBounds();
        }

        public virtual void UpdateBounds()
        {
            _bounds.X = Convert.ToInt32(MovementController.Position.X);
            _bounds.Y = Convert.ToInt32(MovementController.Position.Y);
        }
    }
}