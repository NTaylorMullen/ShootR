/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="GameInformer.ts" />
/// <reference path="RateMonitor.ts" />

module ShootR.Debug {

    export class DrawRate extends RateMonitor {
        public static TITLE: string = "Draw Rate"

        constructor(informer: GameInformer) {
            super(DrawRate.TITLE, informer, 60);
        }

        public Draw(context: CanvasRenderingContext2D): void {
            this.MarkRate();
        }
    }

}