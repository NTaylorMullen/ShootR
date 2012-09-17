namespace Shooter
{
    public class GameConfiguration
    {
        public GameConfiguration()
        {
            DRAW_INTERVAL = GameEnvironment.DRAW_INTERVAL;
            UPDATE_INTERVAL = GameEnvironment.UPDATE_INTERVAL;
        }

        public int DRAW_INTERVAL { get; set; }
        public int UPDATE_INTERVAL { get; set; }
    }
}