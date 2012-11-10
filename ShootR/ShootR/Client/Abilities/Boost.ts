/// <reference path="Abstractions/MovementAbility.ts" />
/// <reference path="../Collidable/MovementControllers/MovementController.ts" />
/// <reference path="../Utilities/ValueRef.ts" />

class Boost extends MovementAbility {    
    static NAME: string = "Boost";
    static SPEED_INCREASE: number = 3; // Updated by server configuration value
    static DURATION: number = 3; // Updated by server configuration value

    constructor (private _movementController: MovementController, public Controllable: ValueRef) {
        super(Boost.NAME, _movementController);
    }

    public Activate(): void {
        this.MultiplySpeedBy(Boost.SPEED_INCREASE);
        super.Activate();
        this.Controllable.Value = false;        
    }

    public Deactivate(): void {        
        this.ResetSpeed();
        super.Deactivate();
        this.Controllable.Value = true;
    }

    public Update(now: Date): void {
        if (this.Active && now.getTime() - this.ActivatedAt >= Boost.DURATION) {
            this.Deactivate();
        }
    }
}