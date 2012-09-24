namespace ShootR
{
    public class BulletConfiguration
    {
        public BulletConfiguration()
        {
            BULLET_LEAD = ShipWeaponController.BULLET_LEAD;
            SPEED = BulletMovementController.MAX_SPEED;
            HEIGHT = Bullet.HEIGHT;
            WIDTH = Bullet.WIDTH;
        }

        public double BULLET_LEAD { get; set; }
        public double SPEED { get; set; }
        public int HEIGHT { get; set; }
        public int WIDTH { get; set; }
    }
}