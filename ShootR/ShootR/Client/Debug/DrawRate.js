var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    /// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
    /// <reference path="GameInformer.ts" />
    /// <reference path="RateMonitor.ts" />
    (function (Debug) {
        var DrawRate = (function (_super) {
            __extends(DrawRate, _super);
            function DrawRate(informer) {
                _super.call(this, DrawRate.TITLE, informer, 60);
            }
            DrawRate.prototype.Draw = function (context) {
                this.MarkRate();
            };
            DrawRate.TITLE = "Draw Rate";
            return DrawRate;
        })(Debug.RateMonitor);
        Debug.DrawRate = DrawRate;
    })(ShootR.Debug || (ShootR.Debug = {}));
    var Debug = ShootR.Debug;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=DrawRate.js.map
