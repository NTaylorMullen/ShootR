/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="IMoving.ts" />

module ShootR {

    export class ShipInputController {
        private _directions: IMoving;

        constructor(private _keyboard: eg.Input.KeyboardHandler, private _onMove: (direction: string, startMoving: boolean) => void) {
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

        private BindKeys(keyList: string[], bindingAction: string, direction: string, startMoving: boolean): void {
            for (var i = 0; i < keyList.length; i++) {
                this._keyboard[bindingAction](keyList[i], () => {
                    if (this._directions[direction] != startMoving) {
                        this._directions[direction] = startMoving;
                        this._onMove(direction, startMoving);
                    }
                });
            }
        }
    }

}