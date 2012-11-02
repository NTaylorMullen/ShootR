using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ShootR
{
    public partial class admin : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        protected override void OnPreRender(EventArgs e)
        {
            if (ViewState["Page"] == "UpdateRuntime")
            {
                MaxUsers.Text = Game.Instance.RuntimeConfiguration.MaxServerUsers.ToString();
                Login.Visible = false;
                Config.Visible = true;
                Error.Visible = false;
            }
            else if (ViewState["Page"] == "Login")
            {
                Login.Visible = true;
                Config.Visible = false;
                Error.Visible = false;
            }

            base.OnPreRender(e);
        }

        protected void UpdateRuntime_Click(object sender, EventArgs e)
        {
            int maxUsers;
            if (Int32.TryParse(MaxUsers.Text, out maxUsers))
            {
                Error.Visible = false;
                Game.Instance.RuntimeConfiguration.MaxServerUsers = Convert.ToInt32(MaxUsers.Text);
            }
            else
            {
                Error.Visible = true;
            }
        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            string UserName = AdminUserName.Text,
                   UserPassword = AdminPassword.Text;

            if (UserName == ConfigurationManager.AppSettings["AdminUserName"] && UserPassword == ConfigurationManager.AppSettings["AdminPW"])
            {
                ViewState["Page"] = "UpdateRuntime";
            }
            else
            {
                ViewState["Page"] = "Login";
            }
        }

        protected void Broadcast_Click(object sender, EventArgs e)
        {
            try
            {
                List<User> userlist = Game.Instance.UserHandler.GetUsers();
                string notifyText = BroadcastMessage.Text;

                foreach (User user in userlist)
                {
                    user.NotificationManager.Notify(notifyText);
                }
            }
            catch
            {
            }
        }
    }
}