/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/signalr/signalr.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="GameScreen.ts" />
/// <reference path="Server/ServerAdapter.ts" />
$(function () {
    var connection = ($.connection).h, gameCanvas = $("#game"), popUpHolder = $("#popUpHolder"), game, gameScreen, serverAdapter = new ShootR.Server.ServerAdapter($.connection.hub, ($.connection).h, "shootr.state");

    serverAdapter.Negotiate().done(function (initializationData) {
        gameScreen = new ShootR.GameScreen(gameCanvas, popUpHolder, serverAdapter);
        game = new ShootR.Game(gameCanvas[0], gameScreen, serverAdapter, initializationData);
    });
});
//# sourceMappingURL=Main.js.map
