/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ship.ts" />
/// <reference path="../../Common/Animation.ts" />

module ShootR {

    export class ShipBoostAnimation extends Animation {
        public static FRAME_SIZE: eg.Size2d = new eg.Size2d(102, 50);
        public static FRAME_COUNT: number = 10;
        public static FPS: number = 12;

        constructor(contentManager: eg.Content.ContentManager) {
            super(new eg.Vector2d(-Ship.SIZE.HalfWidth - ShipBoostAnimation.FRAME_SIZE.HalfWidth, -2), contentManager.GetImage("Boost"), ShipBoostAnimation.FPS, ShipBoostAnimation.FRAME_SIZE, ShipBoostAnimation.FRAME_COUNT);
            this.Visible = false;
        }

        public Play(): void {
            this.Visible = true;
            super.Play(true);
        }

        public Stop(): void {            
            this.Visible = false;
            super.Stop();
        }
    }

}