using System;
using System.Configuration;
using System.Security.Claims;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.Twitter;
using Owin;
using ShootR.Authentication;
using TweetSharp;

namespace ShootR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();

            // Disable keep alive, no need
            GlobalHost.Configuration.DisconnectTimeout = TimeSpan.FromMinutes(3);

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = "ShootR",
                Provider = new ShootRAuthenticationProvider()
            });

            app.UseTwitterAuthentication(new TwitterAuthenticationOptions
            {
                Provider = new TwitterAuthenticationProvider
                {
                    OnAuthenticated = async context =>
                    {
                        var service = new TwitterService(ConfigurationManager.AppSettings["twitterConsumerKey"], ConfigurationManager.AppSettings["twitterConsumerSecret"]);
                        service.AuthenticateWith(context.AccessToken, context.AccessTokenSecret);

                        var profile = service.GetUserProfile(new GetUserProfileOptions
                        {
                            IncludeEntities = true
                        });

                        context.Identity.AddClaim(new Claim("profilePicture", profile.ProfileImageUrl));
                    }
                },
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
                        context.Identity.AddClaim(new Claim("profilePicture", "https://graph.facebook.com/" + context.Identity.FindFirst(ClaimTypes.NameIdentifier).Value + "/picture?type=large"));
                    }
                },
                SignInAsAuthenticationType = "ShootR",
                AppId = ConfigurationManager.AppSettings["facebookAppId"],
                AppSecret = ConfigurationManager.AppSettings["facebookAppSecret"]
            });
        }
    }
}