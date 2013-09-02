var ShipControllerFunctions = (function () {
    function ShipControllerFunctions(connection) {
        ShipControllerFunctions._connection = connection;
    }
    ShipControllerFunctions.prototype.StartMovement = function (dir) {
        ShipControllerFunctions._connection.server.registerMoveStart(dir, false, ++ShipControllerFunctions._currentCommand);
    };

    ShipControllerFunctions.prototype.StopMovement = function (dir) {
        ShipControllerFunctions._connection.server.registerMoveStop(dir, false, ++ShipControllerFunctions._currentCommand);
    };

    ShipControllerFunctions.prototype.StopAndStartMovement = function (toStop, toStart) {
        ShipControllerFunctions._connection.server.startAndStopMovement(toStop, toStart, false, ++ShipControllerFunctions._currentCommand);
    };

    ShipControllerFunctions.prototype.ResetMovement = function (MovementList) {
        ShipControllerFunctions._connection.server.resetMovement(MovementList, false, ++ShipControllerFunctions._currentCommand);
    };

    ShipControllerFunctions.prototype.shoot = function () {
        ShipControllerFunctions._connection.server.fire();
    };
    ShipControllerFunctions._currentCommand = 0;
    return ShipControllerFunctions;
})();
//# sourceMappingURL=ShipControllerFunctions.js.map
