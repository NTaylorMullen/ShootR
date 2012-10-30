namespace ShootR
{
    public class ShipConfiguration
    {
        public ShipConfiguration()
        {
            HEIGHT = Ship.HEIGHT;            
            ENERGY_TO_FIRE = ShipWeaponController.ENERGY_TO_FIRE;
            ENERGY_RECHARGE_RATE = ShipWeaponController.ENERGY_RECHARGE_RATE;
            MIN_FIRE_RATE = ShipWeaponController.MIN_FIRE_RATE;
            WIDTH = Ship.WIDTH;
            START_LIFE = Ship.START_LIFE;
            DAMAGE_INCREASE_RATE = ShipWeaponController.DAMAGE_INCREASE_RATE;
        }

        public int HEIGHT { get; set; }        
        public double ENERGY_TO_FIRE { get; set; }
        public int ENERGY_RECHARGE_RATE { get; set; }
        public int MIN_FIRE_RATE { get; set; }
        public int WIDTH { get; set; }
        public int START_LIFE { get; set; }
        public double DAMAGE_INCREASE_RATE { get; set; }
    }
}