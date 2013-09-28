using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR.Server.Tweening
{
    public class Vector2Tween : Tween<Vector2>
    {
        public Vector2Tween(Vector2 from, Vector2 to, double speed) :
            base(from.Clone(), to.Clone(), speed)
        {
        }

        public override TimeSpan DurationFromSpeed(double speed)
        {
            return TimeSpan.FromSeconds(To.DistanceTo(From) / speed);
        }
        public override void UpdateTween()
        {
            this._current = new Vector2(
                Linear.EaseNone(From.X, To.X, _elapsed, Duration),
                Linear.EaseNone(From.Y, To.Y, _elapsed, Duration));
        }
    }
}