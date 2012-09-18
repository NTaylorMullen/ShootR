using System.Collections.Concurrent;
using System.Collections.Generic;

namespace ShootR
{
    /// <summary>
    /// Used to monitor all bullets on the game field.
    /// </summary>
    public class BulletManager
    {
        // Extend X pixels away from the furthest ship etc.
        private const double BULLET_BOUNDARY_EXTENSION = 1000;
        private static GameScreen currentScreen = new GameScreen(0, 0, 0, 0);

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


        /// <summary>
        /// Determines if the given bullet is still on the relative screen.
        /// </summary>
        /// <param name="b">Bullet to see if is on screen</param>
        /// <returns>Whether or not the bullet is actually on the screen.</returns>
        public bool IsOnScreen(Bullet b)
        {
            return ((b.MovementController.Position.Y >= currentScreen.Top) && (b.MovementController.Position.Y <= currentScreen.Bottom) && (b.MovementController.Position.X >= currentScreen.Left) && (b.MovementController.Position.X <= currentScreen.Right));
        }

        public void Update(GameTime gameTime)
        {
            for (int i = 0; i < bulletsInAir.Count; i++)
            {
                if (!IsOnScreen(bulletsInAir[i]) || bulletsInAir[i].Disposed)
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

        /// <summary>
        /// Calculates the relative screen based on all ships on the game field
        /// </summary>
        /// <param name="ships"></param>
        public void UpdateRelativeScreen(ConcurrentDictionary<string, Ship> ships)
        {
            foreach (Ship ship in ships.Values)
            {
                if (ship.MovementController.Position.X - BULLET_BOUNDARY_EXTENSION < currentScreen.Left)// Update screen x
                {
                    currentScreen.Left = ship.MovementController.Position.X - BULLET_BOUNDARY_EXTENSION;
                }
                if (ship.MovementController.Position.X + BULLET_BOUNDARY_EXTENSION > currentScreen.Right)
                {
                    currentScreen.Right = ship.MovementController.Position.X + BULLET_BOUNDARY_EXTENSION;
                }
                if (ship.MovementController.Position.Y - BULLET_BOUNDARY_EXTENSION < currentScreen.Top)
                {
                    currentScreen.Top = ship.MovementController.Position.Y - BULLET_BOUNDARY_EXTENSION;
                }
                if (ship.MovementController.Position.Y + BULLET_BOUNDARY_EXTENSION > currentScreen.Bottom)
                {
                    currentScreen.Bottom = ship.MovementController.Position.Y + BULLET_BOUNDARY_EXTENSION;
                }
            }
        }
    }
}