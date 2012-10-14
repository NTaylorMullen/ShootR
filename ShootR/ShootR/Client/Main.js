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
        screen = new Screen($("#game"), $("#gameWrapper"), $("#gameHUD"), $("#popUpHolder"), env),
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
                env.server.changeName($("#ShipName").val());
            }
        });

        $("#ChangeShipName").click(function () {
            env.server.changeName($("#ShipName").val());
        });

        shortcut.add("X", function () {
            game.ShipManager.DrawDetails = !game.ShipManager.DrawDetails;
        }, { 'disable_in_input': true, 'type': 'keyup' });

        shortcut.add("Tab", function () {
            $("#popUpHolder").css("display", "block");
            $("#leaderboardHolder").show(350);
            env.server.readyForLeaderboardPayloads();
        }, { 'disable_in_input': true, 'type': 'keydown' });

        shortcut.add("Tab", function () {
            $("#leaderboardHolder").hide(200, function () {
                $("#popUpHolder").css("display", "none");
            });
            env.server.stopLeaderboardPayloads()
        }, { 'disable_in_input': true, 'type': 'keyup' });

        game.ShipManager.MyShip.LatencyResolver = latencyResolver;
        game.ShipManager.MyShip.Initialize(screen);
        StartUpdateLoop();
        env.server.readyForPayloads();
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

    function LoadLeaderboard(info) {
        console.log("Loading Leaderboard Info!");
    }

    // Small name in order to minimize payload
    env.client.d = function (compressedPayload) {
        LoadMapInfo(payloadDecompressor.Decompress(compressedPayload));
    }

    // Leaderboard request endpoint
    env.client.l = function (compressedLeaderboard) {
        LoadLeaderboard(payloadDecompressor.DecompressLeaderboard(compressedLeaderboard));
    }

    env.client.notify = function (msg) {
        alert(msg);
    }

    env.client.pingBack = latencyResolver.ServerPingBack;

    env.client.controlRequest = function () {
        controlRequest.show(500);
    }

    env.client.controllersStopped = function () {
        stopControllers.hide(500);
    }

    $.connection.hub.start(function () {
        // Send the viewport to the server initialization method
        env.server.initializeClient().done(function (value) {
            Initialize(value);
        });

        $("#acceptControlRequest").click(function () {
            env.server.acceptControlRequest();
            controlRequest.hide(500, function () {
                stopControllers.show(500);
            });
        });

        $("#declineControlRequest").click(function () {
            env.server.declineControlRequest();
            controlRequest.hide(500);
        });

        stopControllers.click(function () {
            env.server.stopRemoteControllers();
            stopControllers.hide(500);
        });
    });
});
