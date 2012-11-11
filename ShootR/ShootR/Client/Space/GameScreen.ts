/// <reference path="../Space/CanvasRenderer.ts" />
/// <reference path="../Utilities/Size.ts" />
/// <reference path="../Utilities/UtilityFunctions.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../HUD/HUDManager.ts" />

class GameScreen {
    // Initially set to really high, this will be changed by the configuration
    static MAX_SCREEN_WIDTH: number = 10000;
    static MAX_SCREEN_HEIGHT: number = 10000;
    static MIN_SCREEN_WIDTH: number = -1;
    static MIN_SCREEN_HEIGHT: number = -1;
    static SCREEN_BUFFER_AREA: number;

    public Viewport: Size;

    private _gameHUD: HUDManager;

    constructor (private _gameCanvas: JQuery, private _gameWrapper: JQuery, private _popUpHolder: any, private _connection: any) {
        this.Viewport = this.UpdateViewport();

        var that: GameScreen = this;
        $(window).resize(function () {
            // Wait till window has officially finished resizing (wait a quarter second).
            delay(function () {
                that.screenResizeEvent();
            }, 250);
        });
    }

    private updateGameCanvas(): void {
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

    private updateScreen(): void {
        this.Viewport = this.UpdateViewport();

        this.updateGameCanvas();
        this.UpdateGameCamera();

        CanvasContext.UpdateSize(this.Viewport);
        this.SendNewViewportToServer();

        if (this._gameHUD) {
            this._gameHUD.OnScreenResize(this.Viewport);
        }

        $(this).triggerHandler("UpdateScreen");
    }

    private screenResizeEvent(): void {
        var that = this;
        this.updateScreen();
        setTimeout(function () {
            that.updateScreen();
        }, 1500); // Re-calculate in-case there were scrollbars
    }

    public Initialize(gamehud?: HUDManager): void {
        this._gameHUD = gamehud;
        this.screenResizeEvent();
    }

    public UpdateViewport(): Size {
        return new Size(
            Math.max(Math.min($(window).width(), GameScreen.MAX_SCREEN_WIDTH), GameScreen.MIN_SCREEN_WIDTH),
            Math.max(Math.min($(window).height(), GameScreen.MAX_SCREEN_HEIGHT), GameScreen.MIN_SCREEN_HEIGHT)
        );
    }

    public SendNewViewportToServer(): void {
        this._connection.server.changeViewport(this.Viewport.Width, this.Viewport.Height);
    }
}