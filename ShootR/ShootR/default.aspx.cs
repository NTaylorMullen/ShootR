using System;
using System.Text;
using System.Web;
using System.Web.Security;
using Microsoft.Owin.Security;
using Newtonsoft.Json;
using ShootR.Authentication;

namespace ShootR
{
    public partial class _default : System.Web.UI.Page
    {
        static long GuestID = 0;

        protected void Page_Load(object sender, EventArgs e)
        {
            var state = Request.Cookies["shootr.state"];

            if (state != null)
            {
                try
                {
                    string decoded = HttpUtility.UrlDecode(state.Value);
                    var rc = JsonConvert.DeserializeObject<RegisteredClient>(decoded);

                    if (rc.Identity == "Guest")
                    {
                        rc.DisplayName = "Guest" + GuestID++;
                        rc.Identity = "Guest" + Guid.NewGuid().ToString();
                        rc.RegistrationID = null;
                        rc.Photo = "";
                    }
                    else
                    {
                        Byte[] encryptedIdentity = HttpServerUtility.UrlTokenDecode(rc.Identity);
                        Byte[] unprotectedIdentity = MachineKey.Unprotect(encryptedIdentity, "ShootR.Identity");
                        rc.Identity = Encoding.UTF8.GetString(unprotectedIdentity);
                    }

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
    }
}