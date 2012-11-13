using System;
namespace ShootR
{
    public class GameConfiguration
    {
        public GameConfiguration()
        {
            // How frequently the Update loop is executed
            UPDATE_INTERVAL = 20;
            // How frequently the Draw loop is executed.  Draw is what triggers the client side pings
            DRAW_INTERVAL = 40;
            LEADERBOARD_PUSH_INTERVAL = 1000; // 1 time per second push leaderboard

            // Every X state changes request a ping back
            REQUEST_PING_EVERY = 5;

            RESPAWN_TIMER = RespawnManager.RESPAWN_TIMER;

            BULLET_DIE_AFTER = Convert.ToInt32(Bullet.DIE_AFTER.TotalMilliseconds);
        }

        public int DRAW_INTERVAL { get; set; }
        public int UPDATE_INTERVAL { get; set; }
        public int LEADERBOARD_PUSH_INTERVAL { get; set; }
        public int REQUEST_PING_EVERY { get; set; }
        public int RESPAWN_TIMER { get; set; }
        public int BULLET_DIE_AFTER { get; set; }
    }
}