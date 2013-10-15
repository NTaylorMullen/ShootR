/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ship.ts" />

module ShootR {

    export class ShipThrustAnimation extends eg.Graphics.Sprite2d {
        public static FRAME_SIZE: eg.Size2d = new eg.Size2d(52, 50);
        public static FRAME_COUNT: number = 18;
        public static FPS: number = 18;

        private _thrustStartSpriteSheet: eg.Graphics.ImageSource;
        private _thrustSpriteSheet: eg.Graphics.ImageSource;
        private _thrustAnimator: eg.Graphics.SpriteAnimation;
        private _thrustStartAnimator: eg.Graphics.SpriteAnimation;

        constructor(contentManager: eg.Content.ContentManager) {
            this._thrustStartSpriteSheet = contentManager.GetImage("ThrustStart");
            this._thrustSpriteSheet = contentManager.GetImage("Thrust");

            super(-Ship.SIZE.HalfWidth - ShipThrustAnimation.FRAME_SIZE.HalfWidth, 0, this._thrustSpriteSheet, ShipThrustAnimation.FRAME_SIZE.Width, ShipThrustAnimation.FRAME_SIZE.Height);

            this._thrustStartAnimator = new eg.Graphics.SpriteAnimation(this._thrustStartSpriteSheet, ShipThrustAnimation.FPS, ShipThrustAnimation.FRAME_SIZE, ShipThrustAnimation.FRAME_COUNT);
            this._thrustAnimator = new eg.Graphics.SpriteAnimation(this._thrustSpriteSheet, ShipThrustAnimation.FPS, ShipThrustAnimation.FRAME_SIZE, ShipThrustAnimation.FRAME_COUNT);

            this._thrustStartAnimator.OnComplete.Bind(() => {
                this.Image = this._thrustSpriteSheet;
                this._thrustAnimator.Play(true);
            });

            this.Visible = false;
        }

        public Play(): void {
            this.Image = this._thrustStartSpriteSheet;
            this._thrustStartAnimator.Play();
            this.Visible = true;
        }

        public IsPlaying(): boolean {
            return this._thrustAnimator.IsPlaying() || this._thrustStartAnimator.IsPlaying();
        }

        public Stop(): void {
            this._thrustStartAnimator.Stop();
            this._thrustAnimator.Stop();
            this.Visible = false;
        }

        public Update(gameTime: eg.GameTime): void {
            this._thrustStartAnimator.Update(gameTime);
            this._thrustAnimator.Update(gameTime);
        }
    }

}