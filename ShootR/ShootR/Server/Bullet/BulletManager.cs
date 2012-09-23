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
            if (bulletsToBeCleanedUp == null)
            {
                bulletsToBeCleanedUp = new List<Collidable>();
            }

            bulletsInAir = new List<Bullet>();
        }

        public List<Bullet> bulletsInAir { get; set; }
        private static List<Collidable> bulletsToBeCleanedUp { get; set; }

        /// <summary>
        /// Retrieves all bullets that have gone off the screen.
        /// </summary>
        /// <returns>The bullets that are off the screen.</returns>
        public static Collidable[] GetBulletsToBeCleanedUp()
        {
            Collidable[] temp = bulletsToBeCleanedUp.ToArray();
            bulletsToBeCleanedUp.Clear();
            return temp;
        }

        public void Update(GameTime gameTime)
        {
            for (int i = 0; i < bulletsInAir.Count; i++)
            {
                if (bulletsInAir[i].ShouldDispose())
                {
                    bulletsInAir[i].Dispose();
                    // We need to add it to the cleanup list so the client knows to also rid itself of the bullet
                    bulletsToBeCleanedUp.Add(bulletsInAir[i]);
                    bulletsInAir.Remove(bulletsInAir[i--]);
                }
                else
                {
                    bulletsInAir[i].Update(gameTime);
                }
            }
        }
    }
}