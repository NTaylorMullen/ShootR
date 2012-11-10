
$(window).load(function () {
    var env = $.connection.h;
    var game;
    var configurationManager = {
    };
    var screen = new GameScreen($("#game"), $("#gameWrapper"), false, env);
    var shipControllerFn = new ShipControllerFunctions(env);
    var touchController;

    screen.SendNewViewportToServer = function () {
    };
    function Initialize(init) {
        $.extend(GameScreen, init.Configuration.screenConfig);
        configurationManager.gameConfig = {
            UPDATE_INTERVAL: init.Configuration.gameConfig.UPDATE_INTERVAL
        };
        screen.Initialize();
        StartUpdateLoop();
        touchController = new TouchController(shipControllerFn.StartMovement, shipControllerFn.StopMovement, shipControllerFn.StopAndStartMovement, shipControllerFn.ResetMovement, shipControllerFn.shoot);
        touchController.Initialize(screen);
    }
    function StartUpdateLoop() {
        (window).requestAnimFrame = (function () {
            return (window).requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || (window).msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, configurationManager.gameConfig.UPDATE_INTERVAL);
            };
        })();
        (function animloop() {
            (window).requestAnimFrame(animloop);
            if(touchController) {
                Update();
            }
        })();
    }
    function Update() {
        CanvasContext.clear();
        touchController.Draw();
        CanvasContext.Render();
    }
    var stateCookie = $.cookie('shootr.state');
    var state = stateCookie ? JSON.parse(stateCookie) : {
    };
    var registrationID = state.RegistrationID;

    env.client.stopController = function (msg) {
        $.connection.hub.stop();
        alert(msg);
    };
    env.client.disconnect = function () {
        $.connection.hub.stop();
        alert("You have been disconnected for being Idle for too long.");
    };
    if(registrationID) {
        delete state.RegistrationID;
        $.cookie('shootr.state', JSON.stringify(state), {
            path: '/',
            expires: 30
        });
        $.connection.hub.start(function () {
            env.server.initializeController(registrationID).done(function (val) {
                if(!val.FailureMessage) {
                    Initialize(val);
                } else {
                    alert(val.FailureMessage);
                    $.connection.hub.stop();
                }
            });
        });
    }
    $("#logout").click(function () {
        var c = document.cookie.split(";");
        for(var i = 0; i < c.length; i++) {
            var e = c[i].indexOf("=");
            var n = e > -1 ? c[i].substr(0, e) : c[i];
            document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        window.location.href = window.location.href;
    });
});
//@ sourceMappingURL=controllerMain.js.map
