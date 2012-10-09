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

    that.Traveled = function () {
        return CalculateLength(that.Position, that.PositionStart);
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
        if (that.Traveled() > ActiveJoystickDistance) {
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
            if (that.TimeSinceTouch() > 1000 || that.Traveled() >= ActiveJoystickDistance) {
                CanvasContext.drawCircle(that.PositionStart.X, that.PositionStart.Y, 40, 5, "#1BFF27");
                CanvasContext.drawCircle(that.PositionStart.X, that.PositionStart.Y, 60, 2, "#1BFF27");
                CanvasContext.drawCircle(that.Position.X, that.Position.Y, 40, 2, "#2EBD15");
                CanvasContext.drawLine(that.PositionStart.X, that.PositionStart.Y, that.Position.X, that.Position.Y, 2, "#4A993C");
            }
        }
    }
}

JoyStick.prototype.topOffset = HeightOffset($("#shipStats"));