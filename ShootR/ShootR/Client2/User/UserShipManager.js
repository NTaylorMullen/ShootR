/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Ships/ShipManager.ts" />
/// <reference path="../Ships/ShipInputController.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="UserCameraController.ts" />
/// <reference path="LatencyResolver.ts" />
var ShootR;
(function (ShootR) {
    var UserShipManager = (function () {
        function UserShipManager(_myShipId, _shipManager, _collisionManager, input, _camera, serverAdapter) {
            var _this = this;
            this._myShipId = _myShipId;
            this._shipManager = _shipManager;
            this._collisionManager = _collisionManager;
            this._camera = _camera;
            this._proxy = serverAdapter.Proxy;
            this._currentCommand = 0;
            this._commandList = [];
            this._userCameraController = new ShootR.UserCameraController(this._myShipId, this._shipManager, this._camera);
            this._enqueuedCommands = [];
            this._lastSync = new Date();
            this.LatencyResolver = new ShootR.LatencyResolver(serverAdapter);

            this._collisionManager.OnCollision.Bind(function (ship, boundary) {
                if (ship instanceof ShootR.Ship && boundary instanceof ShootR.MapBoundary) {
                    if (ship.ID === _this._myShipId) {
                        for (var i = ShootR.ShipMovementController.MOVING_DIRECTIONS.length - 1; i >= 0; i--) {
                            _this._enqueuedCommands.push((function (i) {
                                return function () {
                                    _this.Invoke("registerMoveStop", false, _this.NewMovementCommand(ShootR.ShipMovementController.MOVING_DIRECTIONS[i], false));
                                };
                            })(i));
                        }
                    }
                }
            });

            this._shipInputController = new ShootR.ShipInputController(input.Keyboard, function (direction, startMoving) {
                var ship = _this._shipManager.GetShip(_this._myShipId);

                if (ship && ship.MovementController.Controllable) {
                    if (startMoving) {
                        if (direction === "Boost") {
                            _this._enqueuedCommands.push(function () {
                                _this.Invoke("registerAbilityStart", _this.LatencyResolver.TryRequestPing(), _this.NewAbilityCommand(direction, true));

                                ship.AbilityHandler.Activate(direction);
                            });

                            return;
                            // Don't want to trigger a server command if we're already moving in the direction
                        } else if (!ship.MovementController.IsMovingInDirection(direction)) {
                            _this._enqueuedCommands.push(function () {
                                _this.Invoke("registerMoveStart", _this.LatencyResolver.TryRequestPing(), _this.NewMovementCommand(direction, true));

                                ship.MovementController.Move(direction, startMoving);
                            });
                        }
                    } else {
                        if (ship.MovementController.IsMovingInDirection(direction)) {
                            _this._enqueuedCommands.push(function () {
                                _this.Invoke("registerMoveStop", _this.LatencyResolver.TryRequestPing(), _this.NewMovementCommand(direction, false));

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
                ship.LevelManager.UpdateExperience(payload.Experience, payload.ExperienceToNextLevel);

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

                if (eg.TimeSpan.DateSpan(this._lastSync, gameTime.Now).Seconds > UserShipManager.SYNC_INTERVAL.Seconds) {
                    this._lastSync = gameTime.Now;
                    this._proxy.invoke("syncMovement", { X: Math.round(ship.MovementController.Position.X - ship.Graphic.Size.HalfWidth), Y: Math.round(ship.MovementController.Position.Y - ship.Graphic.Size.HalfHeight) }, Math.roundTo(ship.MovementController.Rotation * 57.2957795, 2), { X: Math.round(ship.MovementController.Velocity.X), Y: Math.round(ship.MovementController.Velocity.Y) });
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
        UserShipManager.SYNC_INTERVAL = eg.TimeSpan.FromSeconds(1.5);
        return UserShipManager;
    })();
    ShootR.UserShipManager = UserShipManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=UserShipManager.js.map
