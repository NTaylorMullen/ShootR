/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="IMoving.ts" />

module ShootR {

    export class ShipMovementController extends eg.MovementControllers.MovementController {
        public static MASS: number = 50;
        public static ENGINE_POWER: number = 110000;
        public static DRAG_AREA: number = 5;
        public static DRAG_COEFFICIENT: number = .2;
        public static ROTATE_SPEED: number = Math.PI;
        public static MOVING_DIRECTIONS: string[] = ["RotatingLeft", "RotatingRight", "Forward", "Backward"];
        public static INTERPOLATE_POSITION_THRESHOLD: number = 10;
        public static INTERPOLATE_ROTATION_THRESHOLD: number = 15;

        public Moving: IMoving;
        public Mass: number;
        public Power: number;
        public Forces: eg.Vector2d;
        private _acceleration: eg.Vector2d;        
        private _moveables: Array<eg.IMoveable>;

        constructor(movables: Array<eg.IMoveable>) {
            super(movables);

            this._moveables = movables;

            this.Mass = ShipMovementController.MASS;
            this.Power = ShipMovementController.ENGINE_POWER;
            this.Forces = eg.Vector2d.Zero;
            this._acceleration = eg.Vector2d.Zero;

            this.Moving = {
                Forward: false,
                Backward: false,
                RotatingLeft: false,
                RotatingRight: false
            };

            this.OnMove = new eg.EventHandler1<eg.MovementControllers.IMoveEvent>();
        }

        public OnMove: eg.EventHandler1<eg.MovementControllers.IMoveEvent>;

        public LoadPayload(payload: Server.IShipMovementControllerData): void {
            this.Rotation = payload.Rotation * .0174532925;
            this.Mass = payload.Mass;
            this.Forces = payload.Forces;
            this.Velocity = payload.Velocity;
            this.Position = payload.Position.Add(Ship.SIZE.Multiply(.5));
            this.Moving = payload.Moving;
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
            var clientPositionPrediction: eg.Vector2d,
                rotationIncrementor: number,
                direction: eg.Vector2d = new eg.Vector2d(Math.cos(this.Rotation), Math.sin(this.Rotation)),
                dragForce: eg.Vector2d,
                velocityLength: number;

            this._acceleration = this.Forces.Divide(this.Mass);

            clientPositionPrediction = this.Velocity.Multiply(gameTime.Elapsed.Seconds).Add(this._acceleration.Multiply(gameTime.Elapsed.Seconds * gameTime.Elapsed.Seconds));
            this.Position = this.Position.Add(clientPositionPrediction);

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

            rotationIncrementor = gameTime.Elapsed.Seconds * ShipMovementController.ROTATE_SPEED;
            dragForce = this.Velocity.Multiply(.5).Multiply(this.Velocity.Abs()).Multiply(ShipMovementController.DRAG_COEFFICIENT * ShipMovementController.DRAG_AREA * -1);

            if (this.Moving.RotatingLeft) {
                this.Rotation -= rotationIncrementor;
            }
            if (this.Moving.RotatingRight) {
                this.Rotation += rotationIncrementor;
            }
            if (this.Moving.Forward) {
                this.ApplyForce(direction.Multiply(this.Power));
            }
            if (this.Moving.Backward) {
                this.ApplyForce(direction.Multiply(this.Power * -1));
            }

            this.ApplyForce(dragForce);

            for (var i = 0; i < this._moveables.length; i++) {
                this._moveables[i].Position = this.Position;

                if (this._moveables[i] instanceof eg.Graphics.Graphic2d) {
                    this._moveables[i].Rotation = this.Rotation;
                }
            }
        }

        public Move(direction: string, startMoving: boolean): void {
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

}