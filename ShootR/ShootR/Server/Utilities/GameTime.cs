using System;

namespace ShootR
{
    public class GameTime
    {
        private DateTime _lastUpdated;        

        public GameTime()
        {
            _lastUpdated = DateTime.Now;
            PercentOfSecond = 0;
        }

        /// <summary>
        /// This is updated on Update to show what percent of a second has passed since the last Update loop.
        /// </summary>
        public double PercentOfSecond { get; set; }

        public void Update()
        {
            PercentOfSecond = (DateTime.Now.Subtract(_lastUpdated).Milliseconds / 1000.0);
            _lastUpdated = DateTime.Now;
        }
    }
}