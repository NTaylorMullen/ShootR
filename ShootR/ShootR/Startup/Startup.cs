using Microsoft.Owin;
using Owin;
using ShootR;

// Specify the entry point
[assembly: OwinStartup(typeof(Startup), "Configuration")]

namespace ShootR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapHubs();
        }
    }
}