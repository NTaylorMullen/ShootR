namespace ShootR
{
    public class ShipConfiguration
    {
        public ShipConfiguration()
        {
            
            FIRE_RATE = ShipWeaponController.FIRE_RATE;
            HEIGHT = Ship.HEIGHT;            
            WIDTH = Ship.WIDTH;
            START_LIFE = Ship.START_LIFE;
            DAMAGE_INCREASE_RATE = ShipWeaponController.DAMAGE_INCREASE_RATE;
        }

        public int FIRE_RATE { get; set; }
        public int HEIGHT { get; set; }        
        public int WIDTH { get; set; }
        public int START_LIFE { get; set; }
        public double DAMAGE_INCREASE_RATE { get; set; }
    }
}