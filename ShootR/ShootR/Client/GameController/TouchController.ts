/// <reference path="Adapters/IETouchAdapter.ts" />
/// <reference path="Adapters/MouseAdapter.ts" />
/// <reference path="Adapters/TouchAdapter.ts" />
/// <reference path="JoyStick.ts" />
/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="../Space/GameScreen.ts" />
/// <reference path="../Space/CanvasRenderer.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />

class Movement {
    public Active: bool;

    constructor (private _from: number, private _to: number, public Direction: string, private _originCrossOver?: bool) {
        this.Active = false;        
    }

    public ValidMove(angle: number): bool {
        if (!this._originCrossOver) {
            return angle >= this._from && angle <= this._to;
        }
        else {
            return (angle >= this._to) || (angle <= this._from && angle >= 0);
        }
    }
}

class TouchController {
    static LENGTH_OFFSET: number = 22;
    static DRAW_SHOTS_FOR: number = 100;

    public Forward: Movement = new Movement(20, 160, "Forward");
    public Backward: Movement = new Movement(200, 340, "Backward");
    public RotatingLeft: Movement = new Movement(125, 235, "RotatingLeft");
    public RotatingRight: Movement = new Movement(55, 305, "RotatingRight", true);
    public Enabled: bool = true;

    private _mouseAdapter: MouseAdapter;
    private _touchAdapter: TouchAdapter;
    private _ieTouchAdapter: IETouchAdapter;
    private _canvas: HTMLCanvasElement;
    private _shootPosition: any;
    private _shootDrawStart: any;
    private _middle: number;
    private _leftJoyStick: JoyStick;
    private _rightJoyStick: JoyStick;

    constructor (private _startMovement: Function, private _stopMovement: Function, private _stopAndStartMovement: Function, private _resetMovement: Function, private _shipFire: Function) {
        this._mouseAdapter = new MouseAdapter(this, this.handleStart, this.handleMove, this.handleStop);
        this._touchAdapter = new TouchAdapter(this, this.handleStart, this.handleMove, this.handleStop);
        this._ieTouchAdapter = new IETouchAdapter(this, this.handleStart, this.handleMove, this.handleStop);

        this._canvas = <HTMLCanvasElement>document.getElementById("game");
        this._shootPosition = false;
        this._shootDrawStart = false;

        this._leftJoyStick = new JoyStick(TouchController.LENGTH_OFFSET, [this.Forward, this.Backward], this._startMovement, this._stopMovement, this._stopAndStartMovement, this._resetMovement),
        this._rightJoyStick = new JoyStick(TouchController.LENGTH_OFFSET, [this.RotatingLeft, this.RotatingRight], this._startMovement, this._stopMovement, this._stopAndStartMovement, this._resetMovement);
    }

    private handleStart(touch: any): void {
        if (this.Enabled) {
            if (touch.clientX <= this._middle) { // leftJoyStick
                if (!this._leftJoyStick.InAction) {
                    this._leftJoyStick.TouchStart(touch);
                }
            }
            else { // Right side of the screen, so rotate or shoot
                if (!this._rightJoyStick.InAction) {
                    this._rightJoyStick.TouchStart(touch);                    
                }
            }
        }
    }

    private handleMove(touch: any): void {
        if (this.Enabled) {
            this._leftJoyStick.TouchMove(touch);
            this._rightJoyStick.TouchMove(touch);
        }
    }

    private handleStop(touch: any): void {
        if (this.Enabled) {
            // Check if we need to fire
            if ((this._leftJoyStick.InAction && this._leftJoyStick.Traveled() < TouchController.LENGTH_OFFSET && this._leftJoyStick.TimeSinceTouch() <= 1000) ||
                (this._rightJoyStick.InAction && this._rightJoyStick.Traveled() < TouchController.LENGTH_OFFSET && this._rightJoyStick.TimeSinceTouch() <= 1000)) {
                this._shootPosition = new Vector2(touch.clientX, touch.clientY);                    
                this._shootDrawStart = new Date().getTime();
                this._shipFire(this._shootDrawStart);
            }

            this._leftJoyStick.TouchStop(touch);
            this._rightJoyStick.TouchStop(touch);
        }
    }

    public Reset(): void {
        this.handleStop({ identifier: this._leftJoyStick.TouchID });
        this.handleStop({ identifier: this._rightJoyStick.TouchID });
    }

    public Initialize(screen: GameScreen): void {
        var that = this;

        if (navigator.msPointerEnabled) {
            // Setup the css on the game canvas
            $(this._canvas).css("-ms-touch-action", "none");

            // Initialize regular touch movements
            this._canvas.addEventListener('MSPointerDown', function (e: any) { that._ieTouchAdapter.Start(e); }, false);
            this._canvas.addEventListener('MSPointerMove', function (e: any) { that._ieTouchAdapter.Move(e); }, false);
            this._canvas.addEventListener('MSPointerUp', function (e: any) { that._ieTouchAdapter.Stop(e); }, false);

            // Initialize gesture touches
            this._canvas.addEventListener("MSPointerCancel", function (e: any) { e.preventDefault(); }, false);
            this._canvas.addEventListener("MSGestureInit", function (e: any) { if (e.preventManipulation) e.preventManipulation(); }, false);
            this._canvas.addEventListener("MSHoldVisual", function (e: any) { e.preventDefault(); }, false);
        }
        else if ('createTouch' in document) {
            this._canvas.addEventListener('touchstart', function (e: any) { that._touchAdapter.Start(e); }, false);
            this._canvas.addEventListener('touchmove', function (e: any) { that._touchAdapter.Move(e); }, false);
            this._canvas.addEventListener('touchend', function (e: any) { that._touchAdapter.Stop(e); }, false);
        }
        else {
            this._canvas.addEventListener('mousedown', function (e: any) { that._mouseAdapter.Start(e); }, false);
            this._canvas.addEventListener('mousemove', function (e: any) { that._mouseAdapter.Move(e); }, false);
            this._canvas.addEventListener('mouseup', function (e: any) { that._mouseAdapter.Stop(e); }, false);
        }   

        this._middle = screen.Viewport.Width / 2;

        $(screen).on("UpdateScreen", function () {
            that._middle = screen.Viewport.Width / 2;
        });
    }

    public Draw(): void {
        this._leftJoyStick.Draw();
        this._rightJoyStick.Draw();

        if (this._shootDrawStart !== false) {
            if (new Date().getTime() - this._shootDrawStart >= TouchController.DRAW_SHOTS_FOR) {
                this._shootDrawStart = false;
                this._shootPosition = false;
            }
            else {
                CanvasContext.drawCircle(this._shootPosition.X, this._shootPosition.Y, 40, 6, "#FA6400");
                CanvasContext.drawCircle(this._shootPosition.X, this._shootPosition.Y, 50, 2, "#FA6400");
            }
        }
    }
}