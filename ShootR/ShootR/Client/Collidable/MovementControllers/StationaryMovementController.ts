/// <reference path="MovementController.ts" />
/// <reference path="../../Utilities/Vector2.ts" />
/// <reference path="../../Interfaces/PayloadDefinitions.d.ts" />

class StationaryMovementController extends MovementController {
    constructor (position: Vector2) {
        super(position, 0, 0);
    }

    public UpdateMovementController(data: IMovementControllerData): void {
        // Empty so we don't waste execution time updating the movement controller
    }
}