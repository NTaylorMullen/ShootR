var ShootR;
(function (ShootR) {
    /// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
    /// <reference path="GameInformer.ts" />
    (function (Debug) {
        var RateMonitor = (function () {
            function RateMonitor(title, informer, _targetRate) {
                this._targetRate = _targetRate;
                this._textNode = informer.AddTextualInformation(title);

                this._textNode.Color = RateMonitor.TEXT_COLOR;
                this._textNode.Text = "...";

                this._lastCalculatedAt = new Date();
                this._count = 0;
            }
            RateMonitor.prototype.MarkRate = function () {
                this._count++;
            };

            RateMonitor.prototype.Update = function (gameTime) {
                if (eg.TimeSpan.DateSpan(this._lastCalculatedAt, gameTime.Now).Seconds >= Debug.UpdateRate.CALCULATE_EVERY.Seconds) {
                    this._textNode.Text = this._count.toString() + "  |  " + Math.round((this._count / this._targetRate) * 100).toString() + "%";

                    this._count = 0;
                    this._lastCalculatedAt = gameTime.Now;
                }
            };
            RateMonitor.TEXT_COLOR = eg.Graphics.Color.White;
            RateMonitor.CALCULATE_EVERY = eg.TimeSpan.FromSeconds(1);
            return RateMonitor;
        })();
        Debug.RateMonitor = RateMonitor;
    })(ShootR.Debug || (ShootR.Debug = {}));
    var Debug = ShootR.Debug;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=RateMonitor.js.map
