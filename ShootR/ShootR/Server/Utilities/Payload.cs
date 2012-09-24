using System.Collections.Concurrent;
using System.Collections.Generic;

namespace ShootR
{
    public class Payload
    {
        public Payload()
        {
            Ships = new ConcurrentDictionary<string, Ship>();
            Bullets = new List<Bullet>();
            Collisions = new List<Collidable>();
        }

        public ConcurrentDictionary<string, Ship> Ships { get; set; }
        public List<Bullet> Bullets { get; set; }
        public List<Collidable> Collisions { get; set; }

        public int ShipsInWorld { get; set; }
        public int BulletsInWorld { get; set; }
    }
}