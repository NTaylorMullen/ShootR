using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class IdleManager
    {
        private static readonly TimeSpan IDLE_AFTER = TimeSpan.FromSeconds(120); // Go idle after X seconds with no communication to the server
        private static readonly TimeSpan DISCONNECT_AFTER = TimeSpan.FromMinutes(15); // Disconnect after X hours of being idle

        public event Action<Ship> OnIdle;
        public event Action<User> OnIdleTimeout;
        public event Action<Ship> OnComeBack;

        private DateTime _lastActive;
        private DateTime? _idleAt;
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

        public void GoIdle(DateTime now)
        {
            if (Idle == false)
            {
                _idleAt = now;
                Idle = true;

                if (_me.Host.Connected)
                {
                    _notificationManager.Notify("You are now Away!  You will not see any new ships on screen.");
                }

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

                if (_me.Host.Connected)
                {
                    _notificationManager.Notify("You are Back!");
                }

                if (OnComeBack != null)
                {
                    OnComeBack(_me);
                }
            }
        }

        public void Update()
        {
            var now = DateTime.UtcNow;
            if (now - _lastActive >= IDLE_AFTER && _me.LifeController.Alive) // Idle
            {
                // This is here for performance
                // Check if we've fired to prevent idle
                if (now - _me.WeaponController.LastFired < IDLE_AFTER)
                {
                    _lastActive = _me.WeaponController.LastFired;
                    ComeBack();
                    return;
                }

                // Need to disconnect
                if (_idleAt.HasValue && now - _idleAt >= DISCONNECT_AFTER)
                {
                    _idleAt = null;
                    if (OnIdleTimeout != null)
                    {
                        OnIdleTimeout(_me.Host);
                    }
                }
                else
                {
                    GoIdle(now);
                }
            }
            else // Still here
            {
                _idleAt = null;
                ComeBack();
            }
        }
    }
}