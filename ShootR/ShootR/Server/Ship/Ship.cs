namespace Shooter
{
    /// <summary>
    /// A ship on the game field.  Only the owner of the ship can control the ship.  Ownership is decided via the connection id.
    /// </summary>
    public class Ship : Collidable
    {
        public const int WIDTH = 50;
        public const int HEIGHT = 50;

        public Ship(Vector2 pos, BulletManager bm)
            : base(WIDTH, HEIGHT)
        {
            MovementController = new ShipMovementController();
            WeaponController = new ShipWeaponController(this, bm);
        }

        public ShipMovementController MovementController
        {
            get
            {
                return (ShipMovementController)base.MovementController;
            }
            set
            {
                base.MovementController = value;
            }
        }

        public ShipWeaponController WeaponController { get; set; }

        public void Update(GameTime gameTime)
        {
            MovementController.Update(gameTime);
        }
    }
}