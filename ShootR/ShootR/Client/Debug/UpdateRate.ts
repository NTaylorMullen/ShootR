/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="GameInformer.ts" />

module ShootR.Debug {

    export class UpdateRate {
        public static TITLE: string = "Update Rate"
        public static TEXT_COLOR: eg.Graphics.Color = eg.Graphics.Color.White;
        public static CALCULATE_EVERY: eg.TimeSpan = eg.TimeSpan.FromSeconds(1);

        private _targetRate: number;
        private _textNode: eg.Graphics.Text2d;
        private _updateCount: number;
        private _lastCalculatedAt: Date;

        constructor(informer: GameInformer, game: eg.Game) {
            this._textNode = informer.AddTextualInformation(UpdateRate.TITLE);

            this._textNode.Color = UpdateRate.TEXT_COLOR;
            this._textNode.Text = "...";

            this._targetRate = game.Configuration.UpdateRate;
            this._lastCalculatedAt = new Date();
            this._updateCount = 0;
        }

        public Update(gameTime: eg.GameTime): void {
            this._updateCount++;

            if (eg.TimeSpan.DateSpan(this._lastCalculatedAt, gameTime.Now).Seconds >= UpdateRate.CALCULATE_EVERY.Seconds) {
                this._textNode.Text = this._updateCount.toString() + "  |  " + Math.round((this._updateCount / this._targetRate) * 100).toString() + "%";

                this._updateCount = 0;
                this._lastCalculatedAt = gameTime.Now;
            }
        }
    }

}