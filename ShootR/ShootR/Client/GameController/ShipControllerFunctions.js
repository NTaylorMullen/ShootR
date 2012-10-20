function ShipControllerFunctions(connection) {
    var that = this;
    that.StartMovement = function(dir) {
        connection.server.registerMoveStart(dir, false);
    }

    that.StopMovement = function(dir) {
        connection.server.registerMoveStop(dir, false);
    }

    that.StopAndStartMovement = function(toStop, toStart) {
        connection.server.startAndStopMovement(toStop, toStart, false);
    }

    that.ResetMovement = function(MovementList) {
        connection.server.resetMovement(MovementList, false);
    }

    that.shoot = function() {
        connection.server.fire();
    }
}