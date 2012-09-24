using System.Collections.Generic;

namespace ShootR
{
    /// <summary>
    /// Used to monitor all bullets on the game field.
    /// </summary>
    public class BulletManager
    {
        public BulletManager()
        {
            BulletsInAir = new List<Bullet>();
        }

        public List<Bullet> BulletsInAir { get; set; }

        public void Update(GameTime gameTime)
        {
            for (int i = 0; i < BulletsInAir.Count; i++)
            {
                if (BulletsInAir[i].ShouldDispose())
                {
                    BulletsInAir[i].Dispose();
                    BulletsInAir.Remove(BulletsInAir[i--]);
                }
                else
                {
                    BulletsInAir[i].Update(gameTime);
                }
            }
        }
    }
}