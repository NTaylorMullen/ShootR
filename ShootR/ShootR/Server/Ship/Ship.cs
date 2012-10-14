using System;
using System.Collections.Generic;
using Microsoft.AspNet.SignalR;
namespace ShootR
{
    /// <summary>
    /// A ship on the game field.  Only the owner of the ship can control the ship.  Ownership is decided via the connection id.
    /// </summary>
    public class Ship : Collidable
    {
        public const int WIDTH = 73;
        public const int HEIGHT = 50;
        public const int LIFE = 100;

        private ShipWeaponController _weaponController;

        public Ship(Vector2 position, BulletManager bm)
            : base(WIDTH, HEIGHT, new ShipMovementController(position), new LifeController(LIFE))
        {
            StatRecorder = new ShipStatRecorder();
            _weaponController = new ShipWeaponController(this, bm);
            LifeController.OnDeath += new DeathEventHandler(Die);
            LifeController.OnDeath += new DeathEventHandler(StatRecorder.ShipDeath);
            LifeController.Host = this;
        }

        public string Name { get; set; }
        public User Host { get; set; }
        public bool RespawnEnabled { get; set; }

        public ShipStatRecorder StatRecorder { get; set; }

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
            this.Dispose();
        }

        public void StartMoving(Movement where)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));
            MovementController.StartMoving(where);            
        }

        public void StopMoving(Movement where)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));
            MovementController.StopMoving(where);
        }

        public void ResetMoving(List<Movement> movementList)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));

            foreach (Movement m in movementList)
            {
                MovementController.StopMoving(m);
            }
        }

        public ShipWeaponController GetWeaponController()
        {
            return _weaponController;
        }

        public void Update(GameTime gameTime)
        {
            Update(GameTime.CalculatePercentOfSecond(LastUpdated));
        }

        public void Update(double PercentOfSecond)
        {
            MovementController.Update(PercentOfSecond);
            base.Update();
        }

        public override void HandleCollisionWith(Collidable c, Map space)
        {
        }
    }
}