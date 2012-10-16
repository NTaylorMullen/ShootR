using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace ShootR
{
    public class ErrorLog
    {
        private readonly static Lazy<ErrorLog> _instance = new Lazy<ErrorLog>(() => new ErrorLog());

        EventLog elog = new EventLog();
        string sSource = ".NET Runtime";

        public void Log(Exception e, string customMessage = "")
        {
            Task.Factory.StartNew(() =>
            {
                EventLog.WriteEntry(sSource, e.ToString() + "      CALLSTACK: " + e.StackTrace + "      CUSTOM MESSAGE: " + customMessage);
            });
        }

        public static ErrorLog Instance
        {
            get
            {
                return _instance.Value;
            }
        }
    }
}