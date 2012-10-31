using System.Collections.Generic;
using System.Threading.Tasks;

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
            bool[] objectsToKeepAround = new bool[_objects.Count];

            Parallel.For(0, _objects.Count, i =>
            {
                Collidable thisObject = _objects[i];
                if (thisObject.Disposed)
                {
                    objectsToKeepAround[i] = false;
                    return;
                }

                // Retrieve objects that it could be colliding with
                List<Collidable> potentials = thisObject.GetMapArea().GetSubTreeContents();

                for (int j = 0; j < potentials.Count; j++)
                {
                    Collidable thisPotential = potentials[j];

                    // If the potential object is our outer object then move on
                    if (thisPotential.Collided || thisPotential.ServerID() == thisObject.ServerID())
                    {
                        continue;
                    }

                    if (thisObject.IsCollidingWith(thisPotential))
                    {
                        thisObject.HandleCollisionWith(thisPotential, _space);
                        thisPotential.HandleCollisionWith(thisObject, _space);

                        if (thisObject.Disposed)
                        {
                            objectsToKeepAround[i] = false;
                            return;
                        }
                    }
                }

                objectsToKeepAround[i] = true;
            });

            for (int i = objectsToKeepAround.Length - 1; i >= 0; i--)
            {
                if (!objectsToKeepAround[i])
                {
                    _objects[i] = _objects[_objects.Count - 1];
                    _objects.RemoveAt(_objects.Count - 1);
                }
            }
        }
    }
}