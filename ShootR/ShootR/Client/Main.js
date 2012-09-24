/// <reference path="lib/jquery-1.6.4.js" />
/// <reference path="Game.js" />
/// <reference path="lib/jquery.spritify-0.0.0.js" />

$(function () {
    var env = $.connection.gameEnvironment;
    var game;
    var configurationManager;
    var lastPayload = { Ships: {}, Bullets: [], Collisions: [] };

    function Initialize(config) {
        configurationManager = new ConfigurationManager(config);
        game = new Game(env);

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

        $("#ShipName").keyup(function (e) {
            if (e.keyCode == 13) {
                env.changeName($("#ShipName").val());
            }
        });

        $("#ChangeShipName").click(function () {
            env.changeName($("#ShipName").val());
        });

        shortcut.add("X", function () {
            game.DrawName = !game.DrawName;
        }, { 'disable_in_input': true, 'type': 'keyup' });

        (function animloop() {
            requestAnimFrame(animloop);
            game.Update(lastPayload);
        })();
    }


    env.LoadMapInfo = function (info) {
        lastPayload = info;
        game.LoadMultiplayerShips(info.Ships);
        game.LoadBullets(info.Bullets);
    }

    env.RemoveShip = function (connectionID) {
        game.RemoveShip(connectionID);
    }

    env.updateShipName = function (newName) {
        $("#ShipName").val(newName);
    }

    $.connection.hub.start().done(function () {        
        env.getConfiguration().done(function (value) {
            Initialize(value);
        });        
    });
});
