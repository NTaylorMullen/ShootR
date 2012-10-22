using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using Newtonsoft.Json;

namespace ShootR
{
    /// <summary>
    /// Summary description for Login1
    /// </summary>
    public class Login1 : IHttpHandler
    {
        private const string VerifyTokenUrl = "https://rpxnow.com/api/v2/auth_info?apiKey={0}&token={1}";

        public void ProcessRequest(HttpContext context)
        {
            string apiKey = ConfigurationManager.AppSettings["janrainAPIKey"];

            if (String.IsNullOrEmpty(apiKey))
            {
                // Do nothing
                context.Response.Redirect("~/", false);
                context.ApplicationInstance.CompleteRequest();
                return;
            }

            string token = context.Request.Form["token"];

            if (String.IsNullOrEmpty(token))
            {
                context.Response.Redirect(HttpRuntime.AppDomainAppVirtualPath, false);
                context.ApplicationInstance.CompleteRequest();
                return;
            }

            var response = new WebClient().DownloadString(String.Format(VerifyTokenUrl, apiKey, token));

            if (String.IsNullOrEmpty(response))
            {
                context.Response.Redirect(HttpRuntime.AppDomainAppVirtualPath, false);
                context.ApplicationInstance.CompleteRequest();
                return;
            }

            dynamic j = JsonConvert.DeserializeObject(response);

            if (j.stat.ToString() != "ok")
            {
                context.Response.Redirect(HttpRuntime.AppDomainAppVirtualPath, false);
                context.ApplicationInstance.CompleteRequest();
                return;
            }

            string identity = j.profile.identifier.ToString();
            string displaName = j.profile.displayName.ToString();
            string photo = "";

            if (j.profile.photo != null)
            {
                photo = j.profile.photo;
            }
            else if (j.profile.email != null)
            {
                photo = "http://www.gravatar.com/avatar/" + ToMD5(j.profile.email.ToString()) + "?d=404";
            }

            string registrationID = Game.Instance.RegistrationHandler.Register(identity, displaName, photo);

            // Save the cokie state
            var state = JsonConvert.SerializeObject(new
            {
                RegistrationID = registrationID,
                Photo = photo
            });

            var cookie = new HttpCookie("shootr.state", state);
            cookie.Expires = DateTime.Now.AddDays(30);
            context.Response.Cookies.Add(cookie);
            context.Response.Redirect(HttpRuntime.AppDomainAppVirtualPath + "?todo=startGame", false);
            context.ApplicationInstance.CompleteRequest();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        public string ToMD5(string value)
        {
            if (String.IsNullOrEmpty(value))
            {
                return null;
            }

            return String.Join("", MD5.Create()
                         .ComputeHash(Encoding.Default.GetBytes(value))
                         .Select(b => b.ToString("x2")));
        }
    }
}