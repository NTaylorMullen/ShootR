using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Drawing;
using System.Threading;
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

        private ShipInterpolationManager _interpolationManager;
        private ConcurrentQueue<Action> _enqueuedCommands;
        private ShipSnapShotManager _snapShotManager;

        public Ship(Vector2 position, BulletManager bm)
            : base(WIDTH, HEIGHT, new ShipMovementController(position), new ShipLifeController(START_LIFE), new HarmlessDamageController())
        {
            ID = Interlocked.Increment(ref _shipGUID);
            Name = "Ship" + ID;
            StatRecorder = new ShipStatRecorder(this);
            WeaponController = new ShipWeaponController(this, bm);
            LifeController.OnDeath += new DeathEventHandler(Die);
            OnDeath += new DeathEventHandler((sender, e) => StatRecorder.ShipDeath(sender, e)); // layer of indirection required since 'StatRecorder' is vurtla and may be changed by subclassed types
            LifeController.Host = this;

            LevelManager = new ShipLevelManager(this);
            AbilityHandler = new ShipAbilityHandler(this);

            _enqueuedCommands = new ConcurrentQueue<Action>();
            _interpolationManager = new ShipInterpolationManager(MovementController);
            _snapShotManager = new ShipSnapShotManager(this);
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

        public override Rectangle GetBounds()
        {
            return _snapShotManager.GetBoundsSnapShot();
        }

        public override bool IsCollidingWith(Collidable c)
        {
            return _snapShotManager.GetBoundsSnapShot().IntersectsWith(c.GetBounds());
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

        public virtual void ActivateAbility(string abilityName, Vector2 at, double angle, Vector2 velocity)
        {
            Host.IdleManager.RecordActivity();

            _enqueuedCommands.Enqueue(() =>
            {
                _interpolationManager.SyncMovement(at, angle, velocity);

                AbilityHandler.Activate(abilityName);
            });
        }

        public virtual void DeactivateAbility(string abilityName, Vector2 at, double angle, Vector2 velocity)
        {
            Host.IdleManager.RecordActivity();

            _enqueuedCommands.Enqueue(() =>
            {
                _interpolationManager.SyncMovement(at, angle, velocity);

                AbilityHandler.Deactivate(abilityName);
            });
        }

        public virtual void StartMoving(Movement where, Vector2 at, double angle, Vector2 velocity)
        {
            Host.IdleManager.RecordActivity();

            _enqueuedCommands.Enqueue(() =>
            {
                _interpolationManager.SyncMovement(at, angle, velocity);

                MovementController.StartMoving(where);
            });
        }

        public virtual void StopMoving(Movement where, Vector2 at, double angle, Vector2 velocity)
        {
            Host.IdleManager.RecordActivity();

            _enqueuedCommands.Enqueue(() =>
            {
                _interpolationManager.SyncMovement(at, angle, velocity);

                MovementController.StopMoving(where);
            });
        }

        public virtual void SyncMovement(Vector2 at, double angle, Vector2 velocity)
        {
            _enqueuedCommands.Enqueue(() =>
            {
                _interpolationManager.SyncMovement(at, angle, velocity);
            });
        }

        public void ResetMoving(List<Movement> movementList, Vector2 at, double angle, Vector2 velocity)
        {
            _enqueuedCommands.Enqueue(() =>
            {
                _interpolationManager.SyncMovement(at, angle, velocity);

                foreach (Movement m in movementList)
                {
                    MovementController.StopMoving(m);
                }
            });
        }

        public virtual void Update(GameTime gameTime)
        {
            WeaponController.Update(GameTime.Now);
            _interpolationManager.Update(gameTime);

            if (!_interpolationManager.Interpolating)
            {
                MovementController.Update(gameTime);
            }

            AbilityHandler.Update(GameTime.Now);
            _snapShotManager.Update(gameTime);
            base.Update();

            Action command;

            while (_enqueuedCommands.Count > 0)
            {
                if (_enqueuedCommands.TryDequeue(out command) && !this.Disposed)
                {
                    command();
                }
            }
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