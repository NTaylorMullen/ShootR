using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class Map
    {
        public const int WIDTH = 5000;
        public const int HEIGHT = 5000;
        public const int MIN_PARTITION_WIDTH = 156;
        public const int MIN_PARTITION_HEIGHT = 156;

        private QuadTree _space;
        private MapBoundary _boundary;

        public Map()
        {
            _space = new QuadTree(WIDTH, HEIGHT, MIN_PARTITION_WIDTH, MIN_PARTITION_HEIGHT);
            _boundary = new MapBoundary(WIDTH, HEIGHT);
            Center = new Vector2(WIDTH * .5, HEIGHT * .5);
        }

        public Vector2 Center;

        public void Insert(Collidable obj)
        {
            _space.Insert(obj);
        }

        public List<Collidable> GetPartialCollisionCheckList(Collidable obj)
        {
            return _space.GetPartialCollisionCheckList(obj);
        }

        public List<Collidable> Query(Rectangle queryArea)
        {
            return _space.Query(queryArea);
        }

        public void Remove(Collidable obj)
        {
            _space.Remove(obj);
        }

        public void Clear()
        {
            _space.Clear();
        }

        public void Update()
        {
            _space.Update();
        }

        public bool OnMap(Collidable obj)
        {
            return _boundary.OnMap(obj);
        }

        public void HandleOutOfBounds(Collidable obj)
        {

        }
    }
}