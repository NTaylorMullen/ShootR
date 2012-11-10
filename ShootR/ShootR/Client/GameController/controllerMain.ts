/// <reference path="../Space/GameScreen.ts" />
/// <reference path="ShipControllerFunctions.ts" />
/// <reference path="TouchController.ts" />
/// <reference path="../Game.ts" />
/// <reference path="../Configuration/ConfigurationManager.ts" />

declare var $, animloop;

$(window).load(function () {
    // The hub name is a single letter in order to reduce payload size
    var env = $.connection.h,
        configurationManager: any = {}, // Hack
        screen: GameScreen = new GameScreen($("#game"), $("#gameWrapper"), false, env),
        shipControllerFn: ShipControllerFunctions = new ShipControllerFunctions(env),
        touchController: TouchController;

    screen.SendNewViewportToServer = function () { }; // Don't send viewport updates to the server   

    function Initialize(init) {
        $.extend(GameScreen, init.Configuration.screenConfig);
        configurationManager.gameConfig = {
            UPDATE_INTERVAL: init.Configuration.gameConfig.UPDATE_INTERVAL
        }
        screen.Initialize();

        StartUpdateLoop();

        touchController = new TouchController(shipControllerFn.StartMovement, shipControllerFn.StopMovement, shipControllerFn.StopAndStartMovement, shipControllerFn.ResetMovement, shipControllerFn.shoot);
        touchController.Initialize(screen);
    }

    function StartUpdateLoop() {
        (<any>window).requestAnimFrame = (function () {
            return (<any>window).requestAnimationFrame ||
                    (<any>window).webkitRequestAnimationFrame ||
                    (<any>window).mozRequestAnimationFrame ||
                    (<any>window).oRequestAnimationFrame ||
                    (<any>window).msRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, configurationManager.gameConfig.UPDATE_INTERVAL);
                    };
        })();

        (function animloop() {
            (<any>window).requestAnimFrame(animloop);

            if (touchController) {
                Update();
            }
        })();
    }

    function Update() {
        CanvasContext.clear();

        touchController.Draw();

        CanvasContext.Render();
    }

    var stateCookie = $.cookie('shootr.state'),
        state = stateCookie ? JSON.parse(stateCookie) : {},
        registrationID = state.RegistrationID;

    env.client.stopController = function (msg) {
        $.connection.hub.stop();
        alert(msg);        
    }

    env.client.disconnect = function () {
        $.connection.hub.stop();
        alert("You have been disconnected for being Idle for too long.");        
    }

    if (registrationID) {
        delete state.RegistrationID;

        $.cookie('shootr.state', JSON.stringify(state), { path: '/', expires: 30 });

        $.connection.hub.start(function () {
            env.server.initializeController(registrationID).done(function (val) {
                if (!val.FailureMessage) {
                    Initialize(val);
                }
                else {
                    alert(val.FailureMessage);
                    $.connection.hub.stop();
                }
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
