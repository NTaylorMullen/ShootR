using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class PowerupManager
    {
        private List<Powerup> _powerupList;
        private object _locker;

        public PowerupManager()
        {
            _powerupList = new List<Powerup>();
            _locker = new object();
        }

        public void Add(Powerup powerup)
        {
            lock (_locker)
            {
                _powerupList.Add(powerup);
            }
        }

        public void Update(GameTime gameTime)
        {
            for (int i = _powerupList.Count - 1; i >= 0; i--)
            {
                if (_powerupList[i].Disposed)
                {
                    _powerupList[i--] = _powerupList[_powerupList.Count - 1];
                    _powerupList.RemoveAt(_powerupList.Count - 1);
                }
                else
                {
                    _powerupList[i].Update(GameTime.Now);
                }
            }
        }
    }
}