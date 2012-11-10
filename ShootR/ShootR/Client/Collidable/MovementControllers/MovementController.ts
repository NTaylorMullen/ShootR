/// <reference path="../../Utilities/Vector2.ts" />
/// <reference path="../../Space/Map.ts" />

class MovementController {
    public Position: Vector2;
    public Mass: number;
    public Power: number;
    public Velocity: Vector2;
    public Forces: Vector2;
    public Rotation: number;
    public LastUpdated: Date;

    constructor (first: any, second: number, third?: number) {
        // (position, mass, power)
        if (typeof first == "object") {
            this.Position = first;
            this.Mass = second;
            this.Power = third;
        }
        else { // (mass, power)
            this.Position = Vector2.Zero();
            this.Mass = first;
            this.Power = second;
        }

        this.Velocity = Vector2.Zero();
        this.Forces = Vector2.Zero();
        this.Rotation = 0;
        this.LastUpdated = new Date();
    }

    public ApplyForce(force: Vector2): void {
        this.Forces.AddV(force);
    }

    public RepositionInBounds(objectWidth: number, objectHeight: number): void {
        // Re-position to be in-bounds
        if (this.Position.X < 0) {
            this.Position.X = 0;
        }
        else if (this.Position.X + objectWidth > Map.WIDTH) {
            this.Position.X = Map.WIDTH - objectWidth;
        }

        if (this.Position.Y < 0) {
            this.Position.Y = 0;
        }
        else if (this.Position.Y + objectHeight > Map.HEIGHT) {
            this.Position.Y = Map.HEIGHT - objectHeight;
        }
    }

    public Update(percentOfSecond: number, now: Date): void {
        // Rounding so we doing do alpha transparency on the canvas
        this.Position.ApplyFunction(Math.round);

        this.LastUpdated = now;
    }

    public UpdateMovementController(data: any): void {
        this.Forces.X = data.Forces.X;
        this.Forces.Y = data.Forces.Y;

        this.Mass = data.Mass;

        this.Position.X = data.Position.X;
        this.Position.Y = data.Position.Y;

        this.Rotation = data.Rotation;

        this.Velocity.X = data.Velocity.X;
        this.Velocity.Y = data.Velocity.Y;
    }
}