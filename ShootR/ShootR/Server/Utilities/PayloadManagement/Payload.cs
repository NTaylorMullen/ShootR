using System.Collections.Concurrent;
using System.Collections.Generic;

namespace ShootR
{
    public class Payload
    {
        public Payload()
        {
            Ships = new ConcurrentDictionary<string, object>();
            Bullets = new List<object>();
        }

        public ConcurrentDictionary<string, object> Ships { get; set; }
        public List<object> Bullets { get; set; }

        public int ShipsInWorld { get; set; }
        public int BulletsInWorld { get; set; }
    }
}