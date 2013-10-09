/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="GameInformer.ts" />

module ShootR.Debug {

    export class RateMonitor {
        public static TEXT_COLOR: eg.Graphics.Color = eg.Graphics.Color.White;
        public static CALCULATE_EVERY: eg.TimeSpan = eg.TimeSpan.FromSeconds(1);

        private _textNode: eg.Graphics.Text2d;
        private _count: number;
        private _lastCalculatedAt: Date;

        constructor(title: string, informer: GameInformer, private _targetRate: number) {
            this._textNode = informer.AddTextualInformation(title);

            this._textNode.Color = RateMonitor.TEXT_COLOR;
            this._textNode.Text = "...";

            this._lastCalculatedAt = new Date();
            this._count = 0;
        }

        public MarkRate(): void {
            this._count++;
        }

        public Update(gameTime: eg.GameTime): void {
            if (eg.TimeSpan.DateSpan(this._lastCalculatedAt, gameTime.Now).Seconds >= UpdateRate.CALCULATE_EVERY.Seconds) {
                this._textNode.Text = this._count.toString() + "  |  " + Math.round((this._count / this._targetRate) * 100).toString() + "%";

                this._count = 0;
                this._lastCalculatedAt = gameTime.Now;
            }
        }
    }

}