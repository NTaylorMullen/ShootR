using System;
using System.Drawing;

namespace ShootR
{
    public class ShipSnapShotManager
    {
        private TimeSpan _snapShotLifetime;
        private BoundsSnapShot _snapShotHead;
        private BoundsSnapShot _snapShotTail;
        private Ship _ship;
        private Rectangle _bounds;
        private object _updateLock;

        public ShipSnapShotManager(Ship ship)
        {
            _snapShotLifetime = TimeSpan.FromMilliseconds(Game.Instance.Configuration.gameConfig.DRAW_INTERVAL * 1.5);

            _snapShotTail = new BoundsSnapShot
            {
                Position = ship.MovementController.Position,
                At = GameTime.Now,
                Next = null
            };
            _snapShotHead = new BoundsSnapShot
            {
                Position = ship.MovementController.Position,
                At = GameTime.Now,
                Next = _snapShotTail
            };

            _ship = ship;
            _bounds = new Rectangle(Convert.ToInt32(_ship.MovementController.Position.X), Convert.ToInt32(_ship.MovementController.Position.Y), _ship.Width(), _ship.Height());
            _updateLock = new object();
        }

        public Rectangle GetBoundsSnapShot()
        {
            return _bounds;
        }

        public void Update(GameTime gameTime)
        {
            lock (_updateLock)
            {
                // Remove old snapshots
                while ((GameTime.Now - _snapShotHead.At) > _snapShotLifetime && _snapShotHead.Next != null)
                {
                    _snapShotHead = _snapShotHead.Next;
                }

                _snapShotTail.Next = new BoundsSnapShot
                {
                    Position = _ship.MovementController.Position,
                    At = GameTime.Now,
                    Next = null
                };

                _snapShotTail = _snapShotTail.Next;

                _bounds.X = Convert.ToInt32(_snapShotHead.Position.X);
                _bounds.Y = Convert.ToInt32(_snapShotHead.Position.Y);
            }
        }

        class BoundsSnapShot
        {
            public Vector2 Position { get; set; }
            public DateTime At { get; set; }
            public BoundsSnapShot Next { get; set; }
        }
    }
}