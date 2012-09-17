/// <reference path="lib/jquery-1.6.4.js" />
/// <reference path="Game.js" />
/// <reference path="lib/jquery.spritify-0.0.0.js" />

$(function () {
    var env = $.connection.gameEnvironment;
    var game;
    var configurationManager;

    function Initialize(config) {
        configurationManager = new ConfigurationManager(config);

        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, configurationManager.UPDATE_INTERVAL);
                    };
        })();

        (function animloop() {
            requestAnimFrame(animloop);
            game.Update();
        })();
    }

    env.LoadMapInfo = function (ship_list, bullet_list, amunition) {
        game.LoadMultiplayerShips(ship_list);
        game.LoadBullets(bullet_list);
        game.LoadDisposedAmmunition(amunition);
    }

    env.RemoveShip = function (connectionID) {
        game.RemoveShip(connectionID);
    }

    $.connection.hub.start().done(function () {
        game = new Game(env);
        env.getConfiguration().done(function (value) {
            Initialize(value);
        });
    });
});
