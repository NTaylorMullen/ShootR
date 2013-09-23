/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="../Server/IPayloadDefinitions.ts" />
/// <reference path="ShipStatMonitor.ts" />
/// <reference path="HealthMonitor.ts" />
/// <reference path="ExperienceMonitor.ts" />
/// <reference path="RankingsManager.ts" />
/// <reference path="EnvironmentMonitor.ts" />
/// <reference path="LeaderboardManager.ts" />
/// <reference path="DeathScreen.ts" />
/// <reference path="NotificationManager.ts" />
var ShootR;
(function (ShootR) {
    var HUDManager = (function () {
        function HUDManager(_myShipId, _shipManager, keyboard, serverAdapter) {
            this._myShipId = _myShipId;
            this._shipManager = _shipManager;
            this._gameHUD = $("#gameHUD");
            this._doublePopupHolder = $("#doublePopupHolder");
            this._locationStats = $("#LocationStatisticsHolder");
            this._shipStats = $("#StatisticHolder");
            this._gameHUDHeight = this._gameHUD.height();
            this._shipStatMonitor = new ShootR.ShipStatMonitor();
            this._shipHealthMonitor = new ShootR.HealthMonitor();
            this._shipExperienceMonitor = new ShootR.ExperienceMonitor();
            this._rankingsManager = new ShootR.RankingsManager();
            this._environmentMonitor = new ShootR.EnvironmentMonitor();
            this._leaderboardManager = new ShootR.LeaderboardManager(this._myShipId, keyboard, serverAdapter);
            this._deathScreen = new ShootR.DeathScreen();
            this._notificationManager = new ShootR.NotificationManager(serverAdapter);
        }
        HUDManager.prototype.OnMapResize = function (newSize) {
        };

        HUDManager.prototype.OnScreenResize = function (newViewport) {
            this._gameHUD.css("width", newViewport.Width);
            this._gameHUD.css("height", this._gameHUDHeight);
            this._gameHUD.css("top", newViewport.Height - this._gameHUDHeight);
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
            this._doublePopupHolder.css("top", ((newViewport.Height - this._gameHUDHeight) / 2) - this._doublePopupHolder.height() / 2);
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
            }
        };
        return HUDManager;
    })();
    ShootR.HUDManager = HUDManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=HUDManager.js.map
