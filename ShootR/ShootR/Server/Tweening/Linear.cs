using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR.Server.Tweening
{
    public static class Linear
    {
        public static Func<double, double, TimeSpan, TimeSpan, double> EaseNone = (from, to, elapsed, duration) => {
            double change = to - from;

            return change * elapsed.TotalMilliseconds / duration.TotalMilliseconds + from;
        };
    }
}