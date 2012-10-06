namespace ShootR
{
    public class GameConfiguration
    {
        public GameConfiguration()
        {
            DRAW_INTERVAL = GameEnvironment.DRAW_INTERVAL;
            UPDATE_INTERVAL = GameEnvironment.UPDATE_INTERVAL;            
            MAX_CAMERA_SPEED = 500;
            // Every X state changes request a ping back
            REQUEST_PING_EVERY = 5;
        }

        public int DRAW_INTERVAL { get; set; }
        public int UPDATE_INTERVAL { get; set; }        
        public int MAX_CAMERA_SPEED { get; set; }
        public int REQUEST_PING_EVERY { get; set; }
    }
}