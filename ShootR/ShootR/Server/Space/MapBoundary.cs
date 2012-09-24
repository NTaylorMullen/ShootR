using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class MapBoundary
    {
        private Rectangle _area;

        public MapBoundary(int width, int height)
        {
            _area = new Rectangle(0, 0, width, height);
        }

        public bool OnMap(Collidable obj)
        {
            return _area.Contains(obj.GetBounds());
        }
    }
}