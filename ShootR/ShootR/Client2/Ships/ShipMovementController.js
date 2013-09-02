/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="IMoving.ts" />
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
            this._acceleration = eg.Vector2d.Zero;

            this.Moving = {
                Forward: false,
                Backward: false,
                RotatingLeft: false,
                RotatingRight: false
            };

            this.OnMove = new eg.EventHandler1();
        }
        ShipMovementController.prototype.LoadPayload = function (payload) {
            this.Rotation = payload.Rotation * .0174532925;
            this.Mass = payload.Mass;
            this.Forces = payload.Forces;
            this.Velocity = payload.Velocity;
            this.Position = payload.Position.Add(ShootR.Ship.SIZE.Multiply(.5));
            this.Moving = payload.Moving;
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
            var clientPositionPrediction, rotationIncrementor, direction = new eg.Vector2d(Math.cos(this.Rotation), Math.sin(this.Rotation)), dragForce, velocityLength;

            this._acceleration = this.Forces.Divide(this.Mass);

            clientPositionPrediction = this.Velocity.Multiply(gameTime.Elapsed.Seconds).Add(this._acceleration.Multiply(gameTime.Elapsed.Seconds * gameTime.Elapsed.Seconds));
            this.Position = this.Position.Add(clientPositionPrediction);

            this.Velocity = this.Velocity.Add(this._acceleration.Multiply(gameTime.Elapsed.Seconds));

            velocityLength = this.Velocity.Length();

            if (velocityLength < 10) {
                this.Velocity = eg.Vector2d.Zero;
            } else if (velocityLength > 3000) {
                this.Velocity = direction.Multiply(600);
            }

            this._acceleration = eg.Vector2d.Zero;
            this.Forces = eg.Vector2d.Zero;

            rotationIncrementor = gameTime.Elapsed.Seconds * ShipMovementController.ROTATE_SPEED;
            dragForce = this.Velocity.Multiply(.5).Multiply(this.Velocity.Abs()).Multiply(ShipMovementController.DRAG_COEFFICIENT * ShipMovementController.DRAG_AREA * -1);

            if (this.Moving.RotatingLeft) {
                this.Rotation -= rotationIncrementor;
            }
            if (this.Moving.RotatingRight) {
                this.Rotation += rotationIncrementor;
            }
            if (this.Moving.Forward) {
                this.ApplyForce(direction.Multiply(this.Power));
            }
            if (this.Moving.Backward) {
                this.ApplyForce(direction.Multiply(this.Power * -1));
            }

            this.ApplyForce(dragForce);

            for (var i = 0; i < this._moveables.length; i++) {
                this._moveables[i].Position = this.Position;

                if (this._moveables[i] instanceof eg.Graphics.Graphic2d) {
                    this._moveables[i].Rotation = this.Rotation;
                }
            }
        };

        ShipMovementController.prototype.Move = function (direction, startMoving) {
            if (typeof this.Moving[direction] !== "undefined") {
                this.Moving[direction] = startMoving;
                this.OnMove.Trigger({
                    Direction: direction,
                    StartMoving: startMoving
                });
            } else {
                throw new Error(direction + " is an unknown direction.");
            }
        };
        ShipMovementController.MASS = 50;
        ShipMovementController.ENGINE_POWER = 110000;
        ShipMovementController.DRAG_AREA = 5;
        ShipMovementController.DRAG_COEFFICIENT = .2;
        ShipMovementController.ROTATE_SPEED = Math.PI;
        ShipMovementController.MOVING_DIRECTIONS = ["RotatingLeft", "RotatingRight", "Forward", "Backward"];
        ShipMovementController.INTERPOLATE_POSITION_THRESHOLD = 10;
        ShipMovementController.INTERPOLATE_ROTATION_THRESHOLD = 15;
        return ShipMovementController;
    })(eg.MovementControllers.MovementController);
    ShootR.ShipMovementController = ShipMovementController;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipMovementController.js.map
