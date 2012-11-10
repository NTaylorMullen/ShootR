var JoyStick = (function () {
    function JoyStick(_activeJoystickDistance, _movementList, _startMovement, _stopMovement, _stopAndStartMovement, _resetMovement) {
        this._activeJoystickDistance = _activeJoystickDistance;
        this._movementList = _movementList;
        this._startMovement = _startMovement;
        this._stopMovement = _stopMovement;
        this._stopAndStartMovement = _stopAndStartMovement;
        this._resetMovement = _resetMovement;
        this._controlling = false;
        this.TouchID = false;
        this.PositionStart = Vector2.Zero();
        this.Position = Vector2.Zero();
        this.InAction = false;
        this.InActionAt = false;
    }
    JoyStick.prototype.getAlteredMovements = function () {
        if(this.Traveled() > this._activeJoystickDistance) {
            this._controlling = true;
            var deltas = Vector2.SubtractV(this.Position, this.PositionStart);
            var angle = Math.atan2(deltas.Y, deltas.X) * -180 / Math.PI;

            if(angle < 0) {
                angle += 360;
            }
            var toStop;
            var toStart;
            var changed = false;

            for(var i = 0; i < this._movementList.length; i++) {
                var validMove = this._movementList[i].ValidMove(angle);
                if(!validMove && this._movementList[i].Active) {
                    changed = true;
                    toStop = this._movementList[i];
                } else {
                    if(validMove && !this._movementList[i].Active) {
                        changed = true;
                        toStart = this._movementList[i];
                    }
                }
            }
            return {
                changed: changed,
                toStart: toStart,
                toStop: toStop
            };
        } else {
            return false;
        }
    };
    JoyStick.prototype.moveShip = function (toStop, toStart) {
        if(toStop || toStart) {
            if(toStop && toStart) {
                toStop.Active = false;
                toStart.Active = true;
                this._stopAndStartMovement(toStop.Direction, toStart.Direction);
            } else {
                if(toStop) {
                    toStop.Active = false;
                    this._stopMovement(toStop.Direction);
                } else {
                    if(toStart) {
                        toStart.Active = true;
                        this._startMovement(toStart.Direction);
                    }
                }
            }
        }
    };
    JoyStick.prototype.performReset = function () {
        if(this._controlling) {
            this._controlling = false;
            var arr = [];
            for(var i = 0; i < this._movementList.length; i++) {
                this._movementList[i].Active = false;
                arr.push(this._movementList[i].Direction);
            }
            this._resetMovement(arr);
        }
    };
    JoyStick.prototype.TimeSinceTouch = function () {
        if(this.InActionAt) {
            return new Date().getTime() - this.InActionAt;
        }
        return false;
    };
    JoyStick.prototype.Traveled = function () {
        return CalculateLength(this.Position, this.PositionStart);
    };
    JoyStick.prototype.TouchStart = function (touch) {
        if(this.TouchID === false) {
            this.InActionAt = new Date().getTime();
            this.InAction = true;
            this.PositionStart.X = touch.clientX;
            this.PositionStart.Y = touch.clientY;
            this.TouchID = touch.identifier;
            this.Position = this.PositionStart.Clone();
        }
    };
    JoyStick.prototype.TouchMove = function (touch) {
        if(this.TouchID === touch.identifier) {
            this.Position.X = touch.clientX;
            this.Position.Y = touch.clientY;
            var changes = this.getAlteredMovements();
            if(changes) {
                if(changes.changed) {
                    this.moveShip(changes.toStop, changes.toStart);
                }
            } else {
                this.performReset();
            }
            return true;
        }
        return false;
    };
    JoyStick.prototype.TouchStop = function (touch) {
        if(this.TouchID === touch.identifier) {
            this.InAction = false;
            this.TouchID = false;
            this.InActionAt = false;
            this.performReset();
            return true;
        }
        return false;
    };
    JoyStick.prototype.Draw = function () {
        if(this.InAction) {
            if(this.TimeSinceTouch() > 1000 || this.Traveled() >= this._activeJoystickDistance) {
                CanvasContext.drawCircle(this.PositionStart.X, this.PositionStart.Y, 40, 5, "#1BFF27");
                CanvasContext.drawCircle(this.PositionStart.X, this.PositionStart.Y, 60, 2, "#1BFF27");
                CanvasContext.drawCircle(this.Position.X, this.Position.Y, 40, 2, "#2EBD15");
                CanvasContext.drawLine(this.PositionStart.X, this.PositionStart.Y, this.Position.X, this.Position.Y, 2, "#4A993C");
            }
        }
    };
    return JoyStick;
})();
//@ sourceMappingURL=JoyStick.js.map
