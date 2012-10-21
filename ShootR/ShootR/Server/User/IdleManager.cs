using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class IdleManager
    {
        public const int IDLE_AFTER = 120; // Go idle after X seconds with no communication to the server

        public event Action<Ship> OnIdle;
        public event Action<Ship> OnComeBack;

        private DateTime _lastActive;
        private NotificationManager _notificationManager;
        private Ship _me;

        public IdleManager(Ship me, NotificationManager notificationManager)
        {
            _lastActive = DateTime.UtcNow;
            _notificationManager = notificationManager;
            _me = me;
            Idle = false;
        }

        public bool Idle { get; set; }

        public void RecordActivity()
        {
            _lastActive = DateTime.UtcNow;
        }

        public void GoIdle()
        {
            if (Idle == false)
            {
                Idle = true;

                _me.Name = "(Away) " + _me.Name;
                _notificationManager.Notify("You are now Away!  You will not see any new ships on screen.");

                if (OnIdle != null)
                {
                    OnIdle(_me);
                }
            }
        }

        public void ComeBack()
        {
            if (Idle == true)
            {
                Idle = false;

                _me.Name = _me.Name.Replace("(Away) ", "");
                _notificationManager.Notify("You are Back!");

                if (OnComeBack != null)
                {
                    OnComeBack(_me);
                }
            }
        }

        public bool CheckIdle()
        {
            var now = DateTime.UtcNow;
            if ((now - _lastActive).TotalSeconds >= IDLE_AFTER && _me.LifeController.Alive) // Idle
            {
                // This is here for performance
                // Check if we've fired to prevent idle
                if ((now - _me.WeaponController.LastFired).TotalSeconds < IDLE_AFTER)
                {
                    _lastActive = _me.WeaponController.LastFired;
                    ComeBack();
                    return false;
                }

                GoIdle();
                return true;
            }
            else // Still here
            {
                ComeBack();
                return false;
            }
        }
    }
}