/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="IMoving.ts" />
/// <reference path="ShipInterpolationManager.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var ShipMovementController = (function (_super) {
        __extends(ShipMovementController, _super);
        function ShipMovementController(movables) {
            _super.call(this, movables);

            this._moveables = movables;

            this.Mass = ShipMovementController.MASS;
            this.Power = ShipMovementController.ENGINE_POWER;
            this.Forces = eg.Vector2d.Zero;
            this.Controllable = true;
            this._acceleration = eg.Vector2d.Zero;

            this.Moving = {
                Forward: false,
                Backward: false,
                RotatingLeft: false,
                RotatingRight: false
            };

            this._interpolationManager = new ShootR.ShipInterpolationManager(this);

            this.OnMove = new eg.EventHandler1();
        }
        ShipMovementController.prototype.LoadPayload = function (payload, forceMovement) {
            if (!forceMovement) {
                this._interpolationManager.LoadPayload(payload);
            } else {
                this.Position = payload.Position;
                this.Rotation = payload.Rotation;
            }

            if (!this.UserControlled || forceMovement) {
                this.Mass = payload.Mass;
                this.Forces = payload.Forces;
                this.Velocity = payload.Velocity;
                this.Moving = payload.Moving;
            }
        };

        ShipMovementController.prototype.IsMovingInDirection = function (direction) {
            return this.Moving[direction] || false;
        };

        ShipMovementController.prototype.StartMoving = function (direction) {
            this.Move(direction, true);
        };

        ShipMovementController.prototype.StopMoving = function (direction) {
            this.Move(direction, false);
        };

        ShipMovementController.prototype.StopAllMovement = function () {
            for (var i = ShipMovementController.MOVING_DIRECTIONS.length - 1; i >= 0; i--) {
                this.Moving[ShipMovementController.MOVING_DIRECTIONS[i]] = false;
            }
        };

        ShipMovementController.prototype.ApplyForce = function (force) {
            this.Forces = this.Forces.Add(force);
        };

        ShipMovementController.prototype.Update = function (gameTime) {
            var rotationIncrementor, direction = new eg.Vector2d(Math.cos(this.Rotation), Math.sin(this.Rotation)), dragForce, velocityLength;

            this._interpolationManager.Update(gameTime);

            if (!this._interpolationManager.Interpolating) {
                this._acceleration = this.Forces.Divide(this.Mass);

                this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.Elapsed.Seconds).Add(this._acceleration.Multiply(gameTime.Elapsed.Seconds * gameTime.Elapsed.Seconds)));
                this.Velocity = this.Velocity.Add(this._acceleration.Multiply(gameTime.Elapsed.Seconds));
                velocityLength = this.Velocity.Length();

                if (velocityLength < 10) {
                    this.Velocity = eg.Vector2d.Zero;
                } else if (velocityLength > 3000) {
                    this.Velocity = direction.Multiply(600);
                }

                this._acceleration = eg.Vector2d.Zero;
                this.Forces = eg.Vector2d.Zero;

                dragForce = this.Velocity.Multiply(.5).Multiply(this.Velocity.Abs()).Multiply(ShipMovementController.DRAG_COEFFICIENT * ShipMovementController.DRAG_AREA * -1);

                if (this.Moving.Forward) {
                    this.ApplyForce(direction.Multiply(this.Power));
                }
                if (this.Moving.Backward) {
                    this.ApplyForce(direction.Multiply(this.Power * -1));
                }

                this.ApplyForce(dragForce);

                rotationIncrementor = gameTime.Elapsed.Seconds * ShipMovementController.ROTATE_SPEED;

                if (this.Moving.RotatingLeft) {
                    this.Rotation -= rotationIncrementor;
                }
                if (this.Moving.RotatingRight) {
                    this.Rotation += rotationIncrementor;
                }
            }

            for (var i = 0; i < this._moveables.length; i++) {
                this._moveables[i].Position = this.Position;
            }
        };

        ShipMovementController.prototype.Move = function (direction, startMoving) {
            if (this.Controllable) {
                if (typeof this.Moving[direction] !== "undefined") {
                    this.Moving[direction] = startMoving;
                    this.OnMove.Trigger({
                        Direction: direction,
                        StartMoving: startMoving
                    });
                } else {
                    throw new Error(direction + " is an unknown direction.");
                }
            }
        };

        ShipMovementController.prototype.Dispose = function () {
            // Make all active functions no-op
            this.Update = function () {
            };
            this.LoadPayload = function () {
            };
        };
        ShipMovementController.MASS = 50;
        ShipMovementController.ENGINE_POWER = 110000;
        ShipMovementController.DRAG_AREA = 5;
        ShipMovementController.DRAG_COEFFICIENT = .2;
        ShipMovementController.ROTATE_SPEED = Math.PI;
        ShipMovementController.MOVING_DIRECTIONS = ["RotatingLeft", "RotatingRight", "Forward", "Backward"];
        return ShipMovementController;
    })(eg.MovementControllers.MovementController);
    ShootR.ShipMovementController = ShipMovementController;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipMovementController.js.map
