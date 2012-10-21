function ControlRequestManager(connection) {
    var that = this,
        controlRequest = $("#controlRequest"),
        stopControllers = $("#StopControlling");

    function ApplyClickHandlers() {
        $("#acceptControlRequest").click(function () {
            connection.server.acceptControlRequest();
            controlRequest.hide(500, function () {
                stopControllers.show(500);
            });
        });

        $("#declineControlRequest").click(function () {
            connection.server.declineControlRequest();
            controlRequest.hide(500);
        });

        stopControllers.click(function () {
            connection.server.stopRemoteControllers();
            stopControllers.hide(500);
        });
    }

    that.ControlRequest = function () {
        controlRequest.show(500);
    }

    that.ControllersStopped = function () {
        stopControllers.hide(500);
    }

    ApplyClickHandlers();
}