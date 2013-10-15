/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />

module ShootR {

    export class ShipFireController {
        public static MIN_FIRE_RATE: eg.TimeSpan;

        constructor(keyboard: eg.Input.KeyboardHandler, onFire: (fireMethod: string) => void) {
            var autoFireHandle: number,
                firedAt: number = 0,
                singleFireMode: boolean = true,
                lastShot: number = 0;

            keyboard.OnCommandDown("space", () => {
                var timeSinceFired: number;

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
            keyboard.OnCommandUp("space", () => {
                var timeFireReleased: number;

                clearTimeout(autoFireHandle);
                timeFireReleased = new Date().getTime();

                if (!singleFireMode) {
                    lastShot = timeFireReleased;
                    onFire("StopFire");
                }

                singleFireMode = timeFireReleased - firedAt < ShipFireController.MIN_FIRE_RATE.Milliseconds;
            });
        }
    }

}