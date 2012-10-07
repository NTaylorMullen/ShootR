function ShipControllerFunctions(conn) {
    var that = this;
    that.StartMovement = function(dir) {
        conn.registerMoveStart(dir, false);
    }

    that.StopMovement = function(dir) {
        conn.registerMoveStop(dir, false);
    }

    that.StopAndStartMovement = function(toStop, toStart) {
        conn.startAndStopMovement(toStop, toStart, false);
    }

    that.ResetMovement = function() {
        conn.resetMovement(false);
    }

    that.shoot = function() {
        conn.fire();
    }
}