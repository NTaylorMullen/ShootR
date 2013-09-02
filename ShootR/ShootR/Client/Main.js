$(function () {
    // The hub name is a single letter in order to reduce payload size
    var env = ($).connection.h, game, configurationManager, payloadDecompressor = new PayloadDecompressor(), latencyResolver = new LatencyResolver(env), screen = new GameScreen($("#game"), $("#gameWrapper"), $("#popUpHolder"), env), notification = $("#Notification"), gameInfoReceived = false, lastPayload = { Ships: {}, Bullets: [] };

    var stateCookie = ($).cookie('shootr.state'), state = stateCookie ? JSON.parse(stateCookie) : {}, registrationID = state.RegistrationID;

    function Initialize(init) {
        if (init != null) {
            if (init.ServerFull) {
                ($).connection.hub.stop();
                alert("Server is full, try refreshing the page in 5 minutes.");
                return;
            }
            configurationManager = new ConfigurationManager(init.Configuration);
            game = new Game(env, latencyResolver, init.ShipID);
            GAME_GLOBALS.Game = game;
            payloadDecompressor.LoadContracts(init.CompressionContracts);
            game.HUDManager.Initialize();
            screen.Initialize(game.HUDManager);

            game.ShipManager.MyShip.LatencyResolver = latencyResolver;
            game.ShipManager.MyShip.Initialize(screen);

            StartUpdateLoop();
            env.server.readyForPayloads();
        } else {
            alert("Refresh your page");
        }
    }

    function StartUpdateLoop() {
        (window).requestAnimFrame = (function () {
            return window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || (window).msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, configurationManager.gameConfig.UPDATE_INTERVAL);
            };
        })();

        (function animloop() {
            (window).requestAnimFrame(animloop);

            if (gameInfoReceived) {
                game.Update(lastPayload);
            }
        })();
    }

    function LoadMapInfo(info) {
        var myShip = game.ShipManager.MyShip;

        info.ShipsOnScreen = game.ShipManager.Ships;

        lastPayload = info;

        if (info.Notification) {
            game.HUDManager.NotificationManager.Notify(info.Notification, false);
        }

        if (info.KilledByName) {
            game.HUDManager.DeathScreen.YouDied.call(game.HUDManager.DeathScreen, info.KilledByName, info.KilledByPhoto);
            game.ShipManager.MyShip.MovementController.StopMovement();
        }

        myShip.Experience = info.Experience;
        myShip.ExperienceToNextLevel = info.ExperienceToNextLevel;

        game.HUDManager.MyRankings.LoadPosition(info.LeaderboardPosition, info.ShipsInWorld);

        game.ShipManager.MyShip.Update();
        game.ShipManager.MyShip.PayloadReceived(info);

        game.ShipManager.UpdateShips(info.Ships);
        game.PowerupManager.UpdatePowerups(info.Powerups, game.GameTime);

        game.ShipManager.MyShip.ReplayCommands(info.LastCommandProcessed);

        game.BulletManager.UpdateBullets(info.Bullets);

        gameInfoReceived = true;
    }

    // Small name in order to minimize payload
    env.client.d = function (compressedPayload) {
        LoadMapInfo(payloadDecompressor.Decompress(compressedPayload));
    };

    // Leaderboard request endpoint
    env.client.l = function (compressedLeaderboard) {
        game.HUDManager.Leaderboard.Load(payloadDecompressor.DecompressLeaderboard(compressedLeaderboard));
    };

    env.client.mapSizeIncreased = function (size) {
        Map.WIDTH = size.Width;
        Map.HEIGHT = size.Height;
        game.HUDManager.OnMapResize(size);
    };

    env.client.notify = function (msg) {
        alert(msg);
    };

    env.client.disconnect = function () {
        game.HUDManager.NotificationManager.Notify("You have been disconnected for being Idle too long.  Refresh the page to play again.", true);

        ($).connection.hub.stop();
    };

    env.client.controlTransferred = function () {
        game.HUDManager.NotificationManager.Notify("You have been disconnected!  The control for your ship has been transferred to your other login.", true);
        ($).connection.hub.stop();
    };

    env.client.pingBack = function () {
        latencyResolver.ServerPingBack();
    };

    if (registrationID) {
        delete state.RegistrationID;

        $("#DisplayName").html(state.DisplayName);
        $("#DisplayNameLB").html(state.DisplayName);
        $("#You").attr("src", state.Photo);
        $("#YouLB").attr("src", state.Photo);

        ($).cookie('shootr.state', JSON.stringify(state), { path: '/', expires: 30 });

        ($).connection.hub.start(function () {
            env.server.initializeClient(registrationID).done(function (value) {
                Initialize(value);
            });
        });
    }

    $("#logout").click(function () {
        // Clear cookies
        var c = document.cookie.split(";");
        for (var i = 0; i < c.length; i++) {
            var e = c[i].indexOf("=");
            var n = e > -1 ? c[i].substr(0, e) : c[i];
            document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

        window.location.href = window.location.href;
    });
});
//# sourceMappingURL=Main.js.map
