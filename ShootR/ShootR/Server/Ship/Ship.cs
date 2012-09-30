namespace ShootR
{
    /// <summary>
    /// A ship on the game field.  Only the owner of the ship can control the ship.  Ownership is decided via the connection id.
    /// </summary>
    public class Ship : Collidable
    {
        public const int WIDTH = 50;
        public const int HEIGHT = 50;
        public const int SCREEN_WIDTH = 1280;
        public const int SCREEN_HEIGHT = 600;

        private ShipWeaponController _weaponController;        

        public Ship(Vector2 position, BulletManager bm)
            : base(WIDTH, HEIGHT)
        {
            MovementController = new ShipMovementController(position);
            _weaponController = new ShipWeaponController(this, bm);
        }

        public string Name { get; set; }

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

        public void StartMoving(Movement where)
        {
            _altered = true;
            MovementController.StartMoving(where);
        }

        public void StopMoving(Movement where)
        {
            _altered = true;
            MovementController.StopMoving(where);
        }

        public ShipWeaponController GetWeaponController()
        {
            return _weaponController;
        }

        public void Update(GameTime gameTime)
        {
            MovementController.Update(gameTime);
            base.Update();
        }

        public override void HandleCollisionWith(Collidable c, Map space)
        {
            _altered = true;
        }
    }
}