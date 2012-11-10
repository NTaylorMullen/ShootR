/// <reference path="TouchController.ts" />

class JoyStick {
    private _controlling: bool;

    public TouchID: any;
    public PositionStart: Vector2;
    public Position: Vector2;
    public InAction: bool;
    public InActionAt: any;

    constructor (private _activeJoystickDistance: number, private _movementList: Movement[], private _startMovement: Function, private _stopMovement: Function, private _stopAndStartMovement: Function, private _resetMovement: Function) {
        this._controlling = false;
        this.TouchID = false;
        this.PositionStart = Vector2.Zero();
        this.Position = Vector2.Zero();
        this.InAction = false;
        this.InActionAt = false;
    }
    
    private getAlteredMovements(): any {
        if (this.Traveled() > this._activeJoystickDistance) {
            this._controlling = true;
            var deltas: Vector2 = Vector2.SubtractV(this.Position, this.PositionStart),
                angle: number = Math.atan2(deltas.Y, deltas.X) * -180 / Math.PI;

            if (angle < 0) {
                angle += 360;
            }

            var toStop: Movement, 
                toStart: Movement, 
                changed: bool = false;

            for (var i = 0; i < this._movementList.length; i++) {
                var validMove: bool = this._movementList[i].ValidMove(angle);

                // This is a change
                if (!validMove && this._movementList[i].Active) {
                    changed = true;
                    toStop = this._movementList[i];
                }
                else if (validMove && !this._movementList[i].Active) {
                    changed = true;
                    toStart = this._movementList[i];
                }
            }

            return { changed: changed, toStart: toStart, toStop: toStop };
        }
        else {
            return false; // Need to reset movement
        }
    }

    private moveShip(toStop: Movement, toStart: Movement): void {
        // Need to perform a server update
        if (toStop || toStart) {
            // Need to do a startandstop
            if (toStop && toStart) {
                toStop.Active = false;
                toStart.Active = true;
                this._stopAndStartMovement(toStop.Direction, toStart.Direction);
            }
            else if (toStop) {
                toStop.Active = false;
                this._stopMovement(toStop.Direction);
            }
            else if (toStart) {
                toStart.Active = true;
                this._startMovement(toStart.Direction);
            }
        }
    }

    private performReset(): void {
        if (this._controlling) {
            this._controlling = false;
            var arr: string[] = [];

            for (var i = 0; i < this._movementList.length; i++) {
                this._movementList[i].Active = false;
                arr.push(this._movementList[i].Direction);
            }

            this._resetMovement(arr);
        }
    }

    public TimeSinceTouch(): any {
        if (this.InActionAt) {
            return new Date().getTime() - this.InActionAt;
        }

        return false;
    }

    public Traveled(): number {
        return CalculateLength(this.Position, this.PositionStart);
    }

    public TouchStart(touch: any): void {
        if (this.TouchID === false) {
            this.InActionAt = new Date().getTime();
            this.InAction = true;
            this.PositionStart.X = touch.clientX;
            this.PositionStart.Y = touch.clientY;
            this.TouchID = touch.identifier;
            this.Position = this.PositionStart.Clone();
        }
    }

    public TouchMove(touch: any): bool {
        if (this.TouchID === touch.identifier) {
            this.Position.X = touch.clientX;
            this.Position.Y = touch.clientY;

            var changes = this.getAlteredMovements();

            if (changes) {
                if (changes.changed) {
                    this.moveShip(changes.toStop, changes.toStart);
                }
            }
            else { // Need to reset movement
                this.performReset();
            }

            return true;
        }

        return false;
    }

    public TouchStop(touch: any): bool {
        if (this.TouchID === touch.identifier) {
            this.InAction = false;
            this.TouchID = false;
            this.InActionAt = false;

            this.performReset();

            return true;
        }

        return false;
    }

    public Draw(): void {
        if (this.InAction) {
            if (this.TimeSinceTouch() > 1000 || this.Traveled() >= this._activeJoystickDistance) {
                CanvasContext.drawCircle(this.PositionStart.X, this.PositionStart.Y, 40, 5, "#1BFF27");
                CanvasContext.drawCircle(this.PositionStart.X, this.PositionStart.Y, 60, 2, "#1BFF27");
                CanvasContext.drawCircle(this.Position.X, this.Position.Y, 40, 2, "#2EBD15");
                CanvasContext.drawLine(this.PositionStart.X, this.PositionStart.Y, this.Position.X, this.Position.Y, 2, "#4A993C");
            }
        }
    }
}