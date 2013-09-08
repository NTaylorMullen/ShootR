/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="ShipManager.ts" />
/// <reference path="ShipInputController.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />

module ShootR {

    export class UserShipManager implements eg.IUpdateable {
        private _shipInputController: ShipInputController;
        private _currentCommand: number;
        private _commandList: any[][];

        constructor(private _myShipId: number, private _shipManager: ShipManager, input: eg.Input.InputManager, private _camera: eg.Rendering.Camera2d, serverAdapter: Server.ServerAdapter) {
            var proxy: HubProxy = serverAdapter.Proxy;

            this._currentCommand = 0;
            this._commandList = [];

            this._shipInputController = new ShipInputController(input.Keyboard, (direction: string, startMoving: boolean) => {
                var ship = this._shipManager.GetShip(this._myShipId),
                    pingBack: boolean = false;

                if (ship && ship.MovementController.Controllable) {
                    if (startMoving) {
                        if (direction === "Boost") {
                            this._commandList.push([++this._currentCommand, direction, true, true]);
                            proxy.invoke("registerAbilityStart", direction, false, this._currentCommand);

                            ship.AbilityHandler.Activate(direction);

                            return;
                            // Don't want to trigger a server command if we're already moving in the direction
                        } else if (!ship.MovementController.IsMovingInDirection(direction)) {
                            this._commandList.push([++this._currentCommand, direction, startMoving]);
                            proxy.invoke("registerMoveStart", direction, pingBack, this._currentCommand);
                        }
                    } else {
                        // Don't want to trigger a server command if we're already moving in the direction
                        if (ship.MovementController.IsMovingInDirection(direction)) {
                            this._commandList.push([++this._currentCommand, direction, startMoving]);
                            proxy.invoke("registerMoveStop", direction, pingBack, this._currentCommand);
                        }
                    }

                    ship.MovementController.Move(direction, startMoving);
                }
            }, (fireMethod: string) => {
                    var hubMethod: string = fireMethod.substr(0, 1).toUpperCase() + fireMethod.substring(1);

                    proxy.invoke(hubMethod);
                });
        }

        public LoadPayload(payload: Server.IPayloadData): void {
            var serverCommand: number = payload.LastCommandProcessed,
                ship: Ship = this._shipManager.GetShip(this._myShipId);

            if (this._commandList.length >= 1) {
                var serverCommandIndex: number = this._commandList.length - (this._currentCommand - serverCommand);

                for (var i = serverCommandIndex; i < this._commandList.length; i++) {
                    if (this._commandList[i][3]) { // Checking if the command is an ability
                        /*if (this._commandList[i][2]) {
                            this.ShipAbilityHandler.Activate(this._commandList[i][1])
                        } else {
                            this.ShipAbilityHandler.Deactivate(this._commandList[i][1])
                        }*/
                    } else {
                        ship.MovementController.Moving[this._commandList[i][1]] = this._commandList[i][2];
                    }
                }

                this._commandList.splice(0, serverCommandIndex);
            }
        }

        public Update(gameTime: eg.GameTime): void {
            var ship = this._shipManager.GetShip(this._myShipId);

            if (ship) {
                this._camera.Position = ship.MovementController.Position;
            }
        }
    }

}