function Ship(rotateLeft, forward, rotateRight, backward, fire, bullet_manager, conn) {
    var that = this,
        lastShot = new Date(),
        keyMapping = [],
        movementCount = 0;

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
        }
        conn.registerMoveStop(dir, pingBack);

        that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
        that.MovementController.Moving[dir] = false;
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

    function ApplyTouchMappings() {
        $("#game").on("dragstart dragend", function (event) {
            event.preventDefault();

            var movementFunc;

            if (event.type === "dragstart") {
                movementFunc = StartMovement;
            }
            else if (event.type === "dragend") {
                movementFunc = StopMovement;
            }

            switch (event.direction) {
                case "up":
                    movementFunc(keyMapping[forward].dir);
                    break;
                case "down":
                    movementFunc(keyMapping[backward].dir);
                    break;
                case "left":
                    movementFunc(keyMapping[rotateLeft].dir);
                    break;
                case "right":
                    movementFunc(keyMapping[rotateRight].dir);
                    break;
            }
        });
    }

    if (!Modernizr.touch) { // Touch enabled, also map the touch commands to the movement controls
        ApplyTouchMappings();
    }

    ApplyKeyboardMappings();    
}

Ship.prototype = new ShipVehicle();