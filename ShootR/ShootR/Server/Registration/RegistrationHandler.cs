using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace ShootR
{
    public class RegistrationHandler
    {
        public static readonly TimeSpan TIMEOUT_AFTER = TimeSpan.FromSeconds(30);

        private Timer _timeoutLoop;

        private ConcurrentDictionary<string, RegisteredClient> _registrationList;

        public RegistrationHandler()
        {
            _registrationList = new ConcurrentDictionary<string, RegisteredClient>();
            _timeoutLoop = new Timer(new TimerCallback(CheckTimeOuts), null, Convert.ToInt32(TIMEOUT_AFTER.TotalMilliseconds / 2), Convert.ToInt32(TIMEOUT_AFTER.TotalMilliseconds / 2));
        }

        public void CheckTimeOuts(object state)
        {
            try
            {
                // This is all executed once every TIMEOUT_AFTER/2 seconds
                DateTime now = DateTime.UtcNow;
                RegisteredClient garbage;

                foreach (RegisteredClient rc in _registrationList.Values)
                {
                    if ((now - rc.InitializedAt()) >= TIMEOUT_AFTER)
                    {
                        // Since it's a concurrent list this will not error!
                        _registrationList.TryRemove(rc.RegistrationID, out garbage);
                    }
                }
            }
            catch (Exception e)
            {
                ErrorLog.Instance.Log(e);
            }
        }

        public bool RegistrationExists(string registrationId)
        {
            return _registrationList.ContainsKey(registrationId);
        }

        public RegisteredClient RemoveRegistration(string registrationId)
        {
            RegisteredClient rc;
            _registrationList.TryRemove(registrationId, out rc);

            return rc;
        }

        public RegisteredClient Register(string identity, string displayName, string photo)
        {
            RegisteredClient rc = new RegisteredClient(Guid.NewGuid().ToString(), identity, displayName, photo);
            _registrationList.TryAdd(rc.RegistrationID, rc);
            return rc;
        }

        public RegisteredClient Register(RegisteredClient existing)
        {
            existing.RegistrationID = Guid.NewGuid().ToString();
            _registrationList.TryAdd(existing.RegistrationID, existing);
            return existing;
        }

        public RegisteredClient GetRegistration(string registrationID)
        {
            return _registrationList[registrationID];
        }
    }
}