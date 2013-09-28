using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR.Server.Tweening
{
    public class NumberTween : Tween<double>
    {
        public NumberTween(double from, double to, double speed) :
            base(from, to, speed)
        {
        }

        public override TimeSpan DurationFromSpeed(double speed)
        {
            return TimeSpan.FromSeconds((To - From) / speed);
        }
        public override void UpdateTween()
        {
            this._current = Linear.EaseNone(From, To, _elapsed, Duration);
        }
    }
}