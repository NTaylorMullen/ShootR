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
    /// <reference path="../Game.ts" />
    /// <reference path="RateMonitor.ts" />
    (function (Debug) {
        var PayloadRate = (function (_super) {
            __extends(PayloadRate, _super);
            function PayloadRate(informer) {
                _super.call(this, PayloadRate.TITLE, informer, 1000 / ShootR.Game.GameConfiguration.gameConfig.DRAW_INTERVAL);
            }
            PayloadRate.prototype.LoadPayload = function (payload) {
                this.MarkRate();
            };
            PayloadRate.TITLE = "Payload Rate";
            return PayloadRate;
        })(Debug.RateMonitor);
        Debug.PayloadRate = PayloadRate;
    })(ShootR.Debug || (ShootR.Debug = {}));
    var Debug = ShootR.Debug;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=PayloadRate.js.map
