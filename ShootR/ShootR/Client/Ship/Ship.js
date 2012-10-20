function Ship(rotateLeft, forward, rotateRight, backward, fire, bullet_manager, conn) {
    var that = this,
        lastShot = new Date(),
        keyMapping = [],
        movementCount = 0,
        touchController,
        movementList = [],
        currentCommand = 0;

    keyMapping.push({ key: rotateLeft, dir: "RotatingLeft" });
    keyMapping.push({ key: rotateRight, dir: "RotatingRight" });
    keyMapping.push({ key: forward, dir: "Forward" });
    keyMapping.push({ key: backward, dir: "Backward" });

    // Instantiated by the game config
    that.REQUEST_PING_EVERY;

    // Instantiated in main.js
    that.LatencyResolver;

    function StartMovement(dir) {
        if (!that.MovementController.Moving[dir]) {
            var pingBack = false;
            movementCount = ++movementCount % that.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (movementCount === 0) {
                pingBack = true;
                that.LatencyResolver.RequestedPingBack();
            }
            movementList.push([currentCommand++,dir,true]);
            conn.registerMoveStart(dir, pingBack, currentCommand);

            that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
            that.MovementController.Moving[dir] = true;
        }
    }

    function StopMovement(dir) {
        var pingBack = false;
        movementCount = ++movementCount % that.REQUEST_PING_EVERY;

        // 0 Is when the counter loops over, aka hits max;
        if (movementCount === 0) {
            pingBack = true;
            that.LatencyResolver.RequestedPingBack();
        }
        movementList.push([currentCommand++,dir,false]);
        conn.registerMoveStop(dir, pingBack, currentCommand);

        that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
        that.MovementController.Moving[dir] = false;
    }

    function StopAndStartMovement(toStop, toStart) {
        var pingBack = false;
        movementCount = ++movementCount % that.REQUEST_PING_EVERY;

        // 0 Is when the counter loops over, aka hits max;
        if (movementCount === 0) {
            pingBack = true;
            that.LatencyResolver.RequestedPingBack();
        }
        movementList.push([currentCommand++, toStop, false]);
        movementList.push([currentCommand++, toStart, true]);

        conn.startAndStopMovement(toStop, toStart, pingBack, currentCommand);

        that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
        that.MovementController.Moving[toStop] = false;
        that.MovementController.Moving[toStart] = true;
    }

    function ResetMovement(MovementList) {
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
            movementList.push([currentCommand++, MovementList[i], false]);
        }

        conn.resetMovement(MovementList, pingBack, currentCommand);
    }

    function shoot() {
        var diff = new Date();
        diff.setTime(diff - lastShot);

        if (diff.getTime() > that.FIRE_RATE) {
            lastShot = new Date();

            conn.fire();
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
            var frontCommandID = movementList[0][0],
                index = serverCommand - frontCommandID;

            for (var i = index + 1; i < movementList.length; i++) {
                that.MovementController.Moving[movementList[i][1]] = movementList[i][2];
            }

            movementList.splice(0, index + 1);

            $("#ShipName").val(currentCommand + " : " + serverCommand);
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
}

Ship.prototype = new ShipVehicle();