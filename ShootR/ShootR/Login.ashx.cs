using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
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

            string userIdentity = j.profile.identifier.ToString();
            string username = j.profile.preferredUsername.ToString();
            string email = String.Empty;
            if (j.profile.email != null)
            {
                email = j.profile.email.ToString();
            }

            context.Response.Redirect(HttpRuntime.AppDomainAppVirtualPath, false);
            context.ApplicationInstance.CompleteRequest();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}