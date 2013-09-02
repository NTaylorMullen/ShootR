/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="IMoving.ts" />
var ShootR;
(function (ShootR) {
    var ShipInputController = (function () {
        function ShipInputController(_keyboard, _onMove) {
            this._keyboard = _keyboard;
            this._onMove = _onMove;
            this._directions = {
                Forward: false,
                Backward: false,
                RotatingLeft: false,
                RotatingRight: false
            };

            this.BindKeys(["w"], "OnCommandDown", "Forward", true);
            this.BindKeys(["d"], "OnCommandDown", "RotatingRight", true);
            this.BindKeys(["s"], "OnCommandDown", "Backward", true);
            this.BindKeys(["a"], "OnCommandDown", "RotatingLeft", true);
            this.BindKeys(["w"], "OnCommandUp", "Forward", false);
            this.BindKeys(["d"], "OnCommandUp", "RotatingRight", false);
            this.BindKeys(["s"], "OnCommandUp", "Backward", false);
            this.BindKeys(["a"], "OnCommandUp", "RotatingLeft", false);
        }
        ShipInputController.prototype.BindKeys = function (keyList, bindingAction, direction, startMoving) {
            var _this = this;
            for (var i = 0; i < keyList.length; i++) {
                this._keyboard[bindingAction](keyList[i], function () {
                    if (_this._directions[direction] != startMoving) {
                        _this._directions[direction] = startMoving;
                        _this._onMove(direction, startMoving);
                    }
                });
            }
        };
        return ShipInputController;
    })();
    ShootR.ShipInputController = ShipInputController;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipInputController.js.map
