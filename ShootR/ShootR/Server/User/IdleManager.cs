using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class IdleManager
    {
        public const int IDLE_AFTER = 10; // Go idle after X seconds with no communication to the server

        public event Action OnIdle;
        public event Action OnComeBack;

        private DateTime _lastActive;
        private NotificationManager _notificationManager;

        public IdleManager(NotificationManager notificationManager)
        {
            _lastActive = DateTime.UtcNow;
            _notificationManager = notificationManager;
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

                _notificationManager.Notify("You are now Away!");

                if (OnIdle != null)
                {
                    OnIdle();
                }
            }
        }

        public void ComeBack()
        {
            if (Idle == true)
            {
                Idle = false;

                _notificationManager.Notify("You are Back!");
                
                if (OnComeBack != null)
                {
                    OnComeBack();
                }
            }
        }

        public bool CheckIdle()
        {
            if ((DateTime.UtcNow - _lastActive).TotalSeconds >= IDLE_AFTER) // Idle
            {
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