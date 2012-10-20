using System;
using System.Collections.Generic;
using System.Threading;
using SignalR;
namespace ShootR
{
    /// <summary>
    /// A ship on the game field.  Only the owner of the ship can control the ship.  Ownership is decided via the connection id.
    /// </summary>
    public class Ship : Collidable
    {
        public const int WIDTH = 73;
        public const int HEIGHT = 50;
        public const int START_LIFE = 100;

        public event KillEventHandler OnKill;
        public event DeathEventHandler OnDeath;
        public event Action<Bullet> OnFire;

        private ShipWeaponController _weaponController;

        private static int _shipGUID = 0;

        public Ship(Vector2 position, BulletManager bm)
            : base(WIDTH, HEIGHT, new ShipMovementController(position), new ShipLifeController(START_LIFE))
        {
            ID = Interlocked.Increment(ref _shipGUID);
            StatRecorder = new ShipStatRecorder(this);
            _weaponController = new ShipWeaponController(this, bm);
            LifeController.OnDeath += new DeathEventHandler(Die);
            OnDeath += new DeathEventHandler(StatRecorder.ShipDeath);
            LifeController.Host = this;

            LevelManager = new ShipLevelManager(this);
        }

        public string Name { get; set; }
        public User Host { get; set; }
        public bool RespawnEnabled { get; set; }
        public long LastCommandID { get; set; }

        public ShipStatRecorder StatRecorder { get; private set; }
        public ShipLevelManager LevelManager { get; private set; }

        public ShipLifeController LifeController
        {
            get
            {
                return (ShipLifeController)base.LifeController;
            }
            set
            {
                base.LifeController = value;
            }
        }

        public ShipMovementController MovementController
        {
            get
            {
                return (ShipMovementController)base.MovementController;
            }
            set
            {
                base.MovementController = value;
            }
        }

        public void Die(object sender, DeathEventArgs e)
        {
            MovementController.StopMovement();

            if (OnDeath != null)
            {
                // Propogate death event
                OnDeath(this, e);
            }

            (e.KilledBy as Bullet).FiredBy.Killed(this);

            this.Dispose();
        }

        public void Killed(Collidable who)
        {
            if (OnKill != null)
            {
                OnKill(this, new KillEventArgs(who));
            }
        }

        public virtual void StartMoving(Movement where, long commandID)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));

            Host.IdleManager.RecordActivity();
            MovementController.StartMoving(where);
            LastCommandID = commandID;
        }

        public virtual void StopMoving(Movement where, long commandID)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));

            Host.IdleManager.RecordActivity();
            MovementController.StopMoving(where);
            LastCommandID = commandID;
        }

        public void ResetMoving(List<Movement> movementList, long commandID)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));

            foreach (Movement m in movementList)
            {
                MovementController.StopMoving(m);
            }

            LastCommandID = commandID;
        }

        public ShipWeaponController GetWeaponController()
        {
            return _weaponController;
        }

        public void Update(GameTime gameTime)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));
        }

        public virtual void Update(double PercentOfSecond)
        {
            MovementController.Update(PercentOfSecond);
            base.Update();
        }

        public void Fired(Bullet bullet)
        {
            if (OnFire != null)
            {
                OnFire(bullet);
            }
        }

        public override void HandleCollisionWith(Collidable c, Map space)
        {
        }
    }
}