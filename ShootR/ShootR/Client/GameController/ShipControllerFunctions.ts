class ShipControllerFunctions {
    static _connection: any;
    static _currentCommand: number;

    constructor (connection: any) {
        ShipControllerFunctions._connection = connection;
    }
    
    public StartMovement(dir: string): void {
        ShipControllerFunctions._connection.server.registerMoveStart(dir, false, ++ShipControllerFunctions._currentCommand);
    }

    public StopMovement(dir: string): void {
        ShipControllerFunctions._connection.server.registerMoveStop(dir, false, ++ShipControllerFunctions._currentCommand);
    }

    public StopAndStartMovement(toStop: string, toStart: string): void {
        ShipControllerFunctions._connection.server.startAndStopMovement(toStop, toStart, false, ++ShipControllerFunctions._currentCommand);
    }

    public ResetMovement(MovementList: string[]): void {
        ShipControllerFunctions._connection.server.resetMovement(MovementList, false, ++ShipControllerFunctions._currentCommand);
    }

    public shoot(): void {
        ShipControllerFunctions._connection.server.fire();
    }
}