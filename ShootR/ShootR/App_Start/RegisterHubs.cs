using System.Web;
using System.Web.Routing;
using Microsoft.AspNet.SignalR;

[assembly: PreApplicationStartMethod(typeof(ShootR.RegisterHubs), "Start")]

namespace ShootR
{
    public static class RegisterHubs
    {
        public static void Start()
        {
            // Register the default hubs route: ~/signalr/hubs
            RouteTable.Routes.MapHubs();
        }
    }
}
