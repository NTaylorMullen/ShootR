var ShootR;
(function (ShootR) {
    /// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
    /// <reference path="GameInformer.ts" />
    (function (Debug) {
        var UpdateRate = (function () {
            function UpdateRate(informer, game) {
                this._textNode = informer.AddTextualInformation(UpdateRate.TITLE);

                this._textNode.Color = UpdateRate.TEXT_COLOR;
                this._textNode.Text = "...";

                this._targetRate = game.Configuration.UpdateRate;
                this._lastCalculatedAt = new Date();
                this._updateCount = 0;
            }
            UpdateRate.prototype.Update = function (gameTime) {
                this._updateCount++;

                if (eg.TimeSpan.DateSpan(this._lastCalculatedAt, gameTime.Now).Seconds >= UpdateRate.CALCULATE_EVERY.Seconds) {
                    this._textNode.Text = this._updateCount.toString() + "  |  " + Math.round((this._updateCount / this._targetRate) * 100).toString() + "%";

                    this._updateCount = 0;
                    this._lastCalculatedAt = gameTime.Now;
                }
            };
            UpdateRate.TITLE = "Update Rate";
            UpdateRate.TEXT_COLOR = eg.Graphics.Color.White;
            UpdateRate.CALCULATE_EVERY = eg.TimeSpan.FromSeconds(1);
            return UpdateRate;
        })();
        Debug.UpdateRate = UpdateRate;
    })(ShootR.Debug || (ShootR.Debug = {}));
    var Debug = ShootR.Debug;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=UpdateRate.js.map
