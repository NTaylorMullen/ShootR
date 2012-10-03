using System.Collections.Generic;
using System.Drawing;

namespace ShootR
{
    public class Map
    {
        public const int WIDTH = 5000;
        public const int HEIGHT = 5000;
        public const int MIN_PARTITION_WIDTH = 156;
        public const int MIN_PARTITION_HEIGHT = 156;
        public const double BARRIER_DEPRECATION = .75;

        private QuadTree _space;
        private MapBoundary _boundary;
        private List<Collidable> _allObjects;

        public Map()
        {
            // Double collidable for fast removes/inserts
            _allObjects = new List<Collidable>();
            _space = new QuadTree(WIDTH, HEIGHT, MIN_PARTITION_WIDTH, MIN_PARTITION_HEIGHT);
            _boundary = new MapBoundary(WIDTH, HEIGHT);
        }

        public void Insert(Collidable obj)
        {
            _allObjects.Add(obj);
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
            _allObjects.Remove(obj);
            _space.Remove(obj);
        }

        public void Clear()
        {
            _space.Clear();
        }

        public void Clean()
        {
            for (int i = 0; i < _allObjects.Count; i++)
            {
                if (_allObjects[i].Disposed)
                {
                    Remove(_allObjects[i--]);
                }
                else
                {
                    _allObjects[i].ResetAltered();
                }
            }
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