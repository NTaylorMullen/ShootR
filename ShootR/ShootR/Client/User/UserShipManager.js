/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Ships/ShipManager.ts" />
/// <reference path="../Ships/ShipInputController.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="UserCameraController.ts" />
/// <reference path="LatencyResolver.ts" />
var ShootR;
(function (ShootR) {
    var UserShipManager = (function () {
        function UserShipManager(ControlledShipId, _shipManager, _collisionManager, input, _camera, serverAdapter) {
            var _this = this;
            this.ControlledShipId = ControlledShipId;
            this._shipManager = _shipManager;
            this._collisionManager = _collisionManager;
            this._camera = _camera;
            this._proxy = serverAdapter.Proxy;
            this._userCameraController = new ShootR.UserCameraController(this.ControlledShipId, this._shipManager, this._camera);
            this._lastSync = new Date();
            this.LatencyResolver = new ShootR.LatencyResolver(serverAdapter);

            this._collisionManager.OnCollision.Bind(function (ship, boundary) {
                if (ship instanceof ShootR.Ship && boundary instanceof ShootR.MapBoundary) {
                    if (ship.ID === _this.ControlledShipId) {
                        for (var i = ShootR.ShipMovementController.MOVING_DIRECTIONS.length - 1; i >= 0; i--) {
                            _this.Invoke("registerMoveStop", false, _this.NewMovementCommand("Forward", false));
                            _this.Invoke("registerMoveStop", false, _this.NewMovementCommand("Backward", false));
                        }
                    }
                }
            });

            this._shipInputController = new ShootR.ShipInputController(input.Keyboard, function (direction, startMoving) {
                var ship = _this._shipManager.GetShip(_this.ControlledShipId);

                if (ship && ship.MovementController.Controllable && ship.LifeController.Alive) {
                    if (startMoving) {
                        if (direction === "Boost") {
                            _this.Invoke("registerAbilityStart", _this.LatencyResolver.TryRequestPing(), _this.NewAbilityCommand(direction, true));

                            ship.AbilityHandler.Activate(direction);
                            // Don't want to trigger a server command if we're already moving in the direction
                        } else if (!ship.MovementController.IsMovingInDirection(direction)) {
                            _this.Invoke("registerMoveStart", _this.LatencyResolver.TryRequestPing(), _this.NewMovementCommand(direction, true));

                            ship.MovementController.Move(direction, startMoving);
                        }
                    } else {
                        if (ship.MovementController.IsMovingInDirection(direction)) {
                            _this.Invoke("registerMoveStop", _this.LatencyResolver.TryRequestPing(), _this.NewMovementCommand(direction, false));

                            ship.MovementController.Move(direction, startMoving);
                        }
                    }
                }
            }, function (fireMethod) {
                var hubMethod = fireMethod.substr(0, 1).toUpperCase() + fireMethod.substring(1);

                _this._proxy.invoke(hubMethod);
            });
        }
        UserShipManager.prototype.LoadPayload = function (payload) {
            var ship = this._shipManager.GetShip(this.ControlledShipId);

            if (ship) {
                ship.LevelManager.UpdateExperience(payload.Experience, payload.ExperienceToNextLevel);
            }
        };

        UserShipManager.prototype.Update = function (gameTime) {
            var ship = this._shipManager.GetShip(this.ControlledShipId);

            if (ship) {
                if (eg.TimeSpan.DateSpan(this._lastSync, gameTime.Now).Seconds > UserShipManager.SYNC_INTERVAL.Seconds && ship.LifeController.Alive) {
                    this._lastSync = gameTime.Now;
                    this._proxy.invoke("syncMovement", { X: Math.round(ship.MovementController.Position.X - ship.Graphic.Size.HalfWidth), Y: Math.round(ship.MovementController.Position.Y - ship.Graphic.Size.HalfHeight) }, Math.roundTo(ship.MovementController.Rotation * 57.2957795, 2), { X: Math.round(ship.MovementController.Velocity.X), Y: Math.round(ship.MovementController.Velocity.Y) });
                }

                this._userCameraController.Update(gameTime);
            }
        };

        UserShipManager.prototype.Invoke = function (method, pingBack, command) {
            var ship = this._shipManager.GetShip(this.ControlledShipId);

            this._proxy.invoke(method, command.Command, { X: Math.round(ship.MovementController.Position.X - ship.Graphic.Size.HalfWidth), Y: Math.round(ship.MovementController.Position.Y - ship.Graphic.Size.HalfHeight) }, Math.roundTo(ship.MovementController.Rotation * 57.2957795, 2), { X: Math.round(ship.MovementController.Velocity.X), Y: Math.round(ship.MovementController.Velocity.Y) }, pingBack);
        };

        UserShipManager.prototype.NewMovementCommand = function (direction, startMoving) {
            var command = {
                Command: direction,
                Start: startMoving,
                IsAbility: false
            };

            return command;
        };

        UserShipManager.prototype.NewAbilityCommand = function (ability, startMoving) {
            var command = {
                Command: ability,
                Start: startMoving,
                IsAbility: true
            };

            return command;
        };
        UserShipManager.SYNC_INTERVAL = eg.TimeSpan.FromSeconds(1.5);
        return UserShipManager;
    })();
    ShootR.UserShipManager = UserShipManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=UserShipManager.js.map
