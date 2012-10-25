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
        lastPayload = { Ships: {}, Bullets: [] };

    var stateCookie = $.cookie('shootr.state'),
        state = stateCookie ? JSON.parse(stateCookie) : {},
        registrationID = state.RegistrationID;

    function Initialize(init) {
        configurationManager = new ConfigurationManager(init.Configuration);
        game = new Game(env, latencyResolver, init.ShipID);
        GAME_GLOBALS.Game = game;
        payloadDecompressor.LoadContracts(init.CompressionContracts);
        game.HUDManager.Initialize(init);
        screen.Initialize(game.HUDManager);

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
        var myShip = game.ShipManager.MyShip;

        info.ShipsOnScreen = game.ShipManager.Ships;

        lastPayload = info;
        gameInfoReceived = true;

        if (info.Notification) {
            $("#Notification").html(info.Notification);
            $('#Notification').css({ top: '50%', left: '50%', margin: '-' + ($('#Notification').height() / 2) + 'px 0 0 -' + ($('#Notification').width() / 2) + 'px' });
            $("#Notification").fadeIn(1000).fadeOut(4000);
        }

        if (info.KilledByName) {
            game.HUDManager.DeathScreen.YouDied(info.KilledByName, info.KilledByPhoto);
        }

        myShip.Experience = info.Experience;
        myShip.ExperienceToNextLevel = info.ExperienceToNextLevel;

        game.HUDManager.MyRankings.LoadPosition(info.LeaderboardPosition, info.ShipsInWorld);

        game.ShipManager.MyShip.PayloadReceived(info);

        game.ShipManager.UpdateShips(info.Ships);

        game.ShipManager.MyShip.ReplayCommands(info.LastCommandProcessed);

        game.BulletManager.UpdateBullets(info.Bullets);
    }

    // Small name in order to minimize payload
    env.client.d = function (compressedPayload) {
        LoadMapInfo(payloadDecompressor.Decompress(compressedPayload));
    }

    // Leaderboard request endpoint
    env.client.l = function (compressedLeaderboard) {
        game.HUDManager.Leaderboard.Load(payloadDecompressor.DecompressLeaderboard(compressedLeaderboard, game.ShipManager.MyShip.Name));
    }

    env.client.mapSizeIncreased = function (size) {
        Map.prototype.WIDTH = size.Width;
        Map.prototype.HEIGHT = size.Height;
    }

    env.client.notify = function (msg) {
        alert(msg);
    }

    env.client.pingBack = latencyResolver.ServerPingBack;    

    if (registrationID) {
        delete state.RegistrationID;

        $("#DisplayName").html(state.DisplayName);
        $("#DisplayNameLB").html(state.DisplayName);
        $("#You").attr("src", state.Photo);
        $("#YouLB").attr("src", state.Photo);

        $.cookie('shootr.state', JSON.stringify(state), { path: '/', expires: 30 });

        $.connection.hub.start(function () {
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

        window.location.href = window.location.href
    });
});
