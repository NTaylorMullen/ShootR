/// <reference path="lib/jquery-1.6.4.js" />
/// <reference path="Game.js" />
/// <reference path="lib/jquery.spritify-0.0.0.js" />

$(function () {
    var env = $.connection.gameEnvironment;
    var game;
    var configurationManager;
    var lastPayload = { Ships: {}, Bullets: [], Collisions: [] };
    var viewModel = new Object();

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

    function sortLeaderboard(leaderboard) {
        leaderboard.sort(function (left, right) {
            return (right.hits() - right.damage()) - (left.hits() - left.damage());
        });
        $.each(leaderboard(), function (index, value) {
            value.position(index + 1);
        });
    }

    env.LoadMapInfo = function (info) {
        lastPayload = info;
        game.LoadMultiplayerShips(info.Ships);
        game.LoadBullets(info.Bullets);
    }

    env.updateShipName = function (newName) {
        $("#ShipName").val(newName);
    }

    env.newShip = function (name, connectionId) {
        viewModel.leaderboard.push({
            position: ko.observable(0),
            name: ko.observable(name),
            hits: ko.observable(0),
            damage: ko.observable(0),
            connectionId: connectionId
        });
        sortLeaderboard(viewModel.leaderboard);
    }

    env.removeShip = function (connectionId) {
        var x = viewModel.leaderboard.remove(function (item) {
            return item.connectionId == connectionId;
        });
        sortLeaderboard(viewModel.leaderboard);
    }

    env.nameChange = function (connectionId, newName) {
        $.each(viewModel.leaderboard(), function (index, value) {
            if (value.connectionId == connectionId) {
                value.name(newName);
            }
        });
    }

    env.hit = function (firedBy, hit) {
        $.each(viewModel.leaderboard(), function (index, value) {
            if (value.connectionId == firedBy) {
                value.hits(value.hits() + 1);
            }
            if (value.connectionId == hit) {
                value.damage(value.damage() + 1);
            }
        });
        sortLeaderboard(viewModel.leaderboard);
    }

    $.connection.hub.start().done(function () {        
        env.getConfiguration().done(function (value) {
            Initialize(value);
        });
        env.getLeaderboard().done(function (value) {
            viewModel.leaderboard = ko.observableArray($.map(value, function(v) {
                return {
                    position: ko.observable(0),
                    name: ko.observable(v.name),
                    hits: ko.observable(v.hits),
                    damage: ko.observable(v.damage),
                    connectionId: v.connectionId
                };
            }));
            sortLeaderboard(viewModel.leaderboard);
            ko.applyBindings(viewModel);
        });
    });
});
