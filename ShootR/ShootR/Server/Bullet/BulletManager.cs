using System.Collections.Generic;

namespace ShootR
{
    /// <summary>
    /// Used to monitor all bullets on the game field.
    /// </summary>
    public class BulletManager
    {
        // Having an int GUID to reduce payload size
        private static int _bulletGUID = 0;

        public BulletManager()
        {
            BulletsInAir = new List<Bullet>();
        }

        public void Add(Bullet bullet)
        {
            bullet.ID = _bulletGUID++;
            BulletsInAir.Add(bullet);
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