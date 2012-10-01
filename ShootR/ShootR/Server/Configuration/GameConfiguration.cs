namespace ShootR
{
    public class GameConfiguration
    {
        public GameConfiguration()
        {
            DRAW_INTERVAL = GameEnvironment.DRAW_INTERVAL;
            UPDATE_INTERVAL = GameEnvironment.UPDATE_INTERVAL;
            VIEW_WIDTH = Ship.SCREEN_WIDTH + PayloadManager.SCREEN_BUFFER_AREA;
            VIEW_HEIGHT = Ship.SCREEN_HEIGHT + PayloadManager.SCREEN_BUFFER_AREA;
            MAX_CAMERA_SPEED = 500;
        }

        public int DRAW_INTERVAL { get; set; }
        public int UPDATE_INTERVAL { get; set; }
        public int VIEW_WIDTH { get; set; }
        public int VIEW_HEIGHT { get; set; }
        public int MAX_CAMERA_SPEED { get; set; }
    }
}