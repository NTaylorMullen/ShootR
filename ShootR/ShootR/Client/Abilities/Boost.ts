/// <reference path="Abstractions/MovementAbility.ts" />

class Boost extends MovementAbility {    
    static NAME: string = "Boost";
    static BOOST_SPEED_INCREASE: number = 3; // Updated by server configuration value
    static BOOST_DURATION: number = 3; // Updated by server configuration value

    constructor (private movementController: any, private Controllable: any) {
        super(Boost.NAME, movementController);
    }

    public Activate(): void {
        this.MultiplySpeedBy(Boost.BOOST_SPEED_INCREASE);
        super.Activate();
        this.Controllable.Value = false;        
    }

    public Deactivate(): void {
        
        this.ResetSpeed();
        super.Deactivate();
        this.Controllable.Value = true;
    }

    public Update(now: Date): void {
        if (this.Active && now.getTime() - this.ActivatedAt >= Boost.BOOST_DURATION) {
            this.Deactivate();
        }
    }
}