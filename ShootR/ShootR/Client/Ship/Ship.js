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

    // Mapping each hot key to its corresponding movement direction
    for (k = 0; k < keyMapping.length; k++) {
        shortcut.add(keyMapping[k].key, (function (k) {
            return function () {
                if (!that.MovementController.Moving[keyMapping[k].dir]) {
                    var pingBack = false;
                    movementCount = ++movementCount % that.REQUEST_PING_EVERY;

                    // 0 Is when the counter loops over, aka hits max;
                    if (movementCount === 0) {
                        pingBack = true;
                        that.LatencyResolver.RequestedPingBack();
                    }
                    conn.registerMoveStart(keyMapping[k].dir, pingBack);

                    that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
                    that.MovementController.Moving[keyMapping[k].dir] = true;                    
                }
            };
        })(k), { 'disable_in_input': true, 'type': 'keydown' });

        shortcut.add(keyMapping[k].key, (function (k) {
            return function () {
                var pingBack = false;
                movementCount = ++movementCount % that.REQUEST_PING_EVERY;

                // 0 Is when the counter loops over, aka hits max;
                if (movementCount === 0) {
                    pingBack = true;
                }
                conn.registerMoveStop(keyMapping[k].dir, pingBack);

                that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
                that.MovementController.Moving[keyMapping[k].dir] = false;
            };
        })(k), { 'disable_in_input': true, 'type': 'keyup' });
    }

    function shoot() {
        var diff = new Date();
        diff.setTime(diff - lastShot);

        if (diff.getTime() > that.FIRE_RATE) {
            lastShot = new Date();

            conn.fire();
        }
    }

    shortcut.add(fire, function () {
        shoot();
    });
}

Ship.prototype = new ShipVehicle();