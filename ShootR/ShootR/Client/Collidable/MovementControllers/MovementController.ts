/// <referene path="../../Utilities/Vector2.ts" />
/// <reference path="../../Interfaces/PayloadDefinitions.d.ts" />

declare var Map; // For some reason the compiler barfs if I include the Map.ts file

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
        this.LastUpdated = now;
    }

    public UpdateMovementController(data: IMovementControllerData): void {
        for (var key in data) {
            this[key] = data[key];
        };
    }
}