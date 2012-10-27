using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public abstract class MovementAbility : Ability
    {
        protected MovementController _movementController;
        private double _initialPower;

        public MovementAbility(string name, MovementController movementController)
            : base(name)
        {            
            _movementController = movementController;
            _initialPower = _movementController.Power;
        }

        public void IncreaseSpeedBy(double amount)
        {
            _movementController.Power += amount;
        }

        public void MultiplySpeedBy(double amount)
        {
            _movementController.Power *= amount;
        }

        public void DecreaseSpeedBy(double amount)
        {
            _movementController.Power -= amount;
        }

        public void ResetSpeed()
        {
            _movementController.Power = _initialPower;
        }
    }
}