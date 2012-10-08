function Movement(from, to, dir, originCrossOver) {
    var that = this;

    that.ValidMove = function (angle) {
        if (!originCrossOver) {
            return angle >= from && angle <= to;
        }
        else {
            return (angle >= to) || (angle <= from && angle >= 0);
        }
    }

    that.Direction = dir;
    that.Active = false;
};

function JoyStick(ActiveJoystickDistance, MovementList, StartMovement, StopMovement, StopAndStartMovement, ResetMovement) {
    var that = this,
        controlling = false;

    that.touchID = false;

    that.PositionStart = {
        X: 0,
        Y: 0
    };

    that.Position = {
        X: 0,
        Y: 0
    };

    that.InAction = false;

    that.InActionAt = false;

    that.TimeSinceTouch = function () {
        if (that.InActionAt) {
            return new Date().getTime() - that.InActionAt;
        }

        return false;
    }

    that.TouchStart = function (touch) {
        if (that.touchID === false) {
            that.InActionAt = new Date().getTime();
            that.InAction = true;
            that.PositionStart.X = touch.clientX;
            that.PositionStart.Y = touch.clientY - that.topOffset;
            that.touchID = touch.identifier;
            that.Position = $.extend({}, that.PositionStart);
        }
    }

    that.TouchMove = function (touch) {
        if (that.touchID === touch.identifier) {
            that.Position.X = touch.clientX;
            that.Position.Y = touch.clientY - that.topOffset;

            var changes = GetAlteredMovements();

            if (changes) {
                if (changes.changed) {
                    MoveShip(changes.toStop, changes.toStart);
                }
            }
            else { // Need to reset movement
                PerformReset();
            }

            return true;
        }

        return false;
    }

    that.TouchStop = function (touch) {
        if (that.touchID === touch.identifier) {
            that.InAction = false;
            that.touchID = false;
            that.InActionAt = false;

            PerformReset();

            return true;
        }

        return false;
    }

    function GetAlteredMovements() {
        if (CalculateLength(that.Position, that.PositionStart) > ActiveJoystickDistance) {
            controlling = true;
            var deltas = SubtractVectors(that.PositionStart, that.Position),
                angle = Math.atan2(deltas.Y, deltas.X) * -180 / Math.PI;

            if (angle < 0) {
                angle += 360;
            }

            var toStop, toStart, changed = false;

            for (var i = 0; i < MovementList.length; i++) {
                var validMove = MovementList[i].ValidMove(angle);

                // This is a change
                if (!validMove && MovementList[i].Active) {
                    changed = true;
                    toStop = MovementList[i];
                }
                else if (validMove && !MovementList[i].Active) {
                    changed = true;
                    toStart = MovementList[i];
                }
            }

            return { changed: changed, toStart: toStart, toStop: toStop };
        }
        else {
            return false; // Need to reset movement
        }
    }

    function MoveShip(toStop, toStart) {
        // Need to perform a server update
        if (toStop || toStart) {
            // Need to do a startandstop
            if (toStop && toStart) {
                toStop.Active = false;
                toStart.Active = true;
                StopAndStartMovement(toStop.Direction, toStart.Direction);
            }
            else if (toStop) {
                toStop.Active = false;
                StopMovement(toStop.Direction);
            }
            else if (toStart) {
                toStart.Active = true;
                StartMovement(toStart.Direction);
            }
        }
    }

    function PerformReset() {
        if (controlling) {
            controlling = false;
            var arr = [];

            for (var i = 0; i < MovementList.length; i++) {
                MovementList[i].Active = false;
                arr.push(MovementList[i].Direction);
            }            

            ResetMovement(arr);
        }
    }

    that.Draw = function () {
        if (that.InAction) {
            CanvasContext.drawCircle(that.PositionStart.X, that.PositionStart.Y, 40, 5, "#1BFF27");
            CanvasContext.drawCircle(that.PositionStart.X, that.PositionStart.Y, 60, 2, "#1BFF27");
            CanvasContext.drawCircle(that.Position.X, that.Position.Y, 40, 2, "#2EBD15");
            CanvasContext.drawLine(that.PositionStart.X, that.PositionStart.Y, that.Position.X, that.Position.Y, 2, "#4A993C");
        }
    }
}

JoyStick.prototype.topOffset = HeightOffset($("#shipStats"));

function TouchController(StartMovement, StopMovement, StopAndStartMovement, ResetMovement, ShipFire) {
    var that = this,
        canvas = document.getElementById("game"),
        tapID = false,
        shootPosition = false,
        shootDrawStart = false,
        topOffset = HeightOffset($("#shipStats")),
        lengthOffset = 30;

    var Forward = new Movement(20, 160, "Forward"),
        Backward = new Movement(200, 340, "Backward"),
        RotatingLeft = new Movement(125, 235, "RotatingLeft"),
        RotatingRight = new Movement(55, 305, "RotatingRight", true);

    var leftJoyStick = new JoyStick(lengthOffset, [Forward, Backward], StartMovement, StopMovement, StopAndStartMovement, ResetMovement),
        rightJoyStick = new JoyStick(lengthOffset, [RotatingLeft, RotatingRight], StartMovement, StopMovement, StopAndStartMovement, ResetMovement);

    function HandleStart(touch) {
        if (that.Enabled) {
            if (touch.clientX <= middle) { // leftJoyStick
                if (!leftJoyStick.InAction) {
                    leftJoyStick.TouchStart(touch);
                }
            }
            else { // Right side of the screen, so rotate or shoot
                if (!rightJoyStick.InAction) {
                    tapID = touch.identifier;
                    delay(function () {
                        // Was tap
                        if (tapID === true) {
                            tapID = false;

                            shootPosition = {
                                X: touch.clientX,
                                Y: touch.clientY - topOffset
                            };
                            shootDrawStart = new Date().getTime();
                            ShipFire();
                        }
                        else {
                            rightJoyStick.TouchStart(touch);
                        }                        
                    }, 150);                    
                }
            }
        }
    }

    function HandleMove(touch) {
        if (that.Enabled) {
            leftJoyStick.TouchMove(touch);
            rightJoyStick.TouchMove(touch);
        }
    }

    function HandleStop(touch) {
        if (that.Enabled) {
            leftJoyStick.TouchStop(touch);
            rightJoyStick.TouchStop(touch);

            if (tapID !== false) {
                tapID = true;
            }
        }
    }

    function TouchStart(e) {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            HandleStart(touch);
        }
    }

    function TouchMove(e) {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            HandleMove(touch);
        }
    }

    function TouchEnd(e) {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            HandleStop(touch)
        }
    }

    var mouseGUIDS = 0,
        currentGUID = 0;

    function MouseDown(e) {
        e.preventDefault();

        var touch = e;

        e.identifier = currentGUID = mouseGUIDS++;
        HandleStart(e);
    }

    function MouseMove(e) {
        e.preventDefault();

        var touch = e;

        e.identifier = currentGUID;
        HandleMove(e);
    }

    function MouseUp(e) {
        e.preventDefault();

        var touch = e;

        e.identifier = currentGUID;
        HandleStop(e);
    }

    that.Enabled = true;

    that.Initialize = function (screen) {
        canvas.addEventListener('touchstart', TouchStart, false);
        canvas.addEventListener('touchmove', TouchMove, false);
        canvas.addEventListener('touchend', TouchEnd, false);

        canvas.addEventListener('mousedown', MouseDown, false);
        canvas.addEventListener('mousemove', MouseMove, false);
        canvas.addEventListener('mouseup', MouseUp, false);

        middle = screen.Viewport.Width / 2;

        $(screen).on("UpdateScreen", function () {
            middle = screen.Viewport.Width / 2;
        });
    }

    that.Draw = function () {
        leftJoyStick.Draw();
        rightJoyStick.Draw();

        if (shootDrawStart !== false) {
            if (new Date().getTime() - shootDrawStart >= 100) {
                shootDrawStart = false;
                shootPosition = false;
            }
            else {
                CanvasContext.drawCircle(shootPosition.X, shootPosition.Y, 40, 6, "#FA6400");
                CanvasContext.drawCircle(shootPosition.X, shootPosition.Y, 50, 2, "#FA6400");
            }
        }
    }
}