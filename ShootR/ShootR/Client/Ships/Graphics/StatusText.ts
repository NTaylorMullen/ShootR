/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />

module ShootR {

    export class StatusText extends eg.Graphics.Text2d {
        public static MOVE_Y_RANGE: eg.Particles.Range<number> = new eg.Particles.Range<number>(-50, -200);
        public static MOVE_X_RANGE: eg.Particles.Range<number> = new eg.Particles.Range<number>(-50, 50);
        public static DEFAULT_FADE_DURATION: eg.TimeSpan = eg.TimeSpan.FromSeconds(1);

        private _movementTween: eg.Tweening.Vector2dTween;
        private _fadeTween: eg.Tweening.NumberTween;
        private _active: boolean;

        constructor(text: string, size: number, color: eg.Graphics.Color, fadeDuration: eg.TimeSpan = StatusText.DEFAULT_FADE_DURATION, reverseDirection: boolean = false) {
            super(0, 0, text, color);

            var directionMultipler = reverseDirection ? -1 : 1;

            this.FontSettings.FontSize = size + "px";
            this.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.Verdana;
            this.FontSettings.FontWeight = "bold";

            this._movementTween = new eg.Tweening.Vector2dTween(this.Position, new eg.Vector2d(directionMultipler * eg.Particles.Range.RandomNumber(StatusText.MOVE_X_RANGE), directionMultipler * eg.Particles.Range.RandomNumber(StatusText.MOVE_Y_RANGE)), fadeDuration, eg.Tweening.Functions.Cubic.EaseOut);
            this._fadeTween = new eg.Tweening.NumberTween(100, 0, fadeDuration, eg.Tweening.Functions.Cubic.EaseOut);
            this._active = false;

            this._movementTween.OnChange.Bind((newPosition: eg.Vector2d) => {
                this.Position = newPosition;
            });

            this._fadeTween.OnChange.Bind((fade: number) => {
                this.Opacity = fade / 100;
            });

            this._movementTween.OnComplete.Bind((movementTween: eg.Tweening.Vector2dTween) => {
                this.Dispose();
            });

            this._movementTween.Play();
            this._fadeTween.Play();
        }

        public Update(gameTime: eg.GameTime): void {
            this._movementTween.Update(gameTime);
            this._fadeTween.Update(gameTime);
        }

        public Dispose(): void {
            if (!this._active) {
                this._active = true;

                this._movementTween.Dispose();
                this._fadeTween.Dispose();

                super.Dispose();
            }
        }
    }

}