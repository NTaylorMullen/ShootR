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
        screen = new Screen($("#game"), $("#gameWrapper"), env),
        gameInfoReceived = false,
        lastPayload = { Ships: {}, Bullets: [] },
        controlRequest = $("#controlRequest"),
        stopControllers = $("#StopControlling");

    function Initialize(init) {
        configurationManager = new ConfigurationManager(init.Configuration);
        game = new Game(env, latencyResolver, init.ShipID);
        payloadDecompressor.LoadContracts(init.CompressionContracts);
        screen.Initialize();

        $("#ShipName").val(init.ShipName);

        $("#ShipName").keyup(function (e) {
            if (e.keyCode == 13) {
                env.changeName($("#ShipName").val());
            }
        });

        $("#ChangeShipName").click(function () {
            env.changeName($("#ShipName").val());
        });

        shortcut.add("X", function () {
            game.ShipManager.DrawName = !game.ShipManager.DrawName;
        }, { 'disable_in_input': true, 'type': 'keyup' });

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
        lastPayload = info;
        gameInfoReceived = true;

        game.ShipManager.UpdateShips(info.Ships);
        game.BulletManager.UpdateBullets(info.Bullets);
    }

    // Small name in order to minimize payload
    env.d = function (compressedPayload) {
        LoadMapInfo(payloadDecompressor.Decompress(compressedPayload));
    }

    env.pingBack = latencyResolver.ServerPingBack;

    env.controlRequest = function () {
        controlRequest.show(500);
    }

    env.controllersStopped = function () {
        stopControllers.hide(500);
    }

    $.connection.hub.start(function () {
        // Send the viewport to the server initialization method
        env.initializeClient().done(function (value) {
            Initialize(value);
        });

        $("#acceptControlRequest").click(function () {
            env.acceptControlRequest();
            controlRequest.hide(500, function() {
                stopControllers.show(500);
            });
        });

        $("#declineControlRequest").click(function () {
            env.declineControlRequest();
            controlRequest.hide(500);
        });

        stopControllers.click(function () {
            env.stopRemoteControllers();
            stopControllers.hide(500);
        });
    });
});
