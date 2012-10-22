using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ShootR
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["todo"] != null && Request.QueryString["todo"] == "startGame")
            {
                JanrainScripts.Visible = false;
                GameScripts.Visible = true;
            }
            else
            {
                JanrainScripts.Visible = true;
                GameScripts.Visible = false;
            }
        }
         
    }
}