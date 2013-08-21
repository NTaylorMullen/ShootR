using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ShootR
{
    public partial class Login : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

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