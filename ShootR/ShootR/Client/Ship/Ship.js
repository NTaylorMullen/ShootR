function Ship(rotateLeft, forward, rotateRight, backward, fire, bullet_manager, connection) {
    var that = this,
        lastShot = new Date().getTime(),
        keyMapping = [],
        movementCount = that.REQUEST_PING_EVERY,
        touchController,
        movementList = [],
        currentCommand = 0,
        lastPayloadReceivedAt,
        payloadsEvery,
        wasDead = false;

    keyMapping.push({ key: rotateLeft, dir: "RotatingLeft" });
    keyMapping.push({ key: rotateRight, dir: "RotatingRight" });
    keyMapping.push({ key: forward, dir: "Forward" });
    keyMapping.push({ key: backward, dir: "Backward" });

    // Instantiated by the game config
    that.REQUEST_PING_EVERY;

    // Interpolate if we're more than 5 pixels away from the server
    Ship.prototype.INTERPOLATE_POSITION_THRESHOLD = 13;
    Ship.prototype.INTERPOLATE_ROTATION_THRESHOLD = 15;

    // Instantiated in main.js
    that.LatencyResolver;

    Ship.prototype.Smoothing = {
        X: false,
        Y: false
    }

    Ship.prototype.Target = {
        X: 0,
        Y: 0
    };

    Ship.prototype.InterpolateOver = {
        X: 0,
        Y: 0
    }

    Ship.prototype.InterpolateRotationOver;
    Ship.prototype.SmoothingRotation = false;
    Ship.prototype.TargetRotation;

    that.TryInterpolate = true;
    that.TryInterpolateRotation = false;

    function RegisterPayload() {
        // Calculate how often we receive payloads so we can interpolate between them
        var now = new Date().getTime();
        if (lastPayloadReceivedAt) {
            payloadsEvery = now - lastPayloadReceivedAt
        }
        
        lastPayloadReceivedAt = now;
    }

    function CheckInterpolation(serverShip, axis, distance) {
        if (distance[axis] > that.INTERPOLATE_POSITION_THRESHOLD) {
            Ship.prototype.InterpolateOver[axis] = Math.max(payloadsEvery, 50);
            Ship.prototype.Smoothing[axis] = true;
            Ship.prototype.Target[axis] = serverShip.MovementController.Position[axis];
            serverShip.MovementController.Position[axis] = that.MovementController.Position[axis];
        }
    }

    function CheckRotationInterpolation(serverShip) {
        var distance = Math.abs(that.MovementController.Rotation - serverShip.MovementController.Rotation);

        if (distance > that.INTERPOLATE_ROTATION_THRESHOLD) {
            Ship.prototype.InterpolateRotationOver = Math.max(payloadsEvery, 35);
            Ship.prototype.SmoothingRotation = true;
            Ship.prototype.TargetRotation = serverShip.MovementController.Rotation;
            serverShip.MovementController.Rotation = that.MovementController.Rotation;
        }
    }

    function DetermineInterpolation(serverShip) {
        if (payloadsEvery) {

            if (!that.LifeController.Alive) {
                that.Smoothing.X = false;
                that.Smoothing.Y = false;
                wasDead = true;
            }

            if (!wasDead) {
                if (that.TryInterpolate) {
                    that.Update();
                    var distance = CalculateDistance(that.MovementController.Position, serverShip.MovementController.Position);

                    CheckInterpolation(serverShip, "X", distance);
                    CheckInterpolation(serverShip, "Y", distance);
                }

                if (that.TryInterpolateRotation) {
                    CheckRotationInterpolation(serverShip);
                }
            }

            if (that.LifeController.Alive) {
                wasDead = false;
            }
        }
    }

    that.PayloadReceived = function (info) {
        RegisterPayload();

        // Find my ship in the payload
        for (var i = 0; i < info.Ships.length; i++) {
            // Found my ship
            if (that.ID === info.Ships[i].ID) {
                DetermineInterpolation(info.Ships[i]);
                break;
            }
        }
    }

    function StartMovement(dir) {
        if (!that.MovementController.Moving[dir] && that.LifeController.Alive) {
            var pingBack = false;
            movementCount = ++movementCount % that.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (movementCount === 0) {
                pingBack = true;
                that.LatencyResolver.RequestedPingBack();
            }
            movementList.push([++currentCommand, dir, true]);
            connection.server.registerMoveStart(dir, pingBack, currentCommand);

            that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
            that.MovementController.Moving[dir] = true;
        }
    }

    function StopMovement(dir) {
        if (that.LifeController.Alive) {
            var pingBack = false;
            movementCount = ++movementCount % that.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (movementCount === 0) {
                pingBack = true;
                that.LatencyResolver.RequestedPingBack();
            }
            movementList.push([++currentCommand, dir, false]);
            connection.server.registerMoveStop(dir, pingBack, currentCommand);

            that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
            that.MovementController.Moving[dir] = false;
        }
    }

    function StopAndStartMovement(toStop, toStart) {
        if (that.LifeController.Alive) {
            var pingBack = false;
            movementCount = ++movementCount % that.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (movementCount === 0) {
                pingBack = true;
                that.LatencyResolver.RequestedPingBack();
            }
            movementList.push([++currentCommand, toStop, false]);
            movementList.push([++currentCommand, toStart, true]);

            connection.server.startAndStopMovement(toStop, toStart, pingBack, currentCommand);

            that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
            that.MovementController.Moving[toStop] = false;
            that.MovementController.Moving[toStart] = true;
        }
    }

    function ResetMovement(MovementList) {
        if (that.LifeController.Alive) {
            var pingBack = false;
            movementCount = ++movementCount % that.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (movementCount === 0) {
                pingBack = true;
            }

            that.UpdateFromSecond(CalculatePOS(that.LastUpdated));

            // Reset all movement
            for (var i = 0; i < MovementList.length; i++) {
                that.MovementController.Moving[MovementList[i]] = false;
                movementList.push([++currentCommand, MovementList[i], false]);
            }

            connection.server.resetMovement(MovementList, pingBack, currentCommand);
        }
    }

    function shoot() {
        if ((new Date().getTime() - lastShot) > that.FIRE_RATE) {
            lastShot = new Date().getTime();

            connection.server.fire();
        }
    }

    function ApplyKeyboardMappings() {
        // Mapping each hot key to its corresponding movement direction
        for (k = 0; k < keyMapping.length; k++) {
            shortcut.add(keyMapping[k].key, (function (k) {
                return function () {
                    StartMovement(keyMapping[k].dir);
                };
            })(k), { 'disable_in_input': true, 'type': 'keydown' });

            shortcut.add(keyMapping[k].key, (function (k) {
                return function () {
                    StopMovement(keyMapping[k].dir);

                };
            })(k), { 'disable_in_input': true, 'type': 'keyup' });
        }

        shortcut.add(fire, function () {
            shoot();
        });
    }

    ApplyKeyboardMappings();

    that.ReplayCommands = function (serverCommand) {
        if (movementList.length >= 1) {
            var serverCommandIndex = movementList.length - (currentCommand - serverCommand);

            for (var i = serverCommandIndex; i < movementList.length; i++) {
                that.MovementController.Moving[movementList[i][1]] = movementList[i][2];
            }

            movementList.splice(0, serverCommandIndex);
        }
    }

    that.Initialize = function (screen) {
        // Touch is enabled
        if ('createTouch' in document || navigator.msMaxTouchPoints) {
            touchController = new TouchController(StartMovement, StopMovement, StopAndStartMovement, ResetMovement, shoot);
            touchController.Initialize(screen);
        }
    }

    that.DrawHUD = function () {
        if (touchController) {
            touchController.Draw();
        }
    }

    that.ResetTouchController = function () {
        if (touchController) {
            touchController.Reset();
        }
    }
}