/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
var ShootR;
(function (ShootR) {
    var ShipLifeController = (function () {
        function ShipLifeController() {
            this.Alive = true;
            this.MaxHealth = this.Health = ShipLifeController.START_LIFE;
            this.OnLifeChange = new eg.EventHandler2();
        }
        Object.defineProperty(ShipLifeController.prototype, "HealthPercent", {
            get: function () {
                return this.Health / this.MaxHealth;
            },
            enumerable: true,
            configurable: true
        });

        ShipLifeController.prototype.LoadPayload = function (payload) {
            this.Alive = payload.LifeController.Alive;
            if (this.Health !== payload.LifeController.Health || this.MaxHealth !== payload.MaxLife) {
                this.Health = payload.LifeController.Health;
                this.MaxHealth = payload.MaxLife;

                this.OnLifeChange.Trigger(this.Health, this.MaxHealth);
            }
        };
        ShipLifeController.START_LIFE = 100;
        ShipLifeController.BAD_COLOR = eg.Graphics.Color.FromHex("#ED1E79");
        ShipLifeController.HURT_COLOR = eg.Graphics.Color.FromHex("#FF931E");
        ShipLifeController.GOOD_COLOR = eg.Graphics.Color.FromHex("#7AC943");
        ShipLifeController.BAD_THRESHOLD = .3;
        ShipLifeController.HURT_THRESHOLD = .6;
        return ShipLifeController;
    })();
    ShootR.ShipLifeController = ShipLifeController;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipLifeController.js.map
