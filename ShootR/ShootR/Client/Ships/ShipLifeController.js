/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Common/LifeController.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var ShipLifeController = (function (_super) {
        __extends(ShipLifeController, _super);
        function ShipLifeController(payload) {
            _super.call(this, payload.LifeController.Health, payload.MaxLife);
        }
        ShipLifeController.START_LIFE = 100;
        ShipLifeController.BAD_COLOR = eg.Graphics.Color.FromHex("#ED1E79");
        ShipLifeController.HURT_COLOR = eg.Graphics.Color.FromHex("#FF931E");
        ShipLifeController.GOOD_COLOR = eg.Graphics.Color.FromHex("#7AC943");
        ShipLifeController.BAD_THRESHOLD = .3;
        ShipLifeController.HURT_THRESHOLD = .6;
        return ShipLifeController;
    })(ShootR.LifeController);
    ShootR.ShipLifeController = ShipLifeController;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipLifeController.js.map
