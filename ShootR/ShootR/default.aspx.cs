using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;

namespace ShootR
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {            
#if !DEBUG
            var state = Request.Cookies["shootr.state"];
#else
            var state = new HttpCookie("shootr.state", JsonConvert.SerializeObject(new RegisteredClient(null, "ABCDEFGH", "John Doe", "")));
#endif

            if (state != null)
            {
                try
                {
                    string decoded = HttpUtility.UrlDecode(state.Value);
                    var rc = JsonConvert.DeserializeObject<RegisteredClient>(decoded);

#if !DEBUG
                    Byte[] encryptedIdentity = HttpServerUtility.UrlTokenDecode(rc.Identity);
                    Byte[] unprotectedIdentity = MachineKey.Unprotect(encryptedIdentity, "ShootR.Identity");
                    rc.Identity = Encoding.UTF8.GetString(unprotectedIdentity);
#endif

                    rc.DisplayName = System.Net.WebUtility.HtmlEncode(rc.DisplayName);

                    // Need to setup registration
                    if (rc.RegistrationID == null)
                    {
                        Game.Instance.RegistrationHandler.Register(rc);

                        LoginHandler.AddOrUpdateState(rc, HttpContext.Current);
                    }

                    JanrainScripts.Visible = false;
                    GameScripts.Visible = true;
                }
                catch
                {
                    JanrainScripts.Visible = true;
                    GameScripts.Visible = false;
                }
            }
            else
            {
                JanrainScripts.Visible = true;
                GameScripts.Visible = false;
            }
        }
    }
}