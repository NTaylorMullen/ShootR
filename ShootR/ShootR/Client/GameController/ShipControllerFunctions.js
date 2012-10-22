function ShipControllerFunctions(conn) {
    var that = this,
        currentCommand = 0;

    that.StartMovement = function(dir) {
        conn.registerMoveStart(dir, false, ++currentCommand);
    }

    that.StopMovement = function(dir) {
        conn.registerMoveStop(dir, false, ++currentCommand);
    }

    that.StopAndStartMovement = function(toStop, toStart) {
        conn.startAndStopMovement(toStop, toStart, false, ++currentCommand);
    }

    that.ResetMovement = function(MovementList) {
        conn.resetMovement(MovementList, false, ++currentCommand);
    }

    that.shoot = function() {
        conn.fire();
    }
}