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

    var resultSpan = $("#SuccessTab span"),
        holder = $("#ControllerRequestHolder");    

    function Initialize(init) {
        $.extend(Screen.prototype, init.Configuration.screenConfig);
        configurationManager = {
            gameConfig: {
                UPDATE_INTERVAL: init.Configuration.gameConfig.UPDATE_INTERVAL
            }
        }
        screen.Initialize();

        StartUpdateLoop();
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

            if (touchController && touchController.Enabled) {
                Update();
            }
        })();
    }

    function Update() {
        CanvasContext.clear();

        touchController.Draw();

        CanvasContext.Render();
    }

    env.client.stopController = function () {
        touchController.Enabled = false;
        $("#StopControlling").hide(500);
        $("#RequestTab").show();
        $("#SuccessTab").hide();
        holder.fadeIn(500);
    }

    env.client.controlRequestAccepted = function () {
        resultSpan.attr("class", "success");
        resultSpan.html("Success");
        holder.fadeOut(500);

        if (!touchController) {
            touchController = new TouchController(shipControllerFn.StartMovement, shipControllerFn.StopMovement, shipControllerFn.StopAndStartMovement, shipControllerFn.ResetMovement, shipControllerFn.shoot);
            touchController.Initialize(screen);
        }
        else {
            touchController.Enabled = true;
        }

        $("#StopControlling").show(500);        
    }

    $("#StopControlling").click(function () {
        env.server.stopControlling().done(env.client.stopController);
    });

    env.client.controlRequestDeclined = function () {
        resultSpan.attr("class", "denied");
        resultSpan.html("Denied");
        $("#SuccessTab").hide(1000, function () { $("#RequestTab").show(); });
    }

    $("#shipToControl").keyup(function (e) {
        if (e.keyCode == 13) {
            $("#requestControl").click();
        }
    });

    $.connection.hub.start(function () {
        env.server.initializeController().done(function (val) {
            Initialize(val);
        });
    });

    $("#requestControl").click(function () {
        resultSpan.attr("class", "");
        resultSpan.html("Loading...");
        $("#RequestTab").hide();
        $("#SuccessTab").show(500, function () {
            env.server.requestControlOf($("#shipToControl").val()).done(function (result) {
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


});
