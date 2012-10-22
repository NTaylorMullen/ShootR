using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;

namespace ShootR
{
    public partial class controller : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var state = Request.Cookies["shootr.state"];

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
                GameElements.Visible = true;
            }
            else
            {
                ShowLogin();
            }
        }


        public void ShowLogin()
        {
            JanrainScripts.Visible = true;
            GameElements.Visible = false;
        }
    }
}