/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Ships/ShipManager.ts" />
/// <reference path="../Ships/ShipInputController.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="UserCameraController.ts" />

module ShootR {

    export class UserShipManager implements eg.IUpdateable {
        public static SYNC_INTERVAL: eg.TimeSpan = eg.TimeSpan.FromSeconds(1.5);

        private _shipInputController: ShipInputController;
        private _currentCommand: number;
        private _commandList: IShipCommand[];
        private _userCameraController: UserCameraController;
        private _enqueuedCommands: Array<Function>;
        private _proxy: HubProxy;
        private _lastSync: Date;

        constructor(private _myShipId: number, private _shipManager: ShipManager, private _collisionManager: eg.Collision.CollisionManager, input: eg.Input.InputManager, private _camera: eg.Rendering.Camera2d, serverAdapter: Server.ServerAdapter) {
            this._proxy = serverAdapter.Proxy;
            this._currentCommand = 0;
            this._commandList = [];
            this._userCameraController = new UserCameraController(this._myShipId, this._shipManager, this._camera);
            this._enqueuedCommands = [];
            this._lastSync = new Date();

            this._collisionManager.OnCollision.Bind((ship: Ship, boundary: MapBoundary) => {
                if (ship instanceof Ship && boundary instanceof MapBoundary) {
                    if (ship.ID === this._myShipId) {
                        for (var i = ShipMovementController.MOVING_DIRECTIONS.length - 1; i >= 0; i--) {
                            this._enqueuedCommands.push(((i) => {
                                    return () => {
                                    this.Invoke("registerMoveStop", false, this.NewMovementCommand(ShipMovementController.MOVING_DIRECTIONS[i], false));
                                }
                            })(i));
                        }
                    }
                }
            });

            this._shipInputController = new ShipInputController(input.Keyboard, (direction: string, startMoving: boolean) => {
                var ship = this._shipManager.GetShip(this._myShipId),
                    pingBack: boolean = false;

                if (ship && ship.MovementController.Controllable) {
                    if (startMoving) {
                        if (direction === "Boost") {
                            this._enqueuedCommands.push(() => {
                                this.Invoke("registerAbilityStart", pingBack, this.NewAbilityCommand(direction, true));

                                ship.AbilityHandler.Activate(direction);
                            });

                            return;
                            // Don't want to trigger a server command if we're already moving in the direction
                        } else if (!ship.MovementController.IsMovingInDirection(direction)) {
                            this._enqueuedCommands.push(() => {
                                this.Invoke("registerMoveStart", pingBack, this.NewMovementCommand(direction, true));

                                ship.MovementController.Move(direction, startMoving);
                            });
                        }
                    } else {
                        // Don't want to trigger a server command if we're already moving in the direction
                        if (ship.MovementController.IsMovingInDirection(direction)) {
                            this._enqueuedCommands.push(() => {
                                this.Invoke("registerMoveStop", pingBack, this.NewMovementCommand(direction, false));

                                ship.MovementController.Move(direction, startMoving);
                            });
                        }
                    }
                }
            }, (fireMethod: string) => {
                    var hubMethod: string = fireMethod.substr(0, 1).toUpperCase() + fireMethod.substring(1);

                    this._proxy.invoke(hubMethod);
                });
        }

        public LoadPayload(payload: Server.IPayloadData): void {
            var serverCommand: number = payload.LastCommandProcessed,
                ship: Ship = this._shipManager.GetShip(this._myShipId),
                serverCommandIndex: number,
                command: IShipCommand;

            if (ship) {
                ship.Graphic.HideLifeBar();
                ship.MovementController.UserControlled = true;
                ship.LevelManager.UpdateExperience(payload.Experience, payload.ExperienceToNextLevel);

                if (this._commandList.length >= 1) {
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
        }

        public Update(gameTime: eg.GameTime): void {
            var ship = this._shipManager.GetShip(this._myShipId);

            if (ship) {
                while (this._enqueuedCommands.length > 0) {
                    this._enqueuedCommands.shift()();
                }

                if (eg.TimeSpan.DateSpan(this._lastSync, gameTime.Now).Seconds > UserShipManager.SYNC_INTERVAL.Seconds) {
                    this._lastSync = gameTime.Now;
                    this._proxy.invoke("syncMovement", { X: Math.round(ship.MovementController.Position.X - ship.Graphic.Size.HalfWidth), Y: Math.round(ship.MovementController.Position.Y - ship.Graphic.Size.HalfHeight) }, Math.roundTo(ship.MovementController.Rotation * 57.2957795, 2), { X: Math.round(ship.MovementController.Velocity.X), Y: Math.round(ship.MovementController.Velocity.Y) });
                }

                this._userCameraController.Update(gameTime);
            }
        }

        private Invoke(method: string, pingBack: boolean, command: IShipCommand): void {
            var ship: Ship = this._shipManager.GetShip(this._myShipId);

            this._proxy.invoke(method, command.Command, { X: Math.round(ship.MovementController.Position.X - ship.Graphic.Size.HalfWidth), Y: Math.round(ship.MovementController.Position.Y - ship.Graphic.Size.HalfHeight) }, Math.roundTo(ship.MovementController.Rotation * 57.2957795, 2), { X: Math.round(ship.MovementController.Velocity.X), Y: Math.round(ship.MovementController.Velocity.Y) }, pingBack, command.CommandID);
        }

        private NewMovementCommand(direction: string, startMoving: boolean): IShipCommand {
            var command: IShipCommand = {
                CommandID: ++this._currentCommand,
                Command: direction,
                Start: startMoving,
                IsAbility: false
            };

            this._commandList.push(command);

            return command;
        }

        private NewAbilityCommand(ability: string, startMoving: boolean): IShipCommand {
            var command: IShipCommand = {
                CommandID: ++this._currentCommand,
                Command: ability,
                Start: startMoving,
                IsAbility: true
            };

            this._commandList.push(command);

            return command;
        }
    }

    interface IShipCommand {
        CommandID: number;
        Command: string;
        Start: boolean;
        IsAbility: boolean;
    }

}