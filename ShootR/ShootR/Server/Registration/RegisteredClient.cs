using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class RegisteredClient
    {
        public RegisteredClient()
        {
        }

        public RegisteredClient(string registrationID, string identity, string displayName, string photo)
        {
            RegistrationID = registrationID;
            Identity = identity;
            DisplayName = displayName;
            Photo = photo;
        }

        public string RegistrationID { get; set; }
        public string Identity { get; set; }
        public string DisplayName { get; set; }
        public string Photo { get; set; }
    }
}