/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="IMoving.ts" />
/// <reference path="ShipInterpolationManager.ts" />

module ShootR {

    export class ShipMovementController extends eg.MovementControllers.MovementController {
        public static MASS: number = 50;
        public static ENGINE_POWER: number = 110000;
        public static DRAG_AREA: number = 5;
        public static DRAG_COEFFICIENT: number = .2;
        public static ROTATE_SPEED: number = Math.PI;
        public static MOVING_DIRECTIONS: string[] = ["RotatingLeft", "RotatingRight", "Forward", "Backward"];        

        public Moving: IMoving;
        public Mass: number;
        public Power: number;
        public Forces: eg.Vector2d;
        public Controllable: boolean;
        public UserControlled: boolean;
        private _acceleration: eg.Vector2d;        
        private _moveables: Array<eg.IMoveable>;
        private _interpolationManager: ShipInterpolationManager;

        constructor(movables: Array<eg.IMoveable>) {
            super(movables);

            this._moveables = movables;

            this.Mass = ShipMovementController.MASS;
            this.Power = ShipMovementController.ENGINE_POWER;
            this.Forces = eg.Vector2d.Zero;
            this.Controllable = true;
            this._acceleration = eg.Vector2d.Zero;

            this.Moving = {
                Forward: false,
                Backward: false,
                RotatingLeft: false,
                RotatingRight: false
            };

            this._interpolationManager = new ShipInterpolationManager(this);

            this.OnMove = new eg.EventHandler1<eg.MovementControllers.IMoveEvent>();
        }

        public OnMove: eg.EventHandler1<eg.MovementControllers.IMoveEvent>;

        public LoadPayload(payload: Server.IShipMovementControllerData, forceMovement?: boolean): void {
            if (!forceMovement) {
                this._interpolationManager.LoadPayload(payload);
            } else {
                this.Position = payload.Position;
                this.Rotation = payload.Rotation;
            }

            if (!this.UserControlled || forceMovement) {
                this.Mass = payload.Mass;
                this.Forces = payload.Forces;
                this.Velocity = payload.Velocity;
                this.Moving = payload.Moving;
            }
        }

        public IsMovingInDirection(direction: string): boolean {
            return this.Moving[direction] || false;
        }

        public StartMoving(direction: string): void {
            this.Move(direction, true);
        }

        public StopMoving(direction: string): void {
            this.Move(direction, false);
        }

        public StopAllMovement(): void {
            for (var i = ShipMovementController.MOVING_DIRECTIONS.length - 1; i >= 0; i--) {
                this.Moving[ShipMovementController.MOVING_DIRECTIONS[i]] = false;
            }
        }

        public ApplyForce(force: eg.Vector2d): void {
            this.Forces = this.Forces.Add(force);
        }

        public Update(gameTime: eg.GameTime): void {
            var rotationIncrementor: number,
                direction: eg.Vector2d = new eg.Vector2d(Math.cos(this.Rotation), Math.sin(this.Rotation)),
                dragForce: eg.Vector2d,
                velocityLength: number;

            this._interpolationManager.Update(gameTime);

            if (!this._interpolationManager.Interpolating) {
                this._acceleration = this.Forces.Divide(this.Mass);

                this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.Elapsed.Seconds).Add(this._acceleration.Multiply(gameTime.Elapsed.Seconds * gameTime.Elapsed.Seconds)));
                this.Velocity = this.Velocity.Add(this._acceleration.Multiply(gameTime.Elapsed.Seconds));
                velocityLength = this.Velocity.Length();

                // Stop moving if the "speed" is less than 10
                if (velocityLength < 10) {
                    this.Velocity = eg.Vector2d.Zero;
                } else if (velocityLength > 3000) // Hack
                {
                    this.Velocity = direction.Multiply(600);
                }

                this._acceleration = eg.Vector2d.Zero;
                this.Forces = eg.Vector2d.Zero;

                dragForce = this.Velocity.Multiply(.5).Multiply(this.Velocity.Abs()).Multiply(ShipMovementController.DRAG_COEFFICIENT * ShipMovementController.DRAG_AREA * -1);

                if (this.Moving.Forward) {
                    this.ApplyForce(direction.Multiply(this.Power));
                }
                if (this.Moving.Backward) {
                    this.ApplyForce(direction.Multiply(this.Power * -1));
                }

                this.ApplyForce(dragForce);

                rotationIncrementor = gameTime.Elapsed.Seconds * ShipMovementController.ROTATE_SPEED;

                if (this.Moving.RotatingLeft) {
                    this.Rotation -= rotationIncrementor;
                }
                if (this.Moving.RotatingRight) {
                    this.Rotation += rotationIncrementor;
                }                
            }

            for (var i = 0; i < this._moveables.length; i++) {
                this._moveables[i].Position = this.Position;
            }
        }

        public Move(direction: string, startMoving: boolean): void {
            if (this.Controllable) {
                if (typeof this.Moving[direction] !== "undefined") {
                    this.Moving[direction] = startMoving;
                    this.OnMove.Trigger(<eg.MovementControllers.IMoveEvent>{
                        Direction: direction,
                        StartMoving: startMoving
                    });
                }
                else {
                    throw new Error(direction + " is an unknown direction.");
                }
            }
        }

        public Dispose(): void {
            // Make all active functions no-op
            this.Update = () => { };
            this.LoadPayload = () => { };
        }
    }

}