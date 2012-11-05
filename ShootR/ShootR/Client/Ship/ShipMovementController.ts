/// <reference path="../Collidable/MovementControllers/MovementController.ts" />
/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="../Utilities/UtilityFunctions.js" />

class ShipMovementController extends MovementController {
    static MASS: number = 0;
    static ENGINE_POWER: number = 0;
    static DRAG_AREA: number = 0;
    static DRAG_COEFFICIENT: number = 0;
    static ROTATE_SPEED: number = 0;
    static MOVING_DIRECTIONS: string[] = ["RotatingLeft", "RotatingRight", "Forward", "Backward"];
    static INTERPOLATE_POSITION_THRESHOLD: number = 10;
    static INTERPOLATE_ROTATION_THRESHOLD: number = 15;

    private _acceleration: Vector2;

    public Smoothing: any;
    public Target: Vector2;
    public InterpolateOver: Vector2;
    public InterpolateRotationOver: number;
    public SmoothingRotation: bool;
    public TargetRotation: number;

    constructor (position: Vector2) {
        super(ShipMovementController.MASS, ShipMovementController.ENGINE_POWER);

        this._acceleration = Vector2.Zero();

        this.StopMovement();
    }

    private Interpolate(axis: string, ClientPositionPrediction: Vector2): void {
        if (this.Smoothing[axis]) {
            var InterpolationPercent = CalculatePO(this.LastUpdated, this.InterpolateOver[axis]);

            this.Target[axis] += ClientPositionPrediction[axis];

            var posDiff = this.Target[axis] - this.Position[axis];
            this.Position[axis] += (posDiff * InterpolationPercent);

            if (Math.abs(posDiff) <= ShipMovementController.INTERPOLATE_POSITION_THRESHOLD) {
                this.Smoothing[axis] = false;
            }
        }
    }

    private InterpolateRotation(RotationIncrementor): void {
        if (this.SmoothingRotation) {
            var InterpolationPercent = CalculatePO(this.LastUpdated, this.InterpolateRotationOver);

            this.TargetRotation += RotationIncrementor;

            var rotDiff = this.TargetRotation - this.Rotation;
            this.Rotation += (rotDiff * InterpolationPercent);

            if (Math.abs(rotDiff) <= ShipMovementController.INTERPOLATE_ROTATION_THRESHOLD) {
                this.SmoothingRotation = false;
            }
        }
    }

    private TryInterpolation(ClientPositionPrediction): void {
        if (this.InterpolateOver) {
            this.Interpolate("X", ClientPositionPrediction);
            this.Interpolate("Y", ClientPositionPrediction);
        }
    }

    private TryInterpolationRotation(RotationIncrementor): void {
        if (this.InterpolateRotationOver) {
            this.InterpolateRotation(RotationIncrementor);
        }
    }

    public StopMovement(): void {
        for (var i = ShipMovementController.MOVING_DIRECTIONS.length - 1; i >= 0; i--) {
            this.Moving[ShipMovementController.MOVING_DIRECTIONS[i]] = false;
        }
    }

    public Move(percentOfSecond: number, now: Date): void {
        var velocityLength,
            clientPositionPrediction = Vector2.Zero(),
            nowMilliseconds = now.getTime();

        this._acceleration = Vector2.DivideVByN(this.Forces, this.Mass);

        clientPositionPrediction = Vector2.AddV(Vector2.MultiplyN(this.Velocity, percentOfSecond), Vector2.MultiplyN(this._acceleration, percentOfSecond * percentOfSecond));

        this.Position = Vector2.AddV(this.Position, clientPositionPrediction);

        this.TryInterpolation(clientPositionPrediction);

        this.Velocity = Vector2.AddV(this.Velocity, Vector2.MultiplyN(this._acceleration, percentOfSecond));
        velocityLength = this.Velocity.Length();

        // Stop moving if the "speed" is less than 10
        if (velocityLength < 10) {
            this.Velocity.ZeroOut();
        }
        else if (velocityLength > 3000) // Hack
        {
            this.Velocity = Vector2.MultiplyN(new Vector2(this.Rotation, false), 600);
        }

        this._acceleration.ZeroOut();
        this.Forces.ZeroOut();

        var rotationIncrementor = percentOfSecond * ShipMovementController.ROTATE_SPEED,
            direction = new Vector2(this.Rotation, false),
            dragForce = Vector2.MultiplyN(Vector2.MultiplyV(Vector2.MultiplyN(this.Velocity, .5), this.Velocity.Abs()), ShipMovementController.DRAG_COEFFICIENT * ShipMovementController.DRAG_AREA * -1);

        if (this.Moving.RotatingLeft) {
            this.Rotation -= rotationIncrementor;
        }
        if (this.Moving.RotatingRight) {
            this.Rotation += rotationIncrementor;
        }
        if (this.Moving.Forward) {
            this.ApplyForce(Vector2.MultiplyN(direction, this.Power));
        }
        if (this.Moving.Backward) {
            this.ApplyForce(Vector2.MultiplyN(direction, this.Power * -1));
        }

        this.ApplyForce(dragForce);

        // Rounding so we doing do alpha transparency on the canvas
        this.Position.X = Math.round(this.Position.X);
        this.Position.Y = Math.round(this.Position.Y);
    }

    public Update(percentOfSecond: number, now: Date): void {
        this.Move(percentOfSecond, now);
        this.LastUpdated = now;
    }

    public UpdateMovementController(data): void {
        this.Forces.X = data.Forces.X;
        this.Forces.Y = data.Forces.Y;

        this.Mass = data.Mass;
        for (var i = ShipMovementController.MOVING_DIRECTIONS.length - 1; i >= 0; i--) {
            this.Moving[ShipMovementController.MOVING_DIRECTIONS[i]] = data.Moving[ShipMovementController.MOVING_DIRECTIONS[i]];
        }

        this.Position.X = data.Position.X;
        this.Position.Y = data.Position.Y;

        this.Rotation = data.Rotation;

        this.Velocity.X = data.Velocity.X;
        this.Velocity.Y = data.Velocity.Y;
    }
}