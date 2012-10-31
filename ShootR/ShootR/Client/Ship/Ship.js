function Ship(rotateLeft, forward, rotateRight, backward, fire, bullet_manager, connection) {
    ShipVehicle.call(this);
    var that = this,
        lastShot = new Date().getTime(),
        keyMapping = [],
        movementCount = that.REQUEST_PING_EVERY,
        touchController,
        commandList = [],
        currentCommand = 0,
        lastPayloadReceivedAt,
        payloadsEvery,
        lastCommandStartAt = new Date().getTime(),
        lastCommandStart,
        wasDead = false,
        doubleTapAfter = 175; // Trigger a double tap if movement start prior to X milliseconds

    keyMapping.push({ key: rotateLeft, dir: "RotatingLeft" });
    keyMapping.push({ key: rotateRight, dir: "RotatingRight" });
    keyMapping.push({ key: forward, dir: "Forward" });
    keyMapping.push({ key: backward, dir: "Backward" });

    // Instantiated by the game config
    that.REQUEST_PING_EVERY;

    // Interpolate if we're more than 5 pixels away from the server
    that.MovementController.INTERPOLATE_POSITION_THRESHOLD = 4;
    that.MovementController.INTERPOLATE_ROTATION_THRESHOLD = 15;

    // Instantiated in main.js
    that.LatencyResolver;

    that.MovementController.Smoothing = {
        X: false,
        Y: false
    }

    that.MovementController.Target = {
        X: 0,
        Y: 0
    };

    that.MovementController.InterpolateOver = {
        X: 0,
        Y: 0
    }

    that.MovementController.InterpolateRotationOver;
    that.MovementController.SmoothingRotation = false;
    that.MovementController.TargetRotation;

    that.TryInterpolate = true;
    that.TryInterpolateRotation = false;

    that.LifeController = {
        Health: that.MaxLife
    }

    function RegisterPayload() {
        // Calculate how often we receive payloads so we can interpolate between them
        var now = new Date().getTime();
        if (lastPayloadReceivedAt) {
            payloadsEvery = now - lastPayloadReceivedAt
        }

        lastPayloadReceivedAt = now;
    }

    function CheckInterpolation(serverShip, axis, distance) {
        if (distance[axis] > that.MovementController.INTERPOLATE_POSITION_THRESHOLD) {
            that.MovementController.InterpolateOver[axis] = Math.max(payloadsEvery, 50);
            that.MovementController.Smoothing[axis] = true;
            that.MovementController.Target[axis] = serverShip.MovementController.Position[axis];
            serverShip.MovementController.Position[axis] = that.MovementController.Position[axis];
        }
    }

    function CheckRotationInterpolation(serverShip) {
        var distance = Math.abs(that.MovementController.Rotation - serverShip.MovementController.Rotation);

        if (distance > that.MovementController.INTERPOLATE_ROTATION_THRESHOLD) {
            that.MovementController.InterpolateRotationOver = Math.max(payloadsEvery, 35);
            that.MovementController.SmoothingRotation = true;
            that.MovementController.TargetRotation = serverShip.MovementController.Rotation;
            serverShip.MovementController.Rotation = that.MovementController.Rotation;
        }
    }

    function DetermineInterpolation(serverShip) {
        if (payloadsEvery) {
            if (!that.LifeController.Alive) {
                that.MovementController.Smoothing.X = false;
                that.MovementController.Smoothing.Y = false;
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

    function DoubleTap(dir) {
        if (dir === "Forward") {
            StartAbility("Boost");
            return true;
        }

        return false;
    }

    function StartAbility(name) {
        if (that.Controllable.Value && that.ShipAbilityHandler.Activate(name) && that.LifeController.Alive) {
            commandList.push([++currentCommand, name, true, true]);
            connection.server.registerAbilityStart(name, false, currentCommand);

            that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
        }
    }

    function StopAbility(name) {
        if (that.Controllable.Value && that.ShipAbilityHandler.Deactivate(name) && that.LifeController.Alive) {
            var pingBack = false;
            commandList.push([++currentCommand, name, false, true]);
            connection.server.registerAbilityStop(name, false, currentCommand);

            that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
        }
    }

    function StartMovement(dir) {
        if (that.Controllable.Value && !that.MovementController.Moving[dir] && that.LifeController.Alive) {
            var pingBack = false,
                now = new Date().getTime();

            movementCount = ++movementCount % that.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (movementCount === 0) {
                pingBack = true;
                that.LatencyResolver.RequestedPingBack();
            }

            var successfulDoubleTap = false;
            // Double tap
            if (now - lastCommandStartAt <= doubleTapAfter && lastCommandStart === dir) {
                successfulDoubleTap = DoubleTap(dir);
            }
            
            if(!successfulDoubleTap) {
                lastCommandStartAt = now;
                lastCommandStart = dir;

                commandList.push([++currentCommand, dir, true]);
                connection.server.registerMoveStart(dir, pingBack, currentCommand);

                that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
                that.MovementController.Moving[dir] = true;
            }
        }
    }

    function StopMovement(dir) {
        if (that.Controllable.Value && that.LifeController.Alive) {
            var pingBack = false;
            movementCount = ++movementCount % that.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (movementCount === 0) {
                pingBack = true;
                that.LatencyResolver.RequestedPingBack();
            }
            commandList.push([++currentCommand, dir, false]);
            connection.server.registerMoveStop(dir, pingBack, currentCommand);

            that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
            that.MovementController.Moving[dir] = false;
        }
    }

    function StopAndStartMovement(toStop, toStart) {
        if (that.Controllable.Value && that.LifeController.Alive) {
            var pingBack = false,
                now = new Date().getTime();

            movementCount = ++movementCount % that.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (movementCount === 0) {
                pingBack = true;
                that.LatencyResolver.RequestedPingBack();
            }

            var successfulDoubleTap = false;
            // Double tap
            if (now - lastCommandStartAt <= doubleTapAfter && lastCommandStart === toStart) {
                successfulDoubleTap = DoubleTap(toStart);
            }

            if (!successfulDoubleTap) {
                lastCommandStartAt = now;
                lastCommandStart = toStart;

                commandList.push([++currentCommand, toStop, false]);
                commandList.push([++currentCommand, toStart, true]);

                connection.server.startAndStopMovement(toStop, toStart, pingBack, currentCommand);

                that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
                that.MovementController.Moving[toStop] = false;
                that.MovementController.Moving[toStart] = true;
            }
        }
    }

    function ResetMovement(MovementList) {
        if (that.Controllable.Value && that.LifeController.Alive) {
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
                commandList.push([++currentCommand, MovementList[i], false]);
            }

            connection.server.resetMovement(MovementList, pingBack, currentCommand);
        }
    }

    function shoot(now) {
        var timeSinceFired = now - lastShot;

        if (that.Controllable.Value && timeSinceFired > that.MIN_FIRE_RATE) {
            lastShot = now;
            connection.server.fire();
        }
    }

    function ApplyKeyboardMappings() {
        var timeFirePressed,
            singleFireMode = true,
            autoFireTimeout;

        // Mapping each hot key to its corresponding movement direction
        for (k = 0; k < keyMapping.length; k++) {
            for (z = 0; z < keyMapping[k].key.length; z++) {
                shortcut.add(keyMapping[k].key[z], (function (k) {
                    return function () {
                        StartMovement(keyMapping[k].dir);
                    };
                })(k), { 'disable_in_input': true, 'type': 'keydown' });

                shortcut.add(keyMapping[k].key[z], (function (k) {
                    return function () {
                        StopMovement(keyMapping[k].dir);
                    };
                })(k), { 'disable_in_input': true, 'type': 'keyup' });
            }
        }

        shortcut.add(fire, function () {
            timeFirePressed = new Date().getTime();

            if (singleFireMode) {
                shoot(timeFirePressed);
                autoFireTimeout = setTimeout(function() {
                    singleFireMode = false;
                    connection.server.startFire();
                }, that.MIN_FIRE_RATE);
            } else {
                connection.server.startFire();
            }
        },  { 'disable_in_input': true, 'type': 'keydown' });

        shortcut.add(fire, function () {
            var timeFireReleased;
            
            clearTimeout(autoFireTimeout);
            timeFireReleased = new Date().getTime();

            if (!singleFireMode) {
                lastShot = timeFireReleased;
                connection.server.stopFire();
            }
           
            singleFireMode = timeFireReleased - timeFirePressed < that.MIN_FIRE_RATE;
        }, { 'disable_in_input': true, 'type': 'keyup' });

        $(window).blur(function () {
            ResetMovement(["Forward", "Backward", "RotatingLeft", "RotatingRight"]);
            connection.server.stopFire();
        });
    }

    ApplyKeyboardMappings();

    that.ReplayCommands = function (serverCommand) {
        if (commandList.length >= 1) {
            var serverCommandIndex = commandList.length - (currentCommand - serverCommand);

            for (var i = serverCommandIndex; i < commandList.length; i++) {
                if (commandList[i][3]) { // Checking if the command is an ability
                    if (commandList[i][2]) {
                        that.ShipAbilityHandler.Activate(commandList[i][1])
                    }
                    else {
                        that.ShipAbilityHandler.Deactivate(commandList[i][1])
                    }
                }
                else {
                    that.MovementController.Moving[commandList[i][1]] = commandList[i][2];
                }
            }

            commandList.splice(0, serverCommandIndex);
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
