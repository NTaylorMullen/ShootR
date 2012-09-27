using System.Drawing;

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