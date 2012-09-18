using System.Collections.Generic;

namespace Shooter
{
    public class CollisionManager
    {
        private List<Collidable> _vehicles;
        private List<Collidable> _amunitions;
        private List<Collidable> _amunitionCollisions;

        public CollisionManager()
        {
            _vehicles = new List<Collidable>();
            _amunitions = new List<Collidable>();
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

        /// <summary>
        /// Adds <paramref name="amo"/> to the amunitions list in order to be tracked for collisions.
        /// </summary>
        /// <param name="amo">Amunition to be tracked</param>
        public void MonitorAmunition(Collidable amo)
        {
            _amunitions.Add(amo);
        }

        /// <summary>
        /// Adds <paramref name="vehicle"/> to the vehicles list in order to be tracked for collisions.
        /// </summary>
        /// <param name="vehicle">Vehicle to be tracked</param>
        public void MonitorVehicle(Collidable vehicle)
        {
            _vehicles.Add(vehicle);
        }

        public void Update(GameTime gameTime)
        {
            // Need to cycle through each vehicle and check to see if it's colliding with a piece of amo.
            for (int i = 0; i < _vehicles.Count; i++)
            {
                // If the vehicle is already disposed then we don't want to waste loop cycles on testing if it collided with an object
                if (_vehicles[i].Disposed)
                {
                    _vehicles.Remove(_vehicles[i--]);
                    continue;
                }

                // Cycle through each amunition piece to see if it's colliding with the current vehicle
                for (int j = 0; j < _amunitions.Count; j++)
                {
                    // This check is to see if a previous amunition destroyed a vehicle and then we don't need to continue in the loop
                    if (_vehicles[i].Disposed)
                    {
                        _vehicles.Remove(_vehicles[i--]);
                        break;
                    }

                    // Verifies that we aren't needlessly checking disposed amunition
                    if (_amunitions[j].Disposed)
                    {
                        _amunitions.Remove(_amunitions[j--]);
                        continue;
                    }

                    // Colliding 
                    if (_amunitions[j].IsCollidingWith(_vehicles[i]))
                    {
                        _amunitionCollisions.Add(_amunitions[j]);
                        _vehicles[i].HandleCollisionWith(_amunitions[j]);
                        _amunitions[j].HandleCollisionWith(_vehicles[i]);
                    }
                }
            }
        }
    }
}