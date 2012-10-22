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
        {/*
            if (Request.Form.Keys.Count > 0)
            {
                string token = Request.Form["token"];
                string janrainAPIKey = ConfigurationManager.AppSettings["janrainAPIKey"];
                Rpx rpx = new Rpx(janrainAPIKey, "https://rpxnow.com/api/v2/auth_info");

                var info = rpx.AuthInfo(token);
            }            */
        }
         
    }
}