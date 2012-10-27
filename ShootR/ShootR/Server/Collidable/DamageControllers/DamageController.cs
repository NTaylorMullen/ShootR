using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class DamageController
    {
        public DamageController(int damage)
        {
            Damage = damage;
        }

        public int Damage { get; private set; }

        public void IncreaseDamage(int amount)
        {
            Damage += amount;
        }

        public void MultiplyDamage(double amount)
        {
            Damage = Convert.ToInt32(amount * Damage);
        }

        public void DecreaseDamage(int amount)
        {
            Damage -= amount;
        }
    }
}