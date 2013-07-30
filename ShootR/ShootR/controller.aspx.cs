using System;
using System.Text;
using System.Web;
using System.Web.Security;
using Microsoft.Owin.Security;
using Newtonsoft.Json;
using ShootR.Authentication;

namespace ShootR
{
    public partial class controller : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var state = Request.Cookies["shootr.state"];

            if (state != null)
            {
                try
                {
                    string decoded = HttpUtility.UrlDecode(state.Value);
                    var rc = JsonConvert.DeserializeObject<RegisteredClient>(decoded);

                    Byte[] encryptedIdentity = HttpServerUtility.UrlTokenDecode(rc.Identity);
                    Byte[] unprotectedIdentity = MachineKey.Unprotect(encryptedIdentity, "ShootR.Identity");
                    rc.Identity = Encoding.UTF8.GetString(unprotectedIdentity);

                    rc.DisplayName = System.Net.WebUtility.HtmlEncode(rc.DisplayName);

                    Game.Instance.RegistrationHandler.Register(rc);

                    ShootRAuthenticationProvider.SetState(rc, Context.GetOwinContext().Response);

                    LoginScripts.Visible = false;
                    GameScripts.Visible = true;
                }
                catch
                {
                    LoginScripts.Visible = true;
                    GameScripts.Visible = false;
                }
            }
            else
            {
                LoginScripts.Visible = true;
                GameScripts.Visible = false;
            }
        }

        protected void TwitterLoginButton_Click(object sender, EventArgs e)
        {
            Context.Request.GetOwinContext().Authentication.Challenge(new string[] { "Twitter" });
        }

        protected void GoogleLoginButton_Click(object sender, EventArgs e)
        {
            Context.Request.GetOwinContext().Authentication.Challenge(new string[] { "Google" });
        }

        protected void FacebookLoginButton_Click(object sender, EventArgs e)
        {
            Context.Request.GetOwinContext().Authentication.Challenge(new string[] { "Facebook" });
        }
    }
}