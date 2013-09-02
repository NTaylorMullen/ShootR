/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/signalr/signalr.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="GameScreen.ts" />
/// <reference path="Server/ServerAdapter.ts" />

$(function () {

    var connection = (<any>$.connection).h,
        gameCanvas: JQuery = $("#game"),
        popUpHolder: JQuery = $("#popUpHolder"),
        game: ShootR.Game,
        gameScreen: ShootR.GameScreen,
        serverAdapter: ShootR.Server.ServerAdapter = new ShootR.Server.ServerAdapter($.connection.hub, (<any>$.connection).h, "shootr.state");    

    serverAdapter.Negotiate().done((initializationData: ShootR.Server.IClientInitialization) => {
        gameScreen = new ShootR.GameScreen(gameCanvas, popUpHolder, serverAdapter);
        game = new ShootR.Game(<HTMLCanvasElement>gameCanvas[0], gameScreen, serverAdapter, initializationData);
    });

});