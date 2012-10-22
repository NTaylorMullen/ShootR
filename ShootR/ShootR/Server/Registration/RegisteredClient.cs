using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class RegisteredClient
    {
        public RegisteredClient(string registrationID)
        {
            RegistrationID = registrationID;
        }

        public string RegistrationID { get; set; }
    }
}