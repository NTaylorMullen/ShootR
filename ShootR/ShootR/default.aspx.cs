using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
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
            var state = new HttpCookie("shootr.state",JsonConvert.SerializeObject(new RegisteredClient(null, Guid.NewGuid().ToString(), "John Doe", "")));
#endif

            if (state != null)
            {
                string decoded = HttpUtility.UrlDecode(state.Value);
                var rc = JsonConvert.DeserializeObject<RegisteredClient>(decoded);

                // Need to setup registration
                if (rc.RegistrationID == null)
                {
                    Game.Instance.RegistrationHandler.Register(rc);

                    Login.AddOrUpdateState(rc, HttpContext.Current);
                }
                
                JanrainScripts.Visible = false;
                GameScripts.Visible = true;
            }
            else
            {
                ShowLogin();
            }
        }


        public void ShowLogin()
        {
            JanrainScripts.Visible = true;
            GameScripts.Visible = false;
        }
    }
}