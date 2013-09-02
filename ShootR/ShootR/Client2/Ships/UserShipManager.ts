/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="ShipManager.ts" />
/// <reference path="ShipInputController.ts" />

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

                if (ship) {
                    if (startMoving) {
                        // Don't want to trigger a server command if we're already moving in the direction
                        if (!ship.MovementController.IsMovingInDirection(direction)) {
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
            });
        }

        public Update(gameTime: eg.GameTime): void {
            var ship = this._shipManager.GetShip(this._myShipId);

            if (ship) {
                this._camera.Position = ship.MovementController.Position;
            }
        }
    }

}