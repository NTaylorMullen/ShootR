/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="ShipManager.ts" />
/// <reference path="ShipInputController.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />

module ShootR {

    export class UserShipManager implements eg.IUpdateable {
        private _shipInputController: ShipInputController;
        private _currentCommand: number;
        private _commandList: IShipCommand[];

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
                            proxy.invoke("registerAbilityStart", direction, false, this.NewAbilityCommand(direction, true));

                            ship.AbilityHandler.Activate(direction);

                            return;
                            // Don't want to trigger a server command if we're already moving in the direction
                        } else if (!ship.MovementController.IsMovingInDirection(direction)) {
                            proxy.invoke("registerMoveStart", direction, pingBack, this.NewMovementCommand(direction, true));
                        }
                    } else {
                        // Don't want to trigger a server command if we're already moving in the direction
                        if (ship.MovementController.IsMovingInDirection(direction)) {
                            proxy.invoke("registerMoveStop", direction, pingBack, this.NewMovementCommand(direction, false));
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
                ship: Ship = this._shipManager.GetShip(this._myShipId),
                serverCommandIndex: number,
                command: IShipCommand;

            if (this._commandList.length >= 1 && ship) {
                serverCommandIndex = this._commandList.length - (this._currentCommand - serverCommand);

                for (var i = serverCommandIndex; i < this._commandList.length; i++) {
                    command = this._commandList[i];

                    if (command.IsAbility) {
                        if (command.Start) {
                            ship.AbilityHandler.Activate(command.Command)
                        } else {
                            ship.AbilityHandler.Deactivate(command.Command)
                        }
                    } else {
                        ship.MovementController.Moving[command.Command] = command.Start;
                    }
                }

                this._commandList.splice(0, serverCommandIndex);
            }
        }

        public Update(gameTime: eg.GameTime): void {
            var ship = this._shipManager.GetShip(this._myShipId);

            if (ship) {
                ship.Graphic.HideLifeBar();

                this._camera.Position = ship.MovementController.Position;
            }
        }

        private NewMovementCommand(direction: string, startMoving: boolean): number {
            this._commandList.push({
                CommandID: ++this._currentCommand,
                Command: direction,
                Start: startMoving,
                IsAbility: false
            });

            return this._currentCommand;
        }

        private NewAbilityCommand(ability: string, startMoving: boolean): number {
            this._commandList.push({
                CommandID: ++this._currentCommand,
                Command: ability,
                Start: startMoving,
                IsAbility: true
            });

            return this._currentCommand;
        }
    }

    interface IShipCommand {
        CommandID: number;
        Command: string;
        Start: boolean;
        IsAbility: boolean;
    }

}