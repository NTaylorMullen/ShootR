/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="IMoving.ts" />
/// <reference path="ShipFireController.ts" />

module ShootR {

    export class ShipInputController {
        public static DOUBLE_TAP_AFTER: eg.TimeSpan = eg.TimeSpan.FromMilliseconds(350);

        private _directions: IMoving;
        private _lastBoostTap: Date;
        private _fireController: ShipFireController;

        constructor(private _keyboard: eg.Input.KeyboardHandler, private _onMove: (direction: string, startMoving: boolean) => void, private _onFire: (fireMethod: string) => void) {
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

            this._keyboard.OnCommandUp("w", () => {
                var now = new Date();

                if (eg.TimeSpan.DateSpan(this._lastBoostTap, now).Milliseconds <= ShipInputController.DOUBLE_TAP_AFTER.Milliseconds) {
                    this._onMove("Boost", true);
                } else { // no double tap
                    this._lastBoostTap = now;
                }
            });

            this._fireController = new ShipFireController(this._keyboard, this._onFire);
        }

        private BindKeys(keyList: string[], bindingAction: string, direction: string, startMoving: boolean): void {
            for (var i = 0; i < keyList.length; i++) {
                this._keyboard[bindingAction](keyList[i], () => {
                    if (this._directions[direction] !== startMoving) {
                        this._directions[direction] = startMoving;
                        this._onMove(direction, startMoving);
                    }
                });
            }
        }
    }

}