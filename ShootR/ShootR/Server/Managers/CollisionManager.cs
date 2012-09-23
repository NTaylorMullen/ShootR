using System.Collections.Generic;

namespace ShootR
{
    public class CollisionManager
    {
        private List<Collidable> _amunitionCollisions;
        private List<Collidable> _objects;
        private QuadTree _map;

        public CollisionManager(QuadTree map)
        {
            _map = map;
            _objects = new List<Collidable>();
            _amunitionCollisions = new List<Collidable>();
        }

        /// <summary>
        /// Retrieves all pieces of amunition that have had collisions with objects
        /// </summary>
        /// <returns>An array of amunitions that have collided with an object</returns>
        public Collidable[] GetAmunitionCollisions()
        {
            Collidable[] temp = _amunitionCollisions.ToArray();
            _amunitionCollisions.Clear();
            return temp;
        }

        public void Monitor(Collidable obj)
        {
            _map.Insert(obj);
            _objects.Add(obj);
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
                        if (_objects[i].GetType() == typeof(Bullet))
                        {
                            _amunitionCollisions.Add(_objects[i]);
                        }
                        if (potentials[j].GetType() == typeof(Bullet))
                        {
                            _amunitionCollisions.Add(potentials[j]);
                        }

                        _objects[i].HandleCollisionWith(potentials[j], _map);
                        potentials[j].HandleCollisionWith(_objects[i], _map);

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