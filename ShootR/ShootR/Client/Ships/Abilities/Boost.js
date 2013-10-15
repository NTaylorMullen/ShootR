/// <reference path="../../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="MovementAbility.ts" />
/// <reference path="../ShipMovementController.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var Boost = (function (_super) {
        __extends(Boost, _super);
        function Boost(_movementController) {
            _super.call(this, Boost.NAME, _movementController);
            this._movementController = _movementController;

            this.OnStart = new eg.EventHandler();
            this.OnStop = new eg.EventHandler();
        }
        Boost.prototype.Activate = function () {
            this._movementController.StopAllMovement();
            this._movementController.Moving.Forward = true;
            this._movementController.Controllable = false;

            if (!this.Active) {
                this.MultiplySpeedBy(Boost.SPEED_INCREASE);
                this.OnStart.Trigger();
            }

            _super.prototype.Activate.call(this);
        };

        Boost.prototype.Deactivate = function () {
            if (this.Active) {
                this.ResetSpeed();
                _super.prototype.Deactivate.call(this);
                this._movementController.Moving.Forward = false;
                this._movementController.Controllable = true;
                this.OnStop.Trigger();
            }
        };

        Boost.prototype.Update = function (gameTime) {
            if (this.Active && eg.TimeSpan.DateSpan(this.ActivatedAt, gameTime.Now).Milliseconds >= Boost.DURATION.Milliseconds) {
                this.Deactivate();
            }
        };
        Boost.NAME = "Boost";
        Boost.SPEED_INCREASE = 3;
        Boost.DURATION = eg.TimeSpan.FromSeconds(3);
        return Boost;
    })(ShootR.MovementAbility);
    ShootR.Boost = Boost;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=Boost.js.map
