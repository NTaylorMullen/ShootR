using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Security;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Newtonsoft.Json;

namespace ShootR.Authentication
{
    public class ShootRAuthenticationProvider : CookieAuthenticationProvider
    {
        public override void ResponseSignIn(CookieResponseSignInContext context)
        {
            var principle = new ClaimsPrincipal(context.Identity);
            var pictureClaim = principle.FindFirst("profilePicture");
            var idClaim = principle.FindFirst(ClaimTypes.NameIdentifier);
            var nameClaim = principle.FindFirst(ClaimTypes.Name);
            var emailClaim = principle.FindFirst(ClaimTypes.Email);

            var id = idClaim == null ? Guid.NewGuid().ToString() : idClaim.Value;
            var name = nameClaim == null ? "unknown" : System.Net.WebUtility.HtmlEncode(nameClaim.Value);
            var photo = pictureClaim != null ? pictureClaim.Value :  GetPhotoUrl(emailClaim == null ? "" : emailClaim.Value);

            var rc = new RegisteredClient()
            {
                Identity = id,
                DisplayName = name,
                Photo = photo
            };

            SetState(rc, context.Response);
        }

        public static void SetState(RegisteredClient rc, IOwinResponse response)
        {
            // Save the cookie state
            Byte[] identity = Encoding.UTF8.GetBytes(rc.Identity);
            Byte[] encrypted = MachineKey.Protect(identity, "ShootR.Identity");
            var temp = new RegisteredClient(rc.RegistrationID, HttpServerUtility.UrlTokenEncode(encrypted), rc.DisplayName, rc.Photo);
            var state = JsonConvert.SerializeObject(temp);

            response.Cookies.Append("shootr.state", state, new CookieOptions
            {
                Expires = DateTime.Now.AddDays(30)
            });
        }

        private string GetPhotoUrl(string email)
        {
            return "http://www.gravatar.com/avatar/" + ToMD5(email) + "?d=404";
        }

        private string ToMD5(string value)
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