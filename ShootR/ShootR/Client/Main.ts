/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/signalr/signalr.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="GameScreen.ts" />
/// <reference path="Server/ServerAdapter.ts" />

$(function () {

    var connection = (<any>$.connection).h,
        gameCanvas: JQuery = $("#game"),
        popUpHolder: JQuery = $("#popUpHolder"),
        gameContent: JQuery = $("#gameContent"),
        loadContent: JQuery = $("#loadContent"),
        game: ShootR.Game,
        serverAdapter: ShootR.Server.ServerAdapter = new ShootR.Server.ServerAdapter($.connection.hub, (<any>$.connection).h, "shootr.state"),
        gameScreen: ShootR.GameScreen = new ShootR.GameScreen(gameCanvas, popUpHolder, serverAdapter);

    gameScreen.OnResizeComplete.BindFor(() => {
        serverAdapter.Negotiate().done((initializationData: ShootR.Server.IClientInitialization) => {
            loadContent.hide();
            gameContent.show();

            game = new ShootR.Game(<HTMLCanvasElement>gameCanvas[0], gameScreen, serverAdapter, initializationData);
            gameScreen.ForceResizeCheck();
        });
    }, 1);

});