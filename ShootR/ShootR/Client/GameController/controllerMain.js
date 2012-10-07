/// <reference path="lib/jquery-1.6.4.js" />
/// <reference path="Game.js" />
/// <reference path="lib/jquery.spritify-0.0.0.js" />

$(function () {
    // The hub name is a single letter in order to reduce payload size
    var env = $.connection.h,
        game,
        configurationManager,
        screen = new Screen($("#game"), $("#gameWrapper"), env),
        shipControllerFn = new ShipControllerFunctions(env),
        touchController = new TouchController(shipControllerFn.StartMovement, shipControllerFn.StopMovement, shipControllerFn.StopAndStartMovement, shipControllerFn.ResetMovement, shipControllerFn.shoot);

    screen.SendNewViewportToServer = function () { }; // Don't send viewport updates to the server

    var resultSpan = $("#SuccessTab span"),
        holder = $("#ControllerRequestHolder");

    touchController.Initialize(screen);

    function Initialize(init) {
        $.extend(Screen.prototype, init.Configuration.screenConfig);
        configurationManager = {
            gameConfig: {
                UPDATE_INTERVAL: init.Configuration.gameConfig.UPDATE_INTERVAL
            }
        }
        screen.Initialize();

        StartUpdateLoop();

        $("#requestControl").click(function () {
            resultSpan.attr("class", "");
            resultSpan.html("Loading...");
            $("#RequestTab").hide();
            $("#SuccessTab").show(500, function () {
                env.requestControlOf($("#shipToControl").val()).done(function (result) {
                    if (result) {
                        resultSpan.html("Pending......");
                    }
                    else {
                        resultSpan.html("Failure!");

                        $("#SuccessTab").hide(500, function () {
                            $("#RequestTab").show();
                        });

                    }
                });
            });
        });
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

            Update();
        })();
    }

    function Update() {
        CanvasContext.clear();

        touchController.Draw();

        CanvasContext.Render();
    }

    env.controlRequestAccepted = function () {
        resultSpan.attr("class", "success");
        resultSpan.html("Success");
        holder.fadeOut(500);        
    }

    env.controlRequestDeclined = function () {
        resultSpan.attr("class", "denied");
        resultSpan.html("Denied");
        $("#SuccessTab").hide(500, function () { $("#RequestTab").show(); });        
    }

    $.connection.hub.start(function () {
        env.initializeController().done(function (val) {
            Initialize(val);
        });        
    });
});
