function Screen(gameCanvas, gameWrapper, conn) {
    var that = this;

    // Set by configuration
    that.SCREEN_BUFFER_AREA;

    // Initially set to really high, this will be changed by the configuration
    Screen.prototype.MAX_SCREEN_WIDTH = 10000;
    Screen.prototype.MAX_SCREEN_HEIGHT = 10000;

    that.Initialize = function () {
        UpdateScreen();
    }

    function HeightOffset(obj) {
        return $(obj).height() + parseInt($(obj).css("margin-top")) + parseInt($(obj).css("margin-bottom"));
    }

    that.TopOffset = function () {
        return HeightOffset($("#shipStats"));
    };

    that.BottomOffset = function () {
        return HeightOffset($("#banner"));
    };

    that.UpdateViewport = function () {
        return {
            Width: Math.min($(window).width(), that.MAX_SCREEN_WIDTH),
            Height: Math.min($(window).height(), that.MAX_SCREEN_HEIGHT) - that.TopOffset() - that.BottomOffset()
        };
    }

    that.Viewport = that.UpdateViewport();

    function UpdateGameCanvas() {
        $(gameCanvas).attr("width", that.Viewport.Width);
        $(gameCanvas).attr("height", that.Viewport.Height);
        $(gameWrapper).css("width", that.Viewport.Width);
        $(gameWrapper).css("height", that.Viewport.Height);
    }

    function UpdateGameCamera() {
        CanvasContext.Camera.View.WIDTH = $(gameCanvas).width() + that.SCREEN_BUFFER_AREA;
        CanvasContext.Camera.View.HEIGHT = $(gameCanvas).height() + that.SCREEN_BUFFER_AREA;
    }

    function SendNewViewportToServer() {
        conn.changeViewport(that.Viewport.Width, that.Viewport.Height);
    }

    function UpdateScreen() {
        that.Viewport = that.UpdateViewport();

        UpdateGameCanvas();
        UpdateGameCamera();
        CanvasContext.UpdateSize(that.Viewport);

        SendNewViewportToServer();
    }

    $(window).resize(function () {
        // Wait till window has officially finished resizing (wait a quarter second).
        delay(function () {
            UpdateScreen();
        }, 250);
    });
}