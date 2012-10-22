using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class RegistrationHandler
    {
        private ConcurrentDictionary<string, RegisteredClient> _registrationList;

        public RegistrationHandler()
        {
            _registrationList = new ConcurrentDictionary<string, RegisteredClient>();
        }

        public bool RegistrationExists(string registrationId)
        {
            return _registrationList.ContainsKey(registrationId);
        }

        public void Unregister(string registrationId)
        {
            RegisteredClient rc;
            _registrationList.TryRemove(registrationId, out rc);
        }

        public string Register()
        {
            string guid = Guid.NewGuid().ToString();
            _registrationList.TryAdd(guid, new RegisteredClient(guid));
            return guid;
        }

        public RegisteredClient GetRegistration(string registrationID)
        {
            return _registrationList[registrationID];
        }
    }
}