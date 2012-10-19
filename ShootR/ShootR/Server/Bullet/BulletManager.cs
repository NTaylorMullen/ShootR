using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShootR
{
    /// <summary>
    /// Used to monitor all bullets on the game field.
    /// </summary>
    public class BulletManager
    {
        private object _locker = new object();

        public BulletManager()
        {
            Bullets = new List<Bullet>();
        }

        public void Add(Bullet bullet)
        {
            lock (_locker)
            {
                Bullets.Add(bullet);
            }
        }

        public List<Bullet> Bullets { get; set; }

        public void Update(GameTime gameTime)
        {
            bool[] bulletsToKeepAround = new bool[Bullets.Count];
            Parallel.For(0, Bullets.Count, i =>
            {
                Bullet currentBullet = Bullets[i];
                if (currentBullet.ShouldDispose(GameTime.Now))
                {
                    currentBullet.Dispose();
                }
                if (currentBullet.Disposed)
                {
                    bulletsToKeepAround[i] = false; // don't keep me around
                }
                else
                {
                    currentBullet.Update(gameTime);
                    bulletsToKeepAround[i] = true; // keep me around
                }
            });

            lock (_locker)
            {
                for (int i = bulletsToKeepAround.Length - 1; i >= 0; i--)
                {
                    if (!bulletsToKeepAround[i])
                    {
                        Bullets[i] = Bullets[Bullets.Count - 1];
                        Bullets.RemoveAt(Bullets.Count - 1);
                    }
                }
            }
        }
    }
}