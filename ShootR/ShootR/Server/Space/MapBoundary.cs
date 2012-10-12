using System.Drawing;

namespace ShootR
{
    public class MapBoundary
    {
        public MapBoundary(int width, int height)
        {
            Area = new Rectangle(0, 0, width, height);
        }

        public Rectangle Area { get; private set; }

        public bool OnMap(Collidable obj)
        {
            return Area.Contains(obj.GetBounds());
        }
    }
}