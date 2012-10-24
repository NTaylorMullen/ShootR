using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR.Hubs;

namespace s
{
    public class s : HubDispatcher
    {
        public s()
            : base("/hubs")
        {
        }

        protected override IEnumerable<string> GetSignals(string connectionId)
        {
            return base.GetSignals(connectionId).Where(s => s != GetType().FullName);
        }
    }
}