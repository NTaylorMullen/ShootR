/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Ships/ShipManager.ts" />
/// <reference path="../Ships/ShipInputController.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="UserCameraController.ts" />
var ShootR;
(function (ShootR) {
    var UserShipManager = (function () {
        function UserShipManager(_myShipId, _shipManager, input, _camera, serverAdapter) {
            var _this = this;
            this._myShipId = _myShipId;
            this._shipManager = _shipManager;
            this._camera = _camera;
            this._proxy = serverAdapter.Proxy;
            this._currentCommand = 0;
            this._commandList = [];
            this._userCameraController = new ShootR.UserCameraController(this._myShipId, this._shipManager, this._camera);
            this._enqueuedCommands = [];

            this._shipInputController = new ShootR.ShipInputController(input.Keyboard, function (direction, startMoving) {
                var ship = _this._shipManager.GetShip(_this._myShipId), pingBack = false;

                if (ship && ship.MovementController.Controllable) {
                    if (startMoving) {
                        if (direction === "Boost") {
                            _this._enqueuedCommands.push(function () {
                                _this.Invoke("registerAbilityStart", pingBack, _this.NewAbilityCommand(direction, true));

                                ship.AbilityHandler.Activate(direction);
                            });

                            return;
                            // Don't want to trigger a server command if we're already moving in the direction
                        } else if (!ship.MovementController.IsMovingInDirection(direction)) {
                            _this._enqueuedCommands.push(function () {
                                _this.Invoke("registerMoveStart", pingBack, _this.NewMovementCommand(direction, true));

                                ship.MovementController.Move(direction, startMoving);
                            });
                        }
                    } else {
                        if (ship.MovementController.IsMovingInDirection(direction)) {
                            _this._enqueuedCommands.push(function () {
                                _this.Invoke("registerMoveStop", pingBack, _this.NewMovementCommand(direction, false));

                                ship.MovementController.Move(direction, startMoving);
                            });
                        }
                    }
                }
            }, function (fireMethod) {
                var hubMethod = fireMethod.substr(0, 1).toUpperCase() + fireMethod.substring(1);

                _this._proxy.invoke(hubMethod);
            });
        }
        UserShipManager.prototype.LoadPayload = function (payload) {
            var serverCommand = payload.LastCommandProcessed, ship = this._shipManager.GetShip(this._myShipId), serverCommandIndex, command;

            if (ship) {
                ship.Graphic.HideLifeBar();
                ship.MovementController.UserControlled = true;

                if (this._commandList.length >= 1) {
                    serverCommandIndex = this._commandList.length - (this._currentCommand - serverCommand);

                    for (var i = serverCommandIndex; i < this._commandList.length; i++) {
                        command = this._commandList[i];

                        if (command.IsAbility) {
                            if (command.Start) {
                                ship.AbilityHandler.Activate(command.Command);
                            } else {
                                ship.AbilityHandler.Deactivate(command.Command);
                            }
                        } else {
                            ship.MovementController.Moving[command.Command] = command.Start;
                        }
                    }

                    this._commandList.splice(0, serverCommandIndex);
                }
            }
        };

        UserShipManager.prototype.Update = function (gameTime) {
            var ship = this._shipManager.GetShip(this._myShipId);

            if (ship) {
                while (this._enqueuedCommands.length > 0) {
                    this._enqueuedCommands.shift()();
                }

                this._userCameraController.Update(gameTime);
            }
        };

        UserShipManager.prototype.Invoke = function (method, pingBack, command) {
            var ship = this._shipManager.GetShip(this._myShipId);

            this._proxy.invoke(method, command.Command, { X: Math.round(ship.MovementController.Position.X - ship.Graphic.Size.HalfWidth), Y: Math.round(ship.MovementController.Position.Y - ship.Graphic.Size.HalfHeight) }, Math.roundTo(ship.MovementController.Rotation * 57.2957795, 2), { X: Math.round(ship.MovementController.Velocity.X), Y: Math.round(ship.MovementController.Velocity.Y) }, pingBack, command.CommandID);
        };

        UserShipManager.prototype.NewMovementCommand = function (direction, startMoving) {
            var command = {
                CommandID: ++this._currentCommand,
                Command: direction,
                Start: startMoving,
                IsAbility: false
            };

            this._commandList.push(command);

            return command;
        };

        UserShipManager.prototype.NewAbilityCommand = function (ability, startMoving) {
            var command = {
                CommandID: ++this._currentCommand,
                Command: ability,
                Start: startMoving,
                IsAbility: true
            };

            this._commandList.push(command);

            return command;
        };
        return UserShipManager;
    })();
    ShootR.UserShipManager = UserShipManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=UserShipManager.js.map
