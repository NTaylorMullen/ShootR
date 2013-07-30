using System.Configuration;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.Twitter;
using Microsoft.Owin.Security.Facebook;
using Owin;
using ShootR;
using ShootR.Authentication;
using System.Security.Claims;

// Specify the entry point
[assembly: OwinStartup(typeof(Startup), "Configuration")]

namespace ShootR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = "ShootR",
                Provider = new ShootRAuthenticationProvider()
            });

            app.UseTwitterAuthentication(new TwitterAuthenticationOptions
            {
                SignInAsAuthenticationType = "ShootR",
                ConsumerKey = ConfigurationManager.AppSettings["twitterConsumerKey"],
                ConsumerSecret = ConfigurationManager.AppSettings["twitterConsumerSecret"]
            });

            app.UseGoogleAuthentication(new GoogleAuthenticationOptions
            {
                SignInAsAuthenticationType = "ShootR"
            });

            app.UseFacebookAuthentication(new FacebookAuthenticationOptions
            {
                Provider = new FacebookAuthenticationProvider
                {
                    OnAuthenticated = async context =>
                    {
                        context.Identity.AddClaim(new Claim("profilePicture","https://graph.facebook.com/" + context.Identity.FindFirst(ClaimTypes.NameIdentifier).Value + "/picture?type=large"));
                    }
                },
                SignInAsAuthenticationType = "ShootR",
                AppId = ConfigurationManager.AppSettings["facebookAppId"],
                AppSecret = ConfigurationManager.AppSettings["facebookAppSecret"]
            });
        }
    }
}