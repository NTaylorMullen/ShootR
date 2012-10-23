function ShipControllerFunctions(connection) {
    var that = this,
        currentCommand = 0;

    that.StartMovement = function(dir) {
        connection.server.registerMoveStart(dir, false, ++currentCommand);
    }

    that.StopMovement = function(dir) {
        connection.server.registerMoveStop(dir, false, ++currentCommand);
    }

    that.StopAndStartMovement = function(toStop, toStart) {
        connection.server.startAndStopMovement(toStop, toStart, false, ++currentCommand);
    }

    that.ResetMovement = function(MovementList) {
        connection.server.resetMovement(MovementList, false, ++currentCommand);
    }

    that.shoot = function() {
        connection.server.fire();
    }
}