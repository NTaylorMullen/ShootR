var Movement = (function () {
    function Movement(_from, _to, Direction, _originCrossOver) {
        this._from = _from;
        this._to = _to;
        this.Direction = Direction;
        this._originCrossOver = _originCrossOver;
        this.Active = false;
    }
    Movement.prototype.ValidMove = function (angle) {
        if(!this._originCrossOver) {
            return angle >= this._from && angle <= this._to;
        } else {
            return (angle >= this._to) || (angle <= this._from && angle >= 0);
        }
    };
    return Movement;
})();
var TouchController = (function () {
    function TouchController(_startMovement, _stopMovement, _stopAndStartMovement, _resetMovement, _shipFire) {
        this._startMovement = _startMovement;
        this._stopMovement = _stopMovement;
        this._stopAndStartMovement = _stopAndStartMovement;
        this._resetMovement = _resetMovement;
        this._shipFire = _shipFire;
        this.Forward = new Movement(20, 160, "Forward");
        this.Backward = new Movement(200, 340, "Backward");
        this.RotatingLeft = new Movement(125, 235, "RotatingLeft");
        this.RotatingRight = new Movement(55, 305, "RotatingRight", true);
        this.Enabled = true;
        this._mouseAdapter = new MouseAdapter(this, this.handleStart, this.handleMove, this.handleStop);
        this._touchAdapter = new TouchAdapter(this, this.handleStart, this.handleMove, this.handleStop);
        this._ieTouchAdapter = new IETouchAdapter(this, this.handleStart, this.handleMove, this.handleStop);
        this._canvas = document.getElementById("game");
        this._shootPosition = false;
        this._shootDrawStart = false;
        this._leftJoyStick = new JoyStick(TouchController.LENGTH_OFFSET, [
            this.Forward, 
            this.Backward
        ], this._startMovement, this._stopMovement, this._stopAndStartMovement, this._resetMovement) , this._rightJoyStick = new JoyStick(TouchController.LENGTH_OFFSET, [
            this.RotatingLeft, 
            this.RotatingRight
        ], this._startMovement, this._stopMovement, this._stopAndStartMovement, this._resetMovement);
    }
    TouchController.LENGTH_OFFSET = 22;
    TouchController.DRAW_SHOTS_FOR = 100;
    TouchController.prototype.handleStart = function (touch) {
        if(this.Enabled) {
            if(touch.clientX <= this._middle) {
                if(!this._leftJoyStick.InAction) {
                    this._leftJoyStick.TouchStart(touch);
                }
            } else {
                if(!this._rightJoyStick.InAction) {
                    this._rightJoyStick.TouchStart(touch);
                }
            }
        }
    };
    TouchController.prototype.handleMove = function (touch) {
        if(this.Enabled) {
            this._leftJoyStick.TouchMove(touch);
            this._rightJoyStick.TouchMove(touch);
        }
    };
    TouchController.prototype.handleStop = function (touch) {
        if(this.Enabled) {
            if((this._leftJoyStick.InAction && this._leftJoyStick.Traveled() < TouchController.LENGTH_OFFSET && this._leftJoyStick.TimeSinceTouch() <= 1000) || (this._rightJoyStick.InAction && this._rightJoyStick.Traveled() < TouchController.LENGTH_OFFSET && this._rightJoyStick.TimeSinceTouch() <= 1000)) {
                this._shootPosition = new Vector2(touch.clientX, touch.clientY);
                this._shootDrawStart = new Date().getTime();
                this._shipFire(this._shootDrawStart);
            }
            this._leftJoyStick.TouchStop(touch);
            this._rightJoyStick.TouchStop(touch);
        }
    };
    TouchController.prototype.Reset = function () {
        this.handleStop({
            identifier: this._leftJoyStick.TouchID
        });
        this.handleStop({
            identifier: this._rightJoyStick.TouchID
        });
    };
    TouchController.prototype.Initialize = function (screen) {
        var that = this;
        if(navigator.msPointerEnabled) {
            $(this._canvas).css("-ms-touch-action", "none");
            this._canvas.addEventListener('MSPointerDown', function (e) {
                that._ieTouchAdapter.Start(e);
            }, false);
            this._canvas.addEventListener('MSPointerMove', function (e) {
                that._ieTouchAdapter.Move(e);
            }, false);
            this._canvas.addEventListener('MSPointerUp', function (e) {
                that._ieTouchAdapter.Stop(e);
            }, false);
            this._canvas.addEventListener("MSPointerCancel", function (e) {
                e.preventDefault();
            }, false);
            this._canvas.addEventListener("MSGestureInit", function (e) {
                if(e.preventManipulation) {
                    e.preventManipulation();
                }
            }, false);
            this._canvas.addEventListener("MSHoldVisual", function (e) {
                e.preventDefault();
            }, false);
        } else {
            if('createTouch' in document) {
                this._canvas.addEventListener('touchstart', function (e) {
                    that._touchAdapter.Start(e);
                }, false);
                this._canvas.addEventListener('touchmove', function (e) {
                    that._touchAdapter.Move(e);
                }, false);
                this._canvas.addEventListener('touchend', function (e) {
                    that._touchAdapter.Stop(e);
                }, false);
            } else {
                this._canvas.addEventListener('mousedown', function (e) {
                    that._mouseAdapter.Start(e);
                }, false);
                this._canvas.addEventListener('mousemove', function (e) {
                    that._mouseAdapter.Move(e);
                }, false);
                this._canvas.addEventListener('mouseup', function (e) {
                    that._mouseAdapter.Stop(e);
                }, false);
            }
        }
        this._middle = screen.Viewport.Width / 2;
        $(screen).on("UpdateScreen", function () {
            that._middle = screen.Viewport.Width / 2;
        });
    };
    TouchController.prototype.Draw = function () {
        this._leftJoyStick.Draw();
        this._rightJoyStick.Draw();
        if(this._shootDrawStart !== false) {
            if(new Date().getTime() - this._shootDrawStart >= TouchController.DRAW_SHOTS_FOR) {
                this._shootDrawStart = false;
                this._shootPosition = false;
            } else {
                CanvasContext.drawCircle(this._shootPosition.X, this._shootPosition.Y, 40, 6, "#FA6400");
                CanvasContext.drawCircle(this._shootPosition.X, this._shootPosition.Y, 50, 2, "#FA6400");
            }
        }
    };
    return TouchController;
})();
//@ sourceMappingURL=TouchController.js.map
