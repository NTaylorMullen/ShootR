/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Common/Animation.ts" />
/// <reference path="../HealthPack.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var HealthPackGraphic = (function (_super) {
        __extends(HealthPackGraphic, _super);
        function HealthPackGraphic(position, contentManager) {
            _super.call(this, position, contentManager.GetImage("HealthPack"), HealthPackGraphic.FPS, ShootR.HealthPack.SIZE, HealthPackGraphic.FRAME_COUNT);

            this.Play(true);
        }
        HealthPackGraphic.FRAME_COUNT = 18;
        HealthPackGraphic.FPS = 18;
        return HealthPackGraphic;
    })(ShootR.Animation);
    ShootR.HealthPackGraphic = HealthPackGraphic;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=HealthPackGraphic.js.map
