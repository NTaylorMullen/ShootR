/// <reference path="lib/jquery-1.6.4.js" />
/// <reference path="Game.js" />
/// <reference path="lib/jquery.spritify-0.0.0.js" />

$(function () {
    // The hub name is a single letter in order to reduce payload size
    var env = $.connection.h,
        game,
        configurationManager,
        payloadDecompressor = new PayloadDecompressor(),
        latencyResolver = new LatencyResolver(env),
        screen = new Screen($("#game"), $("#gameWrapper"), $("#popUpHolder"), env),
        gameInfoReceived = false,
        lastPayload = { Ships: {}, Bullets: [] },
        initializedMyShip = false,
        resync = false,
        currentPayloadID;

    function Initialize(init) {
        configurationManager = new ConfigurationManager(init.Configuration);
        game = new Game(env, latencyResolver, init.ShipID - 1);
        GAME_GLOBALS.Game = game;
        payloadDecompressor.LoadContracts(init.CompressionContracts);
        game.HUDManager.Initialize(init);
        screen.Initialize(game.HUDManager);

        game.ShipManager.MyShip.LatencyResolver = latencyResolver;
        game.ShipManager.MyShip.Initialize(screen);

        StartUpdateLoop();
        env.readyForPayloads();
    }

    function StartUpdateLoop() {
        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, configurationManager.gameConfig.UPDATE_INTERVAL);
                    };
        })();

        (function animloop() {
            requestAnimFrame(animloop);

            if (gameInfoReceived) {
                game.Update(lastPayload);
            }
        })();
    }

    function LoadMapInfo(info) {
        var myShip = game.ShipManager.MyShip;
        lastPayload = info;
        gameInfoReceived = true;

        $("#ShipName").val(info.ID);

        if (!currentPayloadID) {
            currentPayloadID = info.ID;
        }
        else {
            currentPayloadID++;
        }

        if (info.ID !== currentPayloadID) {
            console.log("Missed payload " + currentPayloadID + " actually got payload: " + info.ID);
            currentPayloadID = info.ID;
        }

        if (info.Notification) {
            $("#Notification").html(info.Notification);
            $('#Notification').css({ top: '50%', left: '50%', margin: '-' + ($('#Notification').height() / 2) + 'px 0 0 -' + ($('#Notification').width() / 2) + 'px' });
            $("#Notification").fadeIn(1000).fadeOut(4000);
        }

        myShip.Experience = info.Experience;
        myShip.ExperienceToNextLevel = info.ExperienceToNextLevel;

        game.HUDManager.Leaderboard.LoadPosition(info.LeaderboardPosition);
        if (!initializedMyShip) {
            initializedMyShip = true;
            var temp = info.Ships[info.Ships.length] = info.Ships[0];
            temp.ID = game.ShipManager.MyShip.ID;
            temp.Ghost = true;
        }

        if (resync) {
            resync = false;
            var copy;

            for (var i = 0; i < info.Ships.length; i++) {
                if (info.Ships[i].ID === game.ShipManager.MyShip.ID + 1) {
                    copy = $.extend({}, info.Ships[i]);
                    copy.ID = game.ShipManager.MyShip.ID;
                    break;
                }
            }

            info.Ships.push(copy);
        }

        game.ShipManager.UpdateShips(info.Ships);
        game.BulletManager.UpdateBullets(info.Bullets);
    }

    shortcut.add("f", function () {
        resync = true;
    });

    // Small name in order to minimize payload
    env.d = function (compressedPayload) {
        LoadMapInfo(payloadDecompressor.Decompress(compressedPayload));
    }

    // Leaderboard request endpoint
    env.l = function (compressedLeaderboard) {
        game.HUDManager.Leaderboard.Load(payloadDecompressor.DecompressLeaderboard(compressedLeaderboard, game.ShipManager.MyShip.Name));
    }

    env.mapSizeIncreased = function (size) {
        Map.prototype.WIDTH = size.Width;
        Map.prototype.HEIGHT = size.Height;
    }

    env.notify = function (msg) {
        alert(msg);
    }

    env.pingBack = latencyResolver.ServerPingBack;

    env.controlRequest = function () {
        game.HUDManager.ControlRequestManager.ControlRequest();
    }

    env.controllersStopped = function () {
        game.HUDManager.ControlRequestManager.ControllersStopped();
    }

    $.connection.hub.start(function () {
        // Send the viewport to the server initialization method
        env.initializeClient().done(function (value) {
            Initialize(value);
        });
    });
});