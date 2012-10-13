function Ship(rotateLeft, forward, rotateRight, backward, fire, bullet_manager, conn) {
    var that = this,
        lastShot = new Date(),
        keyMapping = [],
        movementCount = 0,
        touchController;

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
            conn.registerMoveStart(dir, pingBack);

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
        conn.registerMoveStop(dir, pingBack);

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
        conn.startAndStopMovement(toStop, toStart, pingBack);

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
        }
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

    that.Initialize = function (screen) {
        // Touch is enabled
        if ('createTouch' in document || navigator.msPointerEnabled) {
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