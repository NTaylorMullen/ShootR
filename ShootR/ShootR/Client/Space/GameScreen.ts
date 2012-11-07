/// <reference path="../Space/CanvasRenderer.ts" />
/// <reference path="../Utilities/UtilityFunctions.ts" />

declare var $;

class GameScreen {
    // Initially set to really high, this will be changed by the configuration
    static MAX_SCREEN_WIDTH: number = 10000;
    static MAX_SCREEN_HEIGHT: number = 10000;
    static MIN_SCREEN_WIDTH: number = -1;
    static MIN_SCREEN_HEIGHT: number = -1;
    static SCREEN_BUFFER_AREA: number;

    public Viewport: Size;

    private _gameHUD: any;

    constructor (private _gameCanvas: any, private _gameWrapper: any, private _popUpHolder: any, private _connection: any) {
        this.Viewport = this.UpdateViewport();

        var that = this;
        $(window).resize(function () {
            // Wait till window has officially finished resizing (wait a quarter second).
            delay(function () {
                that.ScreenResizeEvent();
            }, 250);
        });
    }
    
    public Initialize(gamehud): void {
        this._gameHUD = gamehud;
        this.ScreenResizeEvent();
    }

    public TopOffset(): number {
        return 0;
    }

    public BottomOffset(): number {
        return 0;
    }

    public UpdateViewport(): Size {
        return new Size(
            Math.max(Math.min($(window).width(), GameScreen.MAX_SCREEN_WIDTH), GameScreen.MIN_SCREEN_WIDTH),
            Math.max(Math.min($(window).height(), GameScreen.MAX_SCREEN_HEIGHT) - this.TopOffset() - this.BottomOffset(), GameScreen.MIN_SCREEN_HEIGHT)
        );
    }

    private UpdateGameCanvas(): void {
        this._gameCanvas.attr("width", this.Viewport.Width);
        this._gameCanvas.attr("height", this.Viewport.Height);
        this._gameWrapper.css("width", this.Viewport.Width);
        this._gameWrapper.css("height", this.Viewport.Height);

        if (this._popUpHolder) {
            this._popUpHolder.css("width", this.Viewport.Width);
            this._popUpHolder.css("height", this.Viewport.Height);
        }
    }

    private UpdateGameCamera(): void {
        CanvasContext.Camera.View = new Size($(this._gameCanvas).width() + GameScreen.SCREEN_BUFFER_AREA);
    }

    public SendNewViewportToServer(): void {
        this._connection.server.changeViewport(this.Viewport.Width, this.Viewport.Height);
    }

    private UpdateScreen() {
        this.Viewport = this.UpdateViewport();

        this.UpdateGameCanvas();
        this.UpdateGameCamera();
        CanvasContext.UpdateSize(this.Viewport);

        this.SendNewViewportToServer();

        if (this._gameHUD) {
            this._gameHUD.OnScreenResize(this.Viewport);
        }

        $(this).triggerHandler("UpdateScreen");
    }

    private ScreenResizeEvent(): void {
        var that = this;
        this.UpdateScreen();
        setTimeout(function () {
            that.UpdateScreen();
        }, 1500); // Re-calculate in-case there were scrollbars
    }
}