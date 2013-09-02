/// <reference path="Ship.ts" />
/// <reference path="ShipMovementController.ts" />
/// <reference path="../Utilities/LatencyResolver.ts" />
/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="../Utilities/UtilityFunctions.ts" />
/// <reference path="../GameController/TouchController.ts" />
/// <reference path="../Space/GameScreen.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShipController = (function (_super) {
    __extends(ShipController, _super);
    function ShipController(rotateLeft, forward, rotateRight, backward, fire, connection) {
        _super.call(this);
        this.fire = fire;
        this.connection = connection;
        this.TryInterpolate = true;
        this.TryInterpolateRotation = false;
        this._movementCount = 0;
        this._commandList = [];
        this._currentCommand = 0;
        this._wasDead = false;

        this._keyMapping = [];
        this._keyMapping.push({ key: rotateLeft, dir: "RotatingLeft" });
        this._keyMapping.push({ key: rotateRight, dir: "RotatingRight" });
        this._keyMapping.push({ key: forward, dir: "Forward" });
        this._keyMapping.push({ key: backward, dir: "Backward" });

        this.LifeController.Health = this.MaxLife;

        // Initiate Interpollation
        this.MovementController.Smoothing = {
            X: false,
            Y: false
        };

        this.MovementController.Target = Vector2.Zero();
        this.MovementController.InterpolateOver = Vector2.Zero();
        this.MovementController.InterpolateRotationOver = 0;
        this.MovementController.SmoothingRotation = false;
        this.MovementController.TargetRotation = 0;
    }
    ShipController.prototype.registerPayload = function () {
        // Calculate how often we receive payloads so we can interpolate between them
        var now = new Date().getTime();
        if (this._lastPayloadReceivedAt) {
            this._payloadsEvery = now - this._lastPayloadReceivedAt;
        }

        this._lastPayloadReceivedAt = now;
    };

    ShipController.prototype.checkInterpolation = function (serverShip, axis, distance) {
        if (distance[axis] > ShipMovementController.INTERPOLATE_POSITION_THRESHOLD) {
            this.MovementController.InterpolateOver[axis] = Math.max(this._payloadsEvery, 50);
            this.MovementController.Smoothing[axis] = true;
            this.MovementController.Target[axis] = serverShip.MovementController.Position[axis];
            serverShip.MovementController.Position[axis] = this.MovementController.Position[axis];
        }
    };

    ShipController.prototype.checkRotationInterpolation = function (serverShip) {
        var rotationDistance = Math.abs(this.MovementController.Rotation - serverShip.MovementController.Rotation);

        if (rotationDistance > ShipMovementController.INTERPOLATE_ROTATION_THRESHOLD) {
            this.MovementController.InterpolateRotationOver = Math.max(this._payloadsEvery, 35);
            this.MovementController.SmoothingRotation = true;
            this.MovementController.TargetRotation = serverShip.MovementController.Rotation;
            serverShip.MovementController.Rotation = this.MovementController.Rotation;
        }
    };

    ShipController.prototype.determineInterpolation = function (serverShip) {
        if (this._payloadsEvery) {
            if (!this.LifeController.Alive) {
                this.MovementController.Smoothing.X = false;
                this.MovementController.Smoothing.Y = false;
                this._wasDead = true;
            }

            if (!this._wasDead) {
                if (this.TryInterpolate) {
                    _super.prototype.Update.call(this, null);
                    var distance = CalculateDistance(this.MovementController.Position, serverShip.MovementController.Position);

                    this.checkInterpolation(serverShip, "X", distance);
                    this.checkInterpolation(serverShip, "Y", distance);
                }

                if (this.TryInterpolateRotation) {
                    this.checkRotationInterpolation(serverShip);
                }
            }

            if (this.LifeController.Alive) {
                this._wasDead = false;
            }
        }
    };

    ShipController.prototype.doubleTap = function (dir) {
        if (dir === "Forward") {
            this.startAbility("Boost");
            return true;
        }

        return false;
    };

    ShipController.prototype.startAbility = function (name) {
        if (this.Controllable.Value && this.ShipAbilityHandler.Activate(name) && this.LifeController.Alive) {
            this._commandList.push([++this._currentCommand, name, true, true]);
            this.connection.server.registerAbilityStart(name, false, this._currentCommand);

            this.UpdateFromSecond(CalculatePOS(this.LastUpdated));
        }
    };

    ShipController.prototype.stopAbility = function (name) {
        if (this.Controllable.Value && this.ShipAbilityHandler.Deactivate(name) && this.LifeController.Alive) {
            var pingBack = false;

            this._commandList.push([++this._currentCommand, name, false, true]);
            this.connection.server.registerAbilityStop(name, false, this._currentCommand);

            this.UpdateFromSecond(CalculatePOS(this.LastUpdated));
        }
    };

    ShipController.prototype.startMovement = function (dir) {
        if (this.Controllable.Value && !this.MovementController.Moving[dir] && this.LifeController.Alive) {
            var pingBack = false, now = new Date().getTime();

            this._movementCount = ++this._movementCount % ShipController.REQUEST_PING_EVERY;

            if (this._movementCount === 0) {
                pingBack = true;
                this.LatencyResolver.RequestedPingBack();
            }

            var successfulDoubleTap = false;

            if (now - this._lastCommandStartAt <= ShipController.DOUBLE_TAP_AFTER && this._lastCommandStart === dir) {
                successfulDoubleTap = this.doubleTap(dir);
            }

            if (!successfulDoubleTap) {
                this._lastCommandStartAt = now;
                this._lastCommandStart = dir;

                this._commandList.push([++this._currentCommand, dir, true]);
                this.connection.server.registerMoveStart(dir, pingBack, this._currentCommand);

                this.UpdateFromSecond(CalculatePOS(this.LastUpdated));
            }

            this.MovementController.Moving[dir] = true;
        }
    };

    ShipController.prototype.stopMovement = function (dir) {
        if (this.Controllable.Value && this.LifeController.Alive) {
            var pingBack = false;
            this._movementCount = ++this._movementCount % ShipController.REQUEST_PING_EVERY;

            if (this._movementCount === 0) {
                pingBack = true;
                this.LatencyResolver.RequestedPingBack();
            }
            this._commandList.push([++this._currentCommand, dir, false]);
            this.connection.server.registerMoveStop(dir, pingBack, this._currentCommand);

            this.UpdateFromSecond(CalculatePOS(this.LastUpdated));
            this.MovementController.Moving[dir] = false;
        }
    };

    ShipController.prototype.stopAndStartMovement = function (toStop, toStart) {
        if (this.Controllable.Value && this.LifeController.Alive) {
            var pingBack = false, now = new Date().getTime();

            this._movementCount = ++this._movementCount % ShipController.REQUEST_PING_EVERY;

            if (this._movementCount === 0) {
                pingBack = true;
                this.LatencyResolver.RequestedPingBack();
            }

            var successfulDoubleTap = false;

            if (now - this._lastCommandStartAt <= ShipController.DOUBLE_TAP_AFTER && this._lastCommandStart === toStart) {
                successfulDoubleTap = this.doubleTap(toStart);
            }

            if (!successfulDoubleTap) {
                this._lastCommandStartAt = now;
                this._lastCommandStart = toStart;

                this._commandList.push([++this._currentCommand, toStop, false]);
                this._commandList.push([++this._currentCommand, toStart, true]);

                this.connection.server.startAndStopMovement(toStop, toStart, pingBack, this._currentCommand);

                this.UpdateFromSecond(CalculatePOS(this.LastUpdated));
                this.MovementController.Moving[toStop] = false;
                this.MovementController.Moving[toStart] = true;
            }
        }
    };

    ShipController.prototype.resetMovement = function (MovementList) {
        if (this.Controllable.Value && this.LifeController.Alive) {
            var pingBack = false;
            this._movementCount = ++this._movementCount % ShipController.REQUEST_PING_EVERY;

            if (this._movementCount === 0) {
                pingBack = true;
            }

            this.UpdateFromSecond(CalculatePOS(this.LastUpdated));

            for (var i = 0; i < MovementList.length; i++) {
                this.MovementController.Moving[MovementList[i]] = false;
                this._commandList.push([++this._currentCommand, MovementList[i], false]);
            }

            this.connection.server.resetMovement(MovementList, pingBack, this._currentCommand);
        }
    };

    ShipController.prototype.shoot = function (now) {
        var timeSinceFired = now - this._lastShot;

        if (this.Controllable.Value && timeSinceFired > Ship.MIN_FIRE_RATE) {
            this._lastShot = now;
            this.connection.server.fire();
        }
    };

    ShipController.prototype.applyKeyboardMappings = function () {
        var timeFirePressed, singleFireMode = true, autoFireTimeout, that = this;

        for (var k = 0; k < this._keyMapping.length; k++) {
            for (var z = 0; z < this._keyMapping[k].key.length; z++) {
                shortcut.add(that._keyMapping[k].key[z], (function (k) {
                    return function () {
                        that.startMovement(that._keyMapping[k].dir);
                    };
                })(k), { 'disable_in_input': true, 'type': 'keydown' });

                shortcut.add(that._keyMapping[k].key[z], (function (k) {
                    return function () {
                        that.stopMovement(that._keyMapping[k].dir);
                    };
                })(k), { 'disable_in_input': true, 'type': 'keyup' });
            }
        }

        shortcut.add(this.fire, function () {
            timeFirePressed = new Date().getTime();

            if (singleFireMode) {
                that.shoot(timeFirePressed);
                autoFireTimeout = setTimeout(function () {
                    singleFireMode = false;
                    that.connection.server.startFire();
                }, Ship.MIN_FIRE_RATE);
            } else {
                that.connection.server.startFire();
            }
        }, { 'disable_in_input': true, 'type': 'keydown' });

        shortcut.add(this.fire, function () {
            var timeFireReleased;

            clearTimeout(autoFireTimeout);
            timeFireReleased = new Date().getTime();

            if (!singleFireMode) {
                that._lastShot = timeFireReleased;
                that.connection.server.stopFire();
            }

            singleFireMode = timeFireReleased - timeFirePressed < Ship.MIN_FIRE_RATE;
        }, { 'disable_in_input': true, 'type': 'keyup' });

        $(window).blur(function () {
            that.resetMovement(["Forward", "Backward", "RotatingLeft", "RotatingRight"]);
            that.connection.server.stopFire();
        });
    };

    ShipController.prototype.PayloadReceived = function (info) {
        this.registerPayload();

        for (var i = 0; i < info.Ships.length; i++) {
            if (this.ID === info.Ships[i].ID) {
                this.determineInterpolation(info.Ships[i]);
                break;
            }
        }
    };

    ShipController.prototype.ReplayCommands = function (serverCommand) {
        if (this._commandList.length >= 1) {
            var serverCommandIndex = this._commandList.length - (this._currentCommand - serverCommand);

            for (var i = serverCommandIndex; i < this._commandList.length; i++) {
                if (this._commandList[i][3]) {
                    if (this._commandList[i][2]) {
                        this.ShipAbilityHandler.Activate(this._commandList[i][1]);
                    } else {
                        this.ShipAbilityHandler.Deactivate(this._commandList[i][1]);
                    }
                } else {
                    this.MovementController.Moving[this._commandList[i][1]] = this._commandList[i][2];
                }
            }

            this._commandList.splice(0, serverCommandIndex);
        }
    };

    ShipController.prototype.Initialize = function (screen) {
        if ('createTouch' in document || navigator.msMaxTouchPoints) {
            this._touchController = new TouchController(this.startMovement, this.stopMovement, this.stopAndStartMovement, this.resetMovement, this.shoot);
            this._touchController.Initialize(screen);
        }

        this.applyKeyboardMappings();
    };

    ShipController.prototype.DrawHUD = function () {
        if (this._touchController) {
            this._touchController.Draw();
        }
    };

    ShipController.prototype.ResetTouchController = function () {
        if (this._touchController) {
            this._touchController.Reset();
        }
    };
    ShipController.REQUEST_PING_EVERY = 5;
    ShipController.DOUBLE_TAP_AFTER = 175;
    return ShipController;
})(Ship);
//# sourceMappingURL=ShipController.js.map
