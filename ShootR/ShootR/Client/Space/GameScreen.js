var GameScreen = (function () {
    function GameScreen(_gameCanvas, _gameWrapper, _popUpHolder, _connection) {
        this._gameCanvas = _gameCanvas;
        this._gameWrapper = _gameWrapper;
        this._popUpHolder = _popUpHolder;
        this._connection = _connection;
        this.Viewport = this.UpdateViewport();
        var that = this;
        $(window).resize(function () {
            delay(function () {
                that.ScreenResizeEvent();
            }, 250);
        });
    }
    GameScreen.MAX_SCREEN_WIDTH = 10000;
    GameScreen.MAX_SCREEN_HEIGHT = 10000;
    GameScreen.MIN_SCREEN_WIDTH = -1;
    GameScreen.MIN_SCREEN_HEIGHT = -1;
    GameScreen.SCREEN_BUFFER_AREA = 0;
    GameScreen.prototype.Initialize = function (gamehud) {
        this._gameHUD = gamehud;
        this.ScreenResizeEvent();
    };
    GameScreen.prototype.TopOffset = function () {
        return 0;
    };
    GameScreen.prototype.BottomOffset = function () {
        return 0;
    };
    GameScreen.prototype.UpdateViewport = function () {
        return new Size(Math.max(Math.min($(window).width(), GameScreen.MAX_SCREEN_WIDTH), GameScreen.MIN_SCREEN_WIDTH), Math.max(Math.min($(window).height(), GameScreen.MAX_SCREEN_HEIGHT) - this.TopOffset() - this.BottomOffset(), GameScreen.MIN_SCREEN_HEIGHT));
    };
    GameScreen.prototype.UpdateGameCanvas = function () {
        this._gameCanvas.attr("width", this.Viewport.Width);
        this._gameCanvas.attr("height", this.Viewport.Height);
        this._gameWrapper.css("width", this.Viewport.Width);
        this._gameWrapper.css("height", this.Viewport.Height);
        if(this._popUpHolder) {
            this._popUpHolder.css("width", this.Viewport.Width);
            this._popUpHolder.css("height", this.Viewport.Height);
        }
    };
    GameScreen.prototype.UpdateGameCamera = function () {
        CanvasContext.Camera.View = new Size($(this._gameCanvas).width() + GameScreen.SCREEN_BUFFER_AREA);
    };
    GameScreen.prototype.SendNewViewportToServer = function () {
        this._connection.server.changeViewport(this.Viewport.Width, this.Viewport.Height);
    };
    GameScreen.prototype.UpdateScreen = function () {
        this.Viewport = this.UpdateViewport();
        this.UpdateGameCanvas();
        this.UpdateGameCamera();
        CanvasContext.UpdateSize(this.Viewport);
        this.SendNewViewportToServer();
        if(this._gameHUD) {
            this._gameHUD.OnScreenResize(this.Viewport);
        }
        $(this).triggerHandler("UpdateScreen");
    };
    GameScreen.prototype.ScreenResizeEvent = function () {
        var that = this;
        this.UpdateScreen();
        setTimeout(function () {
            that.UpdateScreen();
        }, 1500);
    };
    return GameScreen;
})();
//@ sourceMappingURL=GameScreen.js.map
