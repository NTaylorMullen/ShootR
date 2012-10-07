using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class ControlRequestManager
    {
        Dictionary<string, string> _requestCIDMappings;
        object _locker = new object();

        public ControlRequestManager()
        {
            _requestCIDMappings = new Dictionary<string, string>();
        }

        public bool Add(string from, string to)
        {
            lock (_locker)
            {
                // Check if someone else requested control
                if (_requestCIDMappings.Values.Contains(to))
                {
                    return false;
                }
                else if(_requestCIDMappings.ContainsKey(from)) // Check if i've already requested control
                {
                    return false;
                }
                else
                {
                    _requestCIDMappings.Add(from, to);
                    return true;
                }
            }
        }

        /// <summary>
        /// Retrieves a control request
        /// </summary>
        /// <param name="me">The user who was sent the control request</param>
        /// <returns>The requestee</returns>
        public string PullControlRequest(string me)
        {
            lock (_locker)
            {
                foreach (string user in _requestCIDMappings.Keys)
                {
                    if (_requestCIDMappings[user] == me)
                    {
                        _requestCIDMappings.Remove(user);
                        return user;
                    }
                }

                return null;
            }
        }
    }
}