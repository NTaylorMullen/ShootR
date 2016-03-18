/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />

module ShootR {

    export class Animation extends eg.Graphics.Sprite2d {
        private _animator: eg.Graphics.SpriteAnimation;

        constructor(position: eg.Vector2d, spriteSheet: eg.Graphics.ImageSource, fps: number, frameSize: eg.Size2d, frameCount: number) {
            super(position.X, position.Y, spriteSheet, frameSize.Width, frameSize.Height);

            this._animator = new eg.Graphics.SpriteAnimation(spriteSheet, fps, frameSize, frameCount);
            this._animator.Step(1);
        }

        public get OnComplete(): eg.EventHandler {
            return this._animator.OnComplete;
        }

        public Play(repeat: boolean = false): void {
            this._animator.Play(repeat);
        }

        public Stop(): void {
            this._animator.Stop();
        }

        public Update(gameTime: eg.GameTime): void {
            this._animator.Update(gameTime);
        }
    }

}