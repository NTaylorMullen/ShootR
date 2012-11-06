var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var ShipMovementController = (function (_super) {
    __extends(ShipMovementController, _super);
    function ShipMovementController(position) {
        _super.call(this, ShipMovementController.MASS, ShipMovementController.ENGINE_POWER);
        this._acceleration = Vector2.Zero();
        this.StopMovement();
    }
    ShipMovementController.MASS = 0;
    ShipMovementController.ENGINE_POWER = 0;
    ShipMovementController.DRAG_AREA = 0;
    ShipMovementController.DRAG_COEFFICIENT = 0;
    ShipMovementController.ROTATE_SPEED = 0;
    ShipMovementController.MOVING_DIRECTIONS = [
        "RotatingLeft", 
        "RotatingRight", 
        "Forward", 
        "Backward"
    ];
    ShipMovementController.INTERPOLATE_POSITION_THRESHOLD = 10;
    ShipMovementController.INTERPOLATE_ROTATION_THRESHOLD = 15;
    ShipMovementController.prototype.Interpolate = function (axis, ClientPositionPrediction) {
        if(this.Smoothing[axis]) {
            var InterpolationPercent = CalculatePO(this.LastUpdated, this.InterpolateOver[axis]);
            this.Target[axis] += ClientPositionPrediction[axis];
            var posDiff = this.Target[axis] - this.Position[axis];
            this.Position[axis] += (posDiff * InterpolationPercent);
            if(Math.abs(posDiff) <= ShipMovementController.INTERPOLATE_POSITION_THRESHOLD) {
                this.Smoothing[axis] = false;
            }
        }
    };
    ShipMovementController.prototype.InterpolateRotation = function (RotationIncrementor) {
        if(this.SmoothingRotation) {
            var InterpolationPercent = CalculatePO(this.LastUpdated, this.InterpolateRotationOver);
            this.TargetRotation += RotationIncrementor;
            var rotDiff = this.TargetRotation - this.Rotation;
            this.Rotation += (rotDiff * InterpolationPercent);
            if(Math.abs(rotDiff) <= ShipMovementController.INTERPOLATE_ROTATION_THRESHOLD) {
                this.SmoothingRotation = false;
            }
        }
    };
    ShipMovementController.prototype.TryInterpolation = function (ClientPositionPrediction) {
        if(this.InterpolateOver) {
            this.Interpolate("X", ClientPositionPrediction);
            this.Interpolate("Y", ClientPositionPrediction);
        }
    };
    ShipMovementController.prototype.TryInterpolationRotation = function (RotationIncrementor) {
        if(this.InterpolateRotationOver) {
            this.InterpolateRotation(RotationIncrementor);
        }
    };
    ShipMovementController.prototype.StopMovement = function () {
        for(var i = ShipMovementController.MOVING_DIRECTIONS.length - 1; i >= 0; i--) {
            this.Moving[ShipMovementController.MOVING_DIRECTIONS[i]] = false;
        }
    };
    ShipMovementController.prototype.Move = function (percentOfSecond, now) {
        var velocityLength;
        var clientPositionPrediction = Vector2.Zero();
        var nowMilliseconds = now.getTime();

        this._acceleration = Vector2.DivideVByN(this.Forces, this.Mass);
        clientPositionPrediction = Vector2.AddV(Vector2.MultiplyN(this.Velocity, percentOfSecond), Vector2.MultiplyN(this._acceleration, percentOfSecond * percentOfSecond));
        this.Position.AddV(clientPositionPrediction);
        this.TryInterpolation(clientPositionPrediction);
        this.Velocity.AddV(Vector2.MultiplyN(this._acceleration, percentOfSecond));
        velocityLength = this.Velocity.Length();
        if(velocityLength < 10) {
            this.Velocity.ZeroOut();
        } else {
            if(velocityLength > 3000) {
                this.Velocity = Vector2.MultiplyN(new Vector2(this.Rotation, false), 600);
            }
        }
        this._acceleration.ZeroOut();
        this.Forces.ZeroOut();
        var rotationIncrementor = percentOfSecond * ShipMovementController.ROTATE_SPEED;
        var direction = new Vector2(this.Rotation, false);
        var dragForce = Vector2.MultiplyN(Vector2.MultiplyV(Vector2.MultiplyN(this.Velocity, 0.5), this.Velocity.Abs()), ShipMovementController.DRAG_COEFFICIENT * ShipMovementController.DRAG_AREA * -1);

        if(this.Moving.RotatingLeft) {
            this.Rotation -= rotationIncrementor;
        }
        if(this.Moving.RotatingRight) {
            this.Rotation += rotationIncrementor;
        }
        if(this.Moving.Forward) {
            this.ApplyForce(Vector2.MultiplyN(direction, this.Power));
        }
        if(this.Moving.Backward) {
            this.ApplyForce(Vector2.MultiplyN(direction, this.Power * -1));
        }
        this.ApplyForce(dragForce);
    };
    ShipMovementController.prototype.Update = function (percentOfSecond, now) {
        this.Move(percentOfSecond, now);
        _super.prototype.Update.call(this, percentOfSecond, now);
    };
    ShipMovementController.prototype.UpdateMovementController = function (data) {
        for(var i = ShipMovementController.MOVING_DIRECTIONS.length - 1; i >= 0; i--) {
            this.Moving[ShipMovementController.MOVING_DIRECTIONS[i]] = data.Moving[ShipMovementController.MOVING_DIRECTIONS[i]];
        }
        _super.prototype.UpdateMovementController.call(this, data);
    };
    return ShipMovementController;
})(MovementController);
//@ sourceMappingURL=ShipMovementController.js.map
