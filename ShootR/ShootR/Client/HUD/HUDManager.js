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
var ShootR;
(function (ShootR) {
    var HUDManager = (function () {
        function HUDManager(initialization, _shipManager, areaRenderer, keyboard, serverAdapter) {
            this._shipManager = _shipManager;
            this._gameHUD = $("#gameHUD");
            this._doublePopupHolder = $("#doublePopupHolder");
            this._locationStats = $("#LocationStatisticsHolder");
            this._shipStats = $("#StatisticHolder");
            this._logout = $("#logout");
            this._myShipId = initialization.ShipID;
            this._gameHUDHeight = this._gameHUD.height();
            this._shipStatMonitor = new ShootR.ShipStatMonitor();
            this._shipHealthMonitor = new ShootR.HealthMonitor();
            this._shipExperienceMonitor = new ShootR.ExperienceMonitor();
            this._rankingsManager = new ShootR.RankingsManager();
            this._environmentMonitor = new ShootR.EnvironmentMonitor(areaRenderer, this._shipManager.UserShipManager);
            this._leaderboardManager = new ShootR.LeaderboardManager(this._myShipId, keyboard, serverAdapter);
            this._deathScreen = new ShootR.DeathScreen();
            this._notificationManager = new ShootR.NotificationManager(serverAdapter);
            this._userInformationManager = new ShootR.UserInformationManager(initialization.UserInformation);
            this._chat = new ShootR.Chat(initialization.UserInformation, serverAdapter);

            this._logout.click(function () {
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
        HUDManager.prototype.OnScreenResize = function (newViewport) {
            this._gameHUD.css("width", newViewport.Width);
            this._gameHUD.css("height", this._gameHUDHeight);
            this._gameHUD.css("top", newViewport.Height);
            this._shipHealthMonitor.OnScreenResize();
            this.CenterDoublePopup(newViewport);

            if (newViewport.Width <= 1370) {
                this._locationStats.css("display", "none");
            } else {
                this._locationStats.css("display", "block");
            }

            if (newViewport.Width <= 1177) {
                this._shipStats.css("display", "none");
            } else {
                this._shipStats.css("display", "block");
            }
        };

        HUDManager.prototype.CenterDoublePopup = function (newViewport) {
            // The left is handled by the css
            this._doublePopupHolder.css("top", (newViewport.Height / 2) - this._doublePopupHolder.height() / 2);
        };

        HUDManager.prototype.LoadPayload = function (payload) {
            this._rankingsManager.LoadPayload(payload);
            this._environmentMonitor.LoadPayload(payload);
            this._deathScreen.LoadPayload(payload);
            this._notificationManager.LoadPayload(payload);
        };

        HUDManager.prototype.Update = function (gameTime) {
            var ship = this._shipManager.GetShip(this._myShipId);

            if (ship) {
                this._shipStatMonitor.Update(ship);
                this._shipHealthMonitor.Update(ship);
                this._shipExperienceMonitor.Update(ship);
                this._environmentMonitor.Update(ship);
                this._rankingsManager.Update(ship);
            }
        };
        return HUDManager;
    })();
    ShootR.HUDManager = HUDManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=HUDManager.js.map
