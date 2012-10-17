using System.Collections.Generic;

namespace ShootR
{
    public class CollisionManager
    {
        private List<Collidable> _objects;
        private Map _space;

        public CollisionManager(Map space)
        {
            _space = space;
            _objects = new List<Collidable>();
        }

        public List<Collidable> GetObjects()
        {
            return _objects;
        }

        public void Monitor(Collidable obj)
        {
            _space.Insert(obj);
            _objects.Add(obj);
        }

        public void UnMonitor(Collidable obj)
        {
            _space.Remove(obj);
            _objects.Remove(obj);
        }

        public void Update(GameTime gameTime)
        {
            for (int i = 0; i < _objects.Count; i++)
            {               
                if (_objects[i].Disposed)
                {
                    _objects.Remove(_objects[i--]);
                    continue;
                }

                // If this bullet has already collided
                if (_objects[i].Collided)
                {
                    continue;
                }

                // Retrieve objects that it could be colliding with
                List<Collidable> potentials = _objects[i].GetMapArea().GetSubTreeContents();

                for (int j = 0; j < potentials.Count; j++)
                {
                    // If the potential object is our outer object then move on
                    if (potentials[j].Collided || potentials[j] == _objects[i])
                    {
                        continue;
                    }

                    if (_objects[i].IsCollidingWith(potentials[j]))
                    {
                        _objects[i].HandleCollisionWith(potentials[j], _space);
                        potentials[j].HandleCollisionWith(_objects[i], _space);

                        if (_objects[i].Disposed)
                        {
                            _objects.Remove(_objects[i--]);
                            break;
                        }
                    }
                }
            }
        }
    }
}