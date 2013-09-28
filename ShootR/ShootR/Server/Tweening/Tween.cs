using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR.Server.Tweening
{
    public abstract class Tween <T>
    {
        public T From;
        public T To;
        public TimeSpan Duration;

        protected T _current;
        protected TimeSpan _elapsed;
        
        private bool _playing;

        public Tween(T from, T to, double speed)
        {
            From = from;
            To = to;
            Duration = DurationFromSpeed(speed);

            _current = From;
            _playing = false;
            _elapsed = TimeSpan.Zero;
            OnChange = (_) => { };
            OnComplete = (_) => { };
        }

        public event Action<T> OnChange;
        public event Action<Tween<T>> OnComplete;

        public bool IsPlaying()
        {
            return _playing;
        }

        public void Play()
        {
            _playing = true;
        }

        public void Reset()
        {
            _elapsed = TimeSpan.Zero;
            _current = From;
        }

        public void Restart()
        {
            Reset();
            Play();
        }

        public void Update(GameTime gameTime)
        {
            if (!_playing)
            {
                return;
            }

            _elapsed += gameTime.Elapsed;

            if (_elapsed>= Duration)
            {
                _elapsed = TimeSpan.FromSeconds(Duration.TotalSeconds);

                _current = To;
                _playing = false;

                OnChange(_current);
                OnComplete(this);
            }
            else
            {
                UpdateTween();
                OnChange(_current);
            }
        }

        public abstract TimeSpan DurationFromSpeed(double speed);
        public abstract void UpdateTween();
    }
}