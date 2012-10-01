/// <reference path="lib/jquery-1.6.4.js" />
/// <reference path="Game.js" />
/// <reference path="lib/jquery.spritify-0.0.0.js" />

$(function () {
    // The hub name is a single letter in order to reduce payload size
    var env = $.connection.h,
        game,
        configurationManager,
        payloadDecompressor = new PayloadDecompressor(),
        gameInfoReceived = false,
        lastPayload = { Ships: {}, Bullets: [] };

    function Initialize(init) {
        configurationManager = new ConfigurationManager(init.Configuration);
        game = new Game(env, init.ShipID);
        payloadDecompressor.LoadContracts(init.CompressionContracts);

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

        (function animloop() {
            requestAnimFrame(animloop);

            if (gameInfoReceived) {
                game.Update(lastPayload);
            }
        })();

        env.readyForPayloads();
    }

    function LoadMapInfo(info) {
        lastPayload = info;
        gameInfoReceived = true;

        if (info.MovementReceivedAt) {
            game.ShipManager.MyShip.acknowledgeMovement(info.MovementReceivedAt);
        }

        game.ShipManager.UpdateShips(info.Ships);
        game.BulletManager.UpdateBullets(info.Bullets);
    }

    // Small name in order to minimize payload
    env.d = function (compressedPayload) {
        LoadMapInfo(payloadDecompressor.Decompress(compressedPayload));
    }

    env.RemoveShip = function (connectionID) {
        game.ShipManager.RemoveShip(connectionID);
    }

    env.updateShipName = function (newName) {
        $("#ShipName").val(newName);
    }

    $.connection.hub.start().done(function () {
        env.initializeClient().done(function (value) {
            Initialize(value);
        });
    });
});
