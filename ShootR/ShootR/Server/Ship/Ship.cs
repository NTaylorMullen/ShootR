using System;
using System.Collections.Generic;
using System.Threading;
using Microsoft.AspNet.SignalR;
namespace ShootR
{
    /// <summary>
    /// A ship on the game field.  Only the owner of the ship can control the ship.  Ownership is decided via the connection id.
    /// </summary>
    public class Ship : Collidable
    {
        public const int WIDTH = 75;
        public const int HEIGHT = 75;
        public const int START_LIFE = 100;

        public event KillEventHandler OnKill;
        public event DeathEventHandler OnDeath;
        public event Action<Bullet> OnFire;
        public event Action OnOutOfBounds;

        private static int _shipGUID = 0;

        public Ship(Vector2 position, BulletManager bm)
            : base(WIDTH, HEIGHT, new ShipMovementController(position), new ShipLifeController(START_LIFE), new HarmlessDamageController())
        {
            ID = Interlocked.Increment(ref _shipGUID);
            Name = "Ship" + ID;
            StatRecorder = new ShipStatRecorder(this);
            WeaponController = new ShipWeaponController(this, bm);
            LifeController.OnDeath += new DeathEventHandler(Die);
            OnDeath += new DeathEventHandler(StatRecorder.ShipDeath);
            LifeController.Host = this;

            LevelManager = new ShipLevelManager(this);
            AbilityHandler = new ShipAbilityHandler(this);
        }

        public string Name { get; set; }
        public User Host { get; set; }
        public bool RespawnEnabled { get; set; }        

        public virtual ShipStatRecorder StatRecorder { get; protected set; }
        public ShipAbilityHandler AbilityHandler { get; private set; }
        public ShipLevelManager LevelManager { get; private set; }
        public ShipWeaponController WeaponController { get; private set; }
        public Ship LastKilledBy { get; private set; }

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

        public override void ResetFlags()
        {

            base.ResetFlags();
        }

        public void Die(object sender, DeathEventArgs e)
        {
            MovementController.StopMovement();

            if (OnDeath != null)
            {
                // Propogate death event
                OnDeath(this, e);
            }

            // Spawn health pack on death
            Game.Instance.GameHandler.AddPowerupToGame(new HealthPack(MovementController.Position, LevelManager.Level));

            LastKilledBy = (e.KilledBy as Bullet).FiredBy;
            Host.DeathOccured = true;

            LastKilledBy.Killed(this);

            this.Dispose();
        }

        public void Killed(Collidable who)
        {
            if (OnKill != null)
            {
                OnKill(this, new KillEventArgs(who));
            }
        }

        public virtual void ActivateAbility(string abilityName, long commandID)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));

            Host.IdleManager.RecordActivity();
            AbilityHandler.Activate(abilityName);
            Host.LastCommandID = commandID;
        }

        public virtual void DeactivateAbility(string abilityName, long commandID)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));

            Host.IdleManager.RecordActivity();
            AbilityHandler.Deactivate(abilityName);
            Host.LastCommandID = commandID;
        }

        public virtual void StartMoving(Movement where, long commandID)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));

            Host.IdleManager.RecordActivity();
            MovementController.StartMoving(where);
            Host.LastCommandID = commandID;
        }

        public virtual void StopMoving(Movement where, long commandID)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));

            Host.IdleManager.RecordActivity();
            MovementController.StopMoving(where);
            Host.LastCommandID = commandID;
        }

        public void ResetMoving(List<Movement> movementList, long commandID)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));

            foreach (Movement m in movementList)
            {
                MovementController.StopMoving(m);
            }

            Host.LastCommandID = commandID;
        }                

        public void Update(GameTime gameTime)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));
        }

        public virtual void Update(double PercentOfSecond)
        {
            MovementController.Update(PercentOfSecond);
            AbilityHandler.Update(GameTime.Now);
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

        public override void HandleOutOfBounds()
        {
            if (OnOutOfBounds != null)
            {
                OnOutOfBounds();
            }

            base.HandleOutOfBounds();
        }
    }
}