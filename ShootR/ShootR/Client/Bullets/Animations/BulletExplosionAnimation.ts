/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Common/Animation.ts" />

module ShootR {

    export class BulletExplosionAnimation extends Animation {
        public static FRAME_SIZE: eg.Size2d = new eg.Size2d(64, 64);
        public static FRAME_COUNT: number = 24;
        public static FPS: number = 24;

        constructor(contentManager: eg.Content.ContentManager) {
            super(eg.Vector2d.Zero, contentManager.GetImage("BulletExplosion"), BulletExplosionAnimation.FPS, BulletExplosionAnimation.FRAME_SIZE, BulletExplosionAnimation.FRAME_COUNT);
            this.Rotation = (Math.random() * (Math.PI * 100)) / 100;
            this.Visible = false;
        }

        public Play(): void {
            this.Visible = true;
            super.Play();
        }
    }

}