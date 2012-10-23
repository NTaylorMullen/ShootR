/// <reference path="lib/jquery-1.6.4.js" />
/// <reference path="Game.js" />
/// <reference path="lib/jquery.spritify-0.0.0.js" />

$(window).load(function () {
    // The hub name is a single letter in order to reduce payload size
    var env = $.connection.h,
        game,
        configurationManager,
        screen = new Screen($("#game"), $("#gameWrapper"), false, env),
        shipControllerFn = new ShipControllerFunctions(env),
        touchController;

    screen.SendNewViewportToServer = function () { }; // Don't send viewport updates to the server   

    function Initialize(init) {
        $.extend(Screen.prototype, init.Configuration.screenConfig);
        configurationManager = {
            gameConfig: {
                UPDATE_INTERVAL: init.Configuration.gameConfig.UPDATE_INTERVAL
            }
        }
        screen.Initialize();

        StartUpdateLoop();

        touchController = new TouchController(shipControllerFn.StartMovement, shipControllerFn.StopMovement, shipControllerFn.StopAndStartMovement, shipControllerFn.ResetMovement, shipControllerFn.shoot);
        touchController.Initialize(screen);
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
