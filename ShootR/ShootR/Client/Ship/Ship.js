function Ship(rotateLeft, forward, rotateRight, backward, fire, bullet_manager, conn) {
    var that = this,
        lastShot = new Date(),
        keyMapping = [];

    that.Latency = 0;

    keyMapping.push({ key: rotateLeft, dir: "RotatingLeft" });
    keyMapping.push({ key: rotateRight, dir: "RotatingRight" });
    keyMapping.push({ key: forward, dir: "Forward" });
    keyMapping.push({ key: backward, dir: "Backward" });

    that.MovementSentAt = false;

    that.acknowledgeMovement = function (acknowledgedAt) {
        if (acknowledgedAt) {
            that.Latency = acknowledgedAt.getTime() - that.MovementSentAt.getTime();            
        }
        that.MovementSentAt = false;
    }

    // Mapping each hot key to its corresponding movement direction
    for (k = 0; k < keyMapping.length; k++) {
        shortcut.add(keyMapping[k].key, (function (k) {
            return function () {
                if (!that.MovementController.Moving[keyMapping[k].dir]) {
                    if (!that.MovementSentAt) {
                        that.MovementSentAt = new Date();
                    }

                    conn.registerMoveStart(keyMapping[k].dir);
                    setTimeout((function (k) {
                        that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
                        that.MovementController.Moving[keyMapping[k].dir] = true;
                    })(k), that.Latency);
                }
            };
        })(k), { 'disable_in_input': true, 'type': 'keydown' });

        shortcut.add(keyMapping[k].key, (function (k) {
            return function () {
                if (!that.MovementSentAt) {
                    that.MovementSentAt = new Date();
                }

                conn.registerMoveStop(keyMapping[k].dir);
                setTimeout((function (k) {
                    that.UpdateFromSecond(CalculatePOS(that.LastUpdated));
                    that.MovementController.Moving[keyMapping[k].dir] = false;
                })(k), that.Latency);
                //that.MovementController.Moving[keyMapping[k].dir] = false;
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