/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
var ShootR;
(function (ShootR) {
    var ShipFireController = (function () {
        function ShipFireController(keyboard, onFire) {
            var autoFireHandle, firedAt = 0, singleFireMode = true, lastShot = 0;

            keyboard.OnCommandDown("space", function () {
                var timeSinceFired;

                firedAt = new Date().getTime();

                if (singleFireMode) {
                    timeSinceFired = firedAt - lastShot;

                    if (timeSinceFired > ShipFireController.MIN_FIRE_RATE.Milliseconds) {
                        lastShot = firedAt;
                        onFire("Fire");
                    }

                    autoFireHandle = setTimeout(function () {
                        singleFireMode = false;
                        onFire("StartFire");
                    }, ShipFireController.MIN_FIRE_RATE.Milliseconds);
                } else {
                    onFire("StartFire");
                }
            });
            keyboard.OnCommandUp("space", function () {
                var timeFireReleased;

                clearTimeout(autoFireHandle);
                timeFireReleased = new Date().getTime();

                if (!singleFireMode) {
                    lastShot = timeFireReleased;
                    onFire("StopFire");
                }

                singleFireMode = timeFireReleased - firedAt < ShipFireController.MIN_FIRE_RATE.Milliseconds;
            });
        }
        return ShipFireController;
    })();
    ShootR.ShipFireController = ShipFireController;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipFireController.js.map
