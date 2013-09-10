/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="ShipManager.ts" />
/// <reference path="ShipInputController.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
var ShootR;
(function (ShootR) {
    var UserShipManager = (function () {
        function UserShipManager(_myShipId, _shipManager, input, _camera, serverAdapter) {
            var _this = this;
            this._myShipId = _myShipId;
            this._shipManager = _shipManager;
            this._camera = _camera;
            var proxy = serverAdapter.Proxy;

            this._currentCommand = 0;
            this._commandList = [];

            this._shipInputController = new ShootR.ShipInputController(input.Keyboard, function (direction, startMoving) {
                var ship = _this._shipManager.GetShip(_this._myShipId), pingBack = false;

                if (ship && ship.MovementController.Controllable) {
                    if (startMoving) {
                        if (direction === "Boost") {
                            proxy.invoke("registerAbilityStart", direction, false, _this.NewAbilityCommand(direction, true));

                            ship.AbilityHandler.Activate(direction);

                            return;
                            // Don't want to trigger a server command if we're already moving in the direction
                        } else if (!ship.MovementController.IsMovingInDirection(direction)) {
                            proxy.invoke("registerMoveStart", direction, pingBack, _this.NewMovementCommand(direction, true));
                        }
                    } else {
                        if (ship.MovementController.IsMovingInDirection(direction)) {
                            proxy.invoke("registerMoveStop", direction, pingBack, _this.NewMovementCommand(direction, false));
                        }
                    }

                    ship.MovementController.Move(direction, startMoving);
                }
            }, function (fireMethod) {
                var hubMethod = fireMethod.substr(0, 1).toUpperCase() + fireMethod.substring(1);

                proxy.invoke(hubMethod);
            });
        }
        UserShipManager.prototype.LoadPayload = function (payload) {
            var serverCommand = payload.LastCommandProcessed, ship = this._shipManager.GetShip(this._myShipId), serverCommandIndex, command;

            if (this._commandList.length >= 1 && ship) {
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
        };

        UserShipManager.prototype.Update = function (gameTime) {
            var ship = this._shipManager.GetShip(this._myShipId);

            if (ship) {
                ship.Graphic.HideLifeBar();

                this._camera.Position = ship.MovementController.Position;
            }
        };

        UserShipManager.prototype.NewMovementCommand = function (direction, startMoving) {
            this._commandList.push({
                CommandID: ++this._currentCommand,
                Command: direction,
                Start: startMoving,
                IsAbility: false
            });

            return this._currentCommand;
        };

        UserShipManager.prototype.NewAbilityCommand = function (ability, startMoving) {
            this._commandList.push({
                CommandID: ++this._currentCommand,
                Command: ability,
                Start: startMoving,
                IsAbility: true
            });

            return this._currentCommand;
        };
        return UserShipManager;
    })();
    ShootR.UserShipManager = UserShipManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=UserShipManager.js.map
