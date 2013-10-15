var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    /// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
    /// <reference path="GameInformer.ts" />
    /// <reference path="RateMonitor.ts" />
    (function (Debug) {
        var UpdateRate = (function (_super) {
            __extends(UpdateRate, _super);
            function UpdateRate(informer, game) {
                _super.call(this, UpdateRate.TITLE, informer, game.Configuration.UpdateRate);
            }
            UpdateRate.prototype.Update = function (gameTime) {
                this.MarkRate();

                _super.prototype.Update.call(this, gameTime);
            };
            UpdateRate.TITLE = "Update Rate";
            return UpdateRate;
        })(Debug.RateMonitor);
        Debug.UpdateRate = UpdateRate;
    })(ShootR.Debug || (ShootR.Debug = {}));
    var Debug = ShootR.Debug;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=UpdateRate.js.map
