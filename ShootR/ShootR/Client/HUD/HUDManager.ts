/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="../Server/IClientInitialization.ts" />
/// <reference path="../Space/AreaRenderer.ts" />
/// <reference path="ShipStatMonitor.ts" />
/// <reference path="HealthMonitor.ts" />
/// <reference path="ExperienceMonitor.ts" />
/// <reference path="RankingsManager.ts" />
/// <reference path="EnvironmentMonitor.ts" />
/// <reference path="LeaderboardManager.ts" />
/// <reference path="DeathScreen.ts" />
/// <reference path="NotificationManager.ts" />
/// <reference path="UserInformationManager.ts" />
/// <reference path="Chat.ts" />

module ShootR {

    export class HUDManager {
        private _gameHUD: JQuery = $("#gameHUD");
        private _doublePopupHolder: JQuery = $("#doublePopupHolder");
        private _gameHUDHeight: number;
        private _locationStats: JQuery = $("#LocationStatisticsHolder");
        private _shipStats: JQuery = $("#StatisticHolder");
        private _logout: JQuery = $("#logout");
        private _shipStatMonitor: ShipStatMonitor;
        private _shipHealthMonitor: HealthMonitor;
        private _shipExperienceMonitor: ExperienceMonitor;
        private _rankingsManager: RankingsManager;
        private _environmentMonitor: EnvironmentMonitor;
        private _leaderboardManager: LeaderboardManager;
        private _deathScreen: DeathScreen;
        private _notificationManager: NotificationManager;
        private _userInformationManager: UserInformationManager;
        private _chat: Chat;
        private _myShipId: number;

        constructor(initialization: Server.IClientInitialization, private _shipManager: ShipManager, areaRenderer: AreaRenderer, keyboard: eg.Input.KeyboardHandler, serverAdapter: Server.ServerAdapter) {
            this._myShipId = initialization.ShipID;
            this._gameHUDHeight = this._gameHUD.height();
            this._shipStatMonitor = new ShipStatMonitor();
            this._shipHealthMonitor = new HealthMonitor();
            this._shipExperienceMonitor = new ExperienceMonitor();
            this._rankingsManager = new RankingsManager();
            this._environmentMonitor = new EnvironmentMonitor(areaRenderer, this._shipManager.UserShipManager);
            this._leaderboardManager = new LeaderboardManager(this._myShipId, keyboard, serverAdapter);
            this._deathScreen = new DeathScreen();
            this._notificationManager = new NotificationManager(serverAdapter);
            this._userInformationManager = new UserInformationManager(initialization.UserInformation);
            this._chat = new Chat(initialization.UserInformation, serverAdapter);

            this._logout.click(() => {
                // Clear cookies
                var c = document.cookie.split(";");
                for (var i = 0; i < c.length; i++) {
                    var e = c[i].indexOf("=");
                    var n = e > -1 ? c[i].substr(0, e) : c[i];
                    document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }

                window.location.reload(true);
            });
        }

        public OnScreenResize(newViewport: eg.Size2d): void {
            this._gameHUD.css("width", newViewport.Width);
            this._gameHUD.css("height", this._gameHUDHeight);
            this._gameHUD.css("top", newViewport.Height);
            this._shipHealthMonitor.OnScreenResize();
            this.CenterDoublePopup(newViewport);

            // Remove or Add HUD objects
            if (newViewport.Width <= 1370) {
                this._locationStats.css("display", "none");
            }
            else {
                this._locationStats.css("display", "block");
            }

            // Remove or Add HUD objects
            if (newViewport.Width <= 1177) {
                this._shipStats.css("display", "none");
            }
            else {
                this._shipStats.css("display", "block");
            }
        }

        public CenterDoublePopup(newViewport: eg.Size2d): void {
            // The left is handled by the css
            this._doublePopupHolder.css("top", (newViewport.Height / 2) - this._doublePopupHolder.height() / 2);
        }

        public LoadPayload(payload: Server.IPayloadData): void {
            this._rankingsManager.LoadPayload(payload);
            this._environmentMonitor.LoadPayload(payload);
            this._deathScreen.LoadPayload(payload);
            this._notificationManager.LoadPayload(payload);
        }

        public Update(gameTime: eg.GameTime): void {
            var ship: Ship = this._shipManager.GetShip(this._myShipId);

            if (ship) {
                this._shipStatMonitor.Update(ship);
                this._shipHealthMonitor.Update(ship);
                this._shipExperienceMonitor.Update(ship);
                this._environmentMonitor.Update(ship);
                this._rankingsManager.Update(ship);
            }
        }
    }

}