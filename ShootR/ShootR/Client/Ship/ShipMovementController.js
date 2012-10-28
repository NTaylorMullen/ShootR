function ShipMovementController(position) {
    if (position) {
        MovementController.apply(this, [this.MASS, this.ENGINE_POWER]);
        var that = this,
            acceleration = new Vector2(),
            movingDirections = ["RotatingLeft", "RotatingRight", "Forward", "Backward"];

        that.Position = position;
        that.Moving = {}

        that.StopMovement = function () {
            for (var i = movingDirections.length - 1; i >= 0; i--) {
                that.Moving[movingDirections[i]] = false;
            }
        }

        // Initializes the Moving object
        that.StopMovement();

        function Interpolate(axis, ClientPositionPrediction) {
            if (that.Smoothing[axis]) {
                var InterpolationPercent = CalculatePO(that.LastUpdated, that.InterpolateOver[axis]);

                that.Target[axis] += ClientPositionPrediction[axis];

                var posDiff = that.Target[axis] - that.Position[axis];
                that.Position[axis] += (posDiff * InterpolationPercent);

                if (Math.abs(posDiff) <= that.INTERPOLATE_POSITION_THRESHOLD) {
                    that.Smoothing[axis] = false;
                }
            }
        }

        function InterpolateRotation(RotationIncrementor) {
            if (that.SmoothingRotation) {
                var InterpolationPercent = CalculatePO(that.LastUpdated, that.InterpolateRotationOver);

                that.TargetRotation += RotationIncrementor;

                var rotDiff = that.TargetRotation - that.Rotation;
                that.Rotation += (rotDiff * InterpolationPercent);

                if (Math.abs(rotDiff) <= that.INTERPOLATE_ROTATION_THRESHOLD) {
                    that.SmoothingRotation = false;
                }
            }
        }

        function TryInterpolation(ClientPositionPrediction) {
            if (that.InterpolateOver) {
                Interpolate("X", ClientPositionPrediction);
                Interpolate("Y", ClientPositionPrediction);
            }
        }

        function TryInterpolationRotation(RotationIncrementor) {
            if (that.InterpolateRotationOver) {
                InterpolateRotation(RotationIncrementor);
            }
        }

        that.Move = function (percentOfSecond, now) {
            var velocityLength,
                clientPositionPrediction = new Vector2(),
                nowMilliseconds = now.getTime();

            acceleration = Vector2.AddV(acceleration, Vector2.DivideVByN(that.Forces, that.Mass));

            clientPositionPrediction = Vector2.AddV(Vector2.MultiplyN(that.Velocity,percentOfSecond), Vector2.MultiplyN(acceleration, percentOfSecond * percentOfSecond));

            that.Position = Vector2.AddV(that.Position, clientPositionPrediction);

            TryInterpolation(clientPositionPrediction);

            that.Velocity = Vector2.AddV(that.Velocity, Vector2.MultiplyN(acceleration, percentOfSecond));
            velocityLength = that.Velocity.Length();

            // Stop moving if the "speed" is less than 10
            if (velocityLength < 10) {
                that.Velocity.ZeroOut();
            }
            else if (velocityLength > 3000) // Hack
            {
                that.Velocity = Vector2.MultiplyN(new Vector2(that.Rotation, false), 600);
            }

            acceleration.ZeroOut();
            that.Forces.ZeroOut();

            var rotationIncrementor = percentOfSecond * that.ROTATE_SPEED,
                direction = new Vector2(that.Rotation, false),
                dragForce = Vector2.MultiplyN(Vector2.MultiplyV(Vector2.MultiplyN(that.Velocity, .5), that.Velocity.Abs()), that.DRAG_COEFFICIENT * that.DRAG_AREA * -1);

            if (that.Moving.RotatingLeft) {
                that.Rotation -= rotationIncrementor;
            }
            if (that.Moving.RotatingRight) {
                that.Rotation += rotationIncrementor;
            }
            if (that.Moving.Forward) {
                that.ApplyForce(Vector2.MultiplyN(direction,that.Power));
            }
            if (that.Moving.Backward) {
                that.ApplyForce(Vector2.MultiplyN(direction,that.Power * -1));
            }

            that.ApplyForce(dragForce);

            // Rounding so we doing do alpha transparency on the canvas
            that.Position.X = Math.round(that.Position.X);
            that.Position.Y = Math.round(that.Position.Y);
        }

        that.Update = function (percentOfSecond, now) {
            that.Move(percentOfSecond, now);
            that.LastUpdated = now;
        }

        that.UpdateMovementController = function (data) {
            that.Forces.X = data.Forces.X;
            that.Forces.Y = data.Forces.Y;

            that.Mass = data.Mass;
            for (var i = movingDirections.length - 1; i >= 0; i--) {
                that.Moving[movingDirections[i]] = data.Moving[movingDirections[i]];
            }

            that.Position.X = data.Position.X;
            that.Position.Y = data.Position.Y;

            that.Rotation = data.Rotation;

            that.Velocity.X = data.Velocity.X;
            that.Velocity.Y = data.Velocity.Y;
        }
    }
}

ShipMovementController.prototype = new MovementController();