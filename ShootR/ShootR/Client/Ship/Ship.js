function Ship(rotateLeft, forward, rotateRight, backward, fire, bullet_manager, conn) {
    var that = this,
        lastShot = new Date(),
        keyMapping = [],
        movementCount = that.REQUEST_PING_EVERY,
        touchController,
        movementList = [],
        currentCommand = 0,
        lastPayloadReceivedAt,
        payloadsEvery;

    keyMapping.push({ key: rotateLeft, dir: "RotatingLeft" });
    keyMapping.push({ key: rotateRight, dir: "RotatingRight" });
    keyMapping.push({ key: forward, dir: "Forward" });
    keyMapping.push({ key: backward, dir: "Backward" });

    // Instantiated by the game config
    that.REQUEST_PING_EVERY;

    // Interpolate if we're more than 5 pixels away from the server
    that.INTERPOLATE_THRESHOLD = 5; 

    // Instantiated in main.js
    that.LatencyResolver;

    Ship.prototype.SmoothingX = false;
    Ship.prototype.SmoothingY = false;

    Ship.prototype.StartedSmoothingXAt;
    Ship.prototype.StartedSmoothingYAt;

    Ship.prototype.TargetX;
    Ship.prototype.TargetY;

    Ship.prototype.InterpolateOver;

    that.TryInterpolate = false;

    shortcut.add("p", function () {
        that.TryInterpolate = !that.TryInterpolate;
        console.log("INTERPOLATING: " + that.TryInterpolate);
    });

    function RegisterPayload() {
        // Calculate how often we receive payloads so we can interpolate between them
        var now = new Date().getTime();
        if (lastPayloadReceivedAt) {
            payloadsEvery = now - lastPayloadReceivedAt
        }

        lastPayloadReceivedAt = now;

        $("#ShipName").val(payloadsEvery);
    }

    function DetermineInterpolation(serverShip) {
        if (payloadsEvery && that.TryInterpolate) {
            var distance = CalculateDistance(that.MovementController.Position, serverShip.MovementController.Position);

            if (distance.X > that.INTERPOLATE_THRESHOLD) {
                console.log("X");
                Ship.prototype.InterpolateOver = payloadsEvery;
                Ship.prototype.SmoothingX = true;
                Ship.prototype.TargetX = serverShip.MovementController.Position.X;
                serverShip.MovementController.Position.X = that.MovementController.Position.X;
                Ship.prototype.StartedSmoothingXAt = new Date().getTime();
            }
            if (distance.Y > that.INTERPOLATE_THRESHOLD) {
                console.log("Y");
                Ship.prototype.InterpolateOver = payloadsEvery;
                Ship.prototype.SmoothingY = true;
                Ship.prototype.TargetY = serverShip.MovementController.Position.Y;
                serverShip.MovementController.Position.Y = that.MovementController.Position.Y;
                Ship.prototype.StartedSmoothingYAt = new Date().getTime();
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
        if (!that.MovementController.Moving[dir]) {
            var pingBack = false;
            movementCount = ++movementCount % that.REQUEST_PING_EVERY;

            // 0 Is when the counter loops over, aka hits max;
            if (movementCount === 0) {
                pingBack = true;
                that.LatencyResolver.RequestedPingBack();
            }
            movementList.push([++currentCommand, dir, true]);
            conn.server.registerMoveStart(dir, pingBack, currentCommand);

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
        movementList.push([++currentCommand, dir, false]);
        conn.server.registerMoveStop(dir, pingBack, currentCommand);

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
        movementList.push([++currentCommand, toStop, false]);
        movementList.push([++currentCommand, toStart, true]);

        conn.server.startAndStopMovement(toStop, toStart, pingBack, currentCommand);

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
        conn.resetMovement(MovementList, pingBack);

        that.UpdateFromSecond(CalculatePOS(that.LastUpdated));

        // Reset all movement
        for (var i = 0; i < MovementList.length; i++) {
            that.MovementController.Moving[MovementList[i]] = false;
            movementList.push([++currentCommand, MovementList[i], false]);
        }

        conn.server.resetMovement(MovementList, pingBack, currentCommand);
    }

    function shoot() {
        var diff = new Date();
        diff.setTime(diff - lastShot);

        if (diff.getTime() > that.FIRE_RATE) {
            lastShot = new Date();

            conn.server.fire();
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
}

Ship.prototype = new ShipVehicle();