namespace ShootR
{
    public class ConfigurationManager
    {
        public ConfigurationManager()
        {
            bulletConfig = new BulletConfiguration();
            gameConfig = new GameConfiguration();
            shipConfig = new ShipConfiguration();
            mapConfig = new MapConfiguration();
            screenConfig = new ScreenConfiguration();
        }

        // Bullet Configurations
        public BulletConfiguration bulletConfig { get; set; }

        // Game Configurations
        public GameConfiguration gameConfig { get; set; }

        // Ship Configurations
        public ShipConfiguration shipConfig { get; set; }

        // Map Configurations
        public MapConfiguration mapConfig { get; set; }

        // Screen Configurations
        public ScreenConfiguration screenConfig { get; set; }
    }
}