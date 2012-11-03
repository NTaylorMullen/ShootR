using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Security;
using Newtonsoft.Json;

namespace ShootR
{
    /// <summary>
    /// Summary description for Login
    /// </summary>
    public class LoginHandler : IHttpHandler
    {
        private const string VerifyTokenUrl = "https://rpxnow.com/api/v2/auth_info?apiKey={0}&token={1}";

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                string apiKey = ConfigurationManager.AppSettings["janrainAPIKey"];

                if (String.IsNullOrEmpty(apiKey))
                {
                    // Do nothing
                    context.Response.Redirect("~/", false);
                    context.ApplicationInstance.CompleteRequest();
                    return;
                }

                var registeredClient = GetClientState(context);

                // We have an identifier, we're already authenticated
                if (registeredClient.Identity != null)
                {
                    Game.Instance.RegistrationHandler.Register(registeredClient);

                    AddOrUpdateState(registeredClient, context);
                }
                else
                {
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

                    string identity = j.profile.identifier.ToString(),
                        displayName = System.Net.WebUtility.HtmlEncode(j.profile.preferredUsername.ToString()),
                        photo = "";

                    if (j.profile.photo != null)
                    {
                        photo = j.profile.photo;
                    }
                    else if (j.profile.email != null)
                    {
                        photo = "http://www.gravatar.com/avatar/" + ToMD5(j.profile.email.ToString()) + "?d=404";
                    }

                    RegisteredClient rc = Game.Instance.RegistrationHandler.Register(identity, displayName, photo);

                    AddOrUpdateState(rc, context);
                }

                string path = context.Request.QueryString["path"];
                context.Response.Redirect(HttpRuntime.AppDomainAppVirtualPath + path, false);
                context.ApplicationInstance.CompleteRequest();
            }
            catch (Exception e)
            {
                ErrorLog.Instance.Log(e, "Crashd in LoginHandler.ashx.cs");
            }
        }

        public static void AddOrUpdateState(RegisteredClient rc, HttpContext context)
        {
            // Save the cokie state
            Byte[] identity = Encoding.UTF8.GetBytes(rc.Identity);
            Byte[] encrypted = MachineKey.Protect(identity, "ShootR.Identity");
            RegisteredClient temp = new RegisteredClient(rc.RegistrationID, HttpServerUtility.UrlTokenEncode(encrypted), rc.DisplayName, rc.Photo);
            var state = JsonConvert.SerializeObject(temp);

            if (context.Response.Cookies["shootr.state"] == null)
            {
                var cookie = new HttpCookie("shootr.state", state);
                cookie.Expires = DateTime.Now.AddDays(30);
                context.Response.Cookies.Add(cookie);
            }
            else
            {
                context.Response.Cookies["shootr.state"].Value = state;
                context.Response.Cookies["shootr.state"].Expires = DateTime.Now.AddDays(30);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        private RegisteredClient GetClientState(HttpContext context)
        {
            // New client state
            var shootrState = GetCookieValue(context, "shootr.state");            

            RegisteredClient clientState = null;

            if (String.IsNullOrEmpty(shootrState))
            {
                clientState = new RegisteredClient();
            }
            else
            {
                clientState = JsonConvert.DeserializeObject<RegisteredClient>(shootrState);
            }

            return clientState;
        }

        private string GetCookieValue(HttpContext context, string key)
        {
            HttpCookie cookie = context.Request.Cookies[key];
            return cookie != null ? HttpUtility.UrlDecode(cookie.Value) : null;
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