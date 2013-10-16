/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="IMoving.ts" />
/// <reference path="ShipFireController.ts" />
var ShootR;
(function (ShootR) {
    var ShipInputController = (function () {
        function ShipInputController(_keyboard, _onMove, _onFire) {
            var _this = this;
            this._keyboard = _keyboard;
            this._onMove = _onMove;
            this._onFire = _onFire;
            this._directions = {
                Forward: false,
                Backward: false,
                RotatingLeft: false,
                RotatingRight: false
            };
            this._lastBoostTap = new Date();

            this.BindKeys(["w"], "OnCommandDown", "Forward", true);
            this.BindKeys(["d"], "OnCommandDown", "RotatingRight", true);
            this.BindKeys(["s"], "OnCommandDown", "Backward", true);
            this.BindKeys(["a"], "OnCommandDown", "RotatingLeft", true);
            this.BindKeys(["w"], "OnCommandUp", "Forward", false);
            this.BindKeys(["d"], "OnCommandUp", "RotatingRight", false);
            this.BindKeys(["s"], "OnCommandUp", "Backward", false);
            this.BindKeys(["a"], "OnCommandUp", "RotatingLeft", false);

            this._keyboard.OnCommandUp("w", function () {
                var now = new Date();

                if (eg.TimeSpan.DateSpan(_this._lastBoostTap, now).Milliseconds <= ShipInputController.DOUBLE_TAP_AFTER.Milliseconds) {
                    _this._onMove("Boost", true);
                } else {
                    _this._lastBoostTap = now;
                }
            });

            this._fireController = new ShootR.ShipFireController(this._keyboard, this._onFire);
        }
        ShipInputController.prototype.BindKeys = function (keyList, bindingAction, direction, startMoving) {
            var _this = this;
            for (var i = 0; i < keyList.length; i++) {
                this._keyboard[bindingAction](keyList[i], function () {
                    if (_this._directions[direction] !== startMoving) {
                        _this._directions[direction] = startMoving;
                        _this._onMove(direction, startMoving);
                    }
                });
            }
        };
        ShipInputController.DOUBLE_TAP_AFTER = eg.TimeSpan.FromMilliseconds(350);
        return ShipInputController;
    })();
    ShootR.ShipInputController = ShipInputController;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipInputController.js.map
