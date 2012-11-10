/// <reference path="../Collidable/MovementControllers/MovementController.ts" />

class BulletMovementController extends MovementController {
    static MAX_SPEED: number = 1100; // Updated from server configuration value
    static MASS: number = 800;

    constructor () {
        super(BulletMovementController.MASS, BulletMovementController.MAX_SPEED);
    }

    public Move(percentOfSecond: number): void {
        var incrementor = Vector2.MultiplyN(this.Velocity, percentOfSecond);

        this.Position.AddV(incrementor);
    }

    public Update(percentOfSecond: number, now: Date): void {
        this.Move(percentOfSecond);
        super.Update(percentOfSecond, now);
    }
}