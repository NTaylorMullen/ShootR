using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public abstract class Ability
    {
        public Ability(string name)
        {
            Active = false;
            Name = name;
        }

        public string Name { get; set; }
        public bool Active { get; set; }
        public DateTime? ActivatedAt { get; private set; }

        public virtual void Activate()
        {
            ActivatedAt = DateTime.UtcNow;
            Active = true;
        }

        public virtual void Deactivate()
        {
            ActivatedAt = null;
            Active = false;
        }

        public virtual void Update(DateTime utcNow)
        {
        }
    }
}