/// <reference path="../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/signalr/signalr.d.ts" />
/// <reference path="Utilities/UtilityFunctions.ts" />
/// <reference path="Server/ServerAdapter.ts" />

module ShootR {

    export class GameScreen {
        private _gameHUDHeight: number = $("#gameHUD").height();

        // Initially set to really high, this will be changed by the configuration
        public static MAX_SCREEN_WIDTH: number = 10000;
        public static MAX_SCREEN_HEIGHT: number = 10000;
        public static MIN_SCREEN_WIDTH: number = -1;
        public static MIN_SCREEN_HEIGHT: number = -1;
        public static SCREEN_BUFFER_AREA: number = 200;

        public Viewport: eg.Size2d;

        constructor(private _gameCanvas: JQuery, private _popUpHolder: JQuery, private _serverAdapter: Server.ServerAdapter) {
            this.Viewport = this.UpdateViewport();
            this.OnResize = new eg.EventHandler1<eg.Size2d>();
            this.OnResizeComplete = new eg.EventHandler();

            $(window).resize(() => {
                // Wait till window has officially finished resizing (wait a quarter second).
                delay(() => {
                    this.ScreenResizeEvent();
                }, 250);
            });

            this.ForceResizeCheck();
        }

        public OnResize: eg.EventHandler1<eg.Size2d>;
        public OnResizeComplete: eg.EventHandler;

        public ForceResizeCheck(): void {
            this.ScreenResizeEvent();
        }

        private UpdateGameCanvas(): void {
            this._gameCanvas.attr("width", this.Viewport.Width);
            this._gameCanvas.attr("height", this.Viewport.Height);

            if (this._popUpHolder) {
                this._popUpHolder.css("width", this.Viewport.Width);
                this._popUpHolder.css("height", this.Viewport.Height);
            }
        }

        private UpdateScreen(): void {
            this.Viewport = this.UpdateViewport();

            this.UpdateGameCanvas();

            this.SendNewViewportToServer();
            this.OnResize.Trigger(this.Viewport);
        }

        private ScreenResizeEvent(): void {
            this.UpdateScreen();
            setTimeout(() => {
                this.UpdateScreen();
                this.OnResizeComplete.Trigger();
            }, 1500); // Re-calculate in-case there were scrollbars
        }

        public UpdateViewport(): eg.Size2d {
            return new eg.Size2d(
                Math.max(Math.min($(window).width(), GameScreen.MAX_SCREEN_WIDTH), GameScreen.MIN_SCREEN_WIDTH),
                Math.max(Math.min($(window).height() - this._gameHUDHeight, GameScreen.MAX_SCREEN_HEIGHT), GameScreen.MIN_SCREEN_HEIGHT)
                );
        }

        public SendNewViewportToServer(): void {
            this._serverAdapter.Proxy.invoke("changeViewport", this.Viewport.Width, this.Viewport.Height);
        }
    }

}