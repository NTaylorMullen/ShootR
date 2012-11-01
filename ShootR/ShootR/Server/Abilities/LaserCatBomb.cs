using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class LaserCatBomb : Ability
    {
        public const string NAME = "LaserCatBomb";
        public static readonly TimeSpan DURATION = TimeSpan.FromHours(15);
        public const int AVAILABLE_AT = 100;

        private bool _available = true;
        private NotificationManager _notificationManager;

        public LaserCatBomb(NotificationManager notificationManager, User user)
            : base(NAME)
        {
            _notificationManager = notificationManager;
            if (!(user is UserAI))
            {
                Game.GetContext().Clients.Client(user.ConnectionID).bindLaserCat();
            }
            //_notificationManager.Notify("LaserCat bomb has been enabled.  Press '1' to trigger it.  WARNING: You only have one.");
        }

        public override void Activate()
        {
            if (_available)
            {
                Game.GetContext().Clients.All.laserCatBomb(true);

                _available = false;
                base.Activate();
            }
        }

        public override void Deactivate()
        {
            if (Active)
            {
                _available = true;
                Game.GetContext().Clients.All.laserCatBomb(false);
                base.Deactivate();
            }
        }

        public override void Update(DateTime utcNow)
        {
            if (Active && utcNow - ActivatedAt >= DURATION)
            {
                Deactivate();
                base.Update(utcNow);
            }
        }
    }
}