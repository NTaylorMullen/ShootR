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
                            _this._commandList.push([++_this._currentCommand, direction, true, true]);
                            proxy.invoke("registerAbilityStart", direction, false, _this._currentCommand);

                            ship.AbilityHandler.Activate(direction);

                            return;
                            // Don't want to trigger a server command if we're already moving in the direction
                        } else if (!ship.MovementController.IsMovingInDirection(direction)) {
                            _this._commandList.push([++_this._currentCommand, direction, startMoving]);
                            proxy.invoke("registerMoveStart", direction, pingBack, _this._currentCommand);
                        }
                    } else {
                        if (ship.MovementController.IsMovingInDirection(direction)) {
                            _this._commandList.push([++_this._currentCommand, direction, startMoving]);
                            proxy.invoke("registerMoveStop", direction, pingBack, _this._currentCommand);
                        }
                    }

                    ship.MovementController.Move(direction, startMoving);
                }
            });
        }
        UserShipManager.prototype.LoadPayload = function (payload) {
            var serverCommand = payload.LastCommandProcessed, ship = this._shipManager.GetShip(this._myShipId);

            if (this._commandList.length >= 1) {
                var serverCommandIndex = this._commandList.length - (this._currentCommand - serverCommand);

                for (var i = serverCommandIndex; i < this._commandList.length; i++) {
                    if (this._commandList[i][3]) {
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
        };

        UserShipManager.prototype.Update = function (gameTime) {
            var ship = this._shipManager.GetShip(this._myShipId);

            if (ship) {
                this._camera.Position = ship.MovementController.Position;
            }
        };
        return UserShipManager;
    })();
    ShootR.UserShipManager = UserShipManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=UserShipManager.js.map
