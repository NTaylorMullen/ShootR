/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Server/ServerAdapter.ts" />
/// <reference path="ShipStatMonitor.ts" />
/// <reference path="HealthMonitor.ts" />
/// <reference path="ExperienceMonitor.ts" />

module ShootR {

    export class HUDManager {
        private _gameHUD: JQuery = $("#gameHUD");
        private _doublePopupHolder: JQuery = $("#doublePopupHolder");
        private _gameHUDHeight: number;
        private _locationStats: JQuery = $("#LocationStatisticsHolder");
        private _shipStats: JQuery = $("#StatisticHolder");
        private _shipStatMonitor: ShipStatMonitor;
        private _shipHealthMonitor: HealthMonitor;
        private _shipExperienceMonitor: ExperienceMonitor;

        constructor(private _myShipId: number, private _shipManager: ShipManager, serverAdapter: Server.ServerAdapter) {
            this._gameHUDHeight = this._gameHUD.height();
            this._shipStatMonitor = new ShipStatMonitor();
            this._shipHealthMonitor = new HealthMonitor();
            this._shipExperienceMonitor = new ExperienceMonitor();
        }

        public OnMapResize(newSize: eg.Size2d): void {
        }

        public OnScreenResize(newViewport: eg.Size2d): void {
            this._gameHUD.css("width", newViewport.Width);
            this._gameHUD.css("height", this._gameHUDHeight);
            this._gameHUD.css("top", newViewport.Height - this._gameHUDHeight);
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
            this._doublePopupHolder.css("top", ((newViewport.Height - this._gameHUDHeight) / 2) - this._doublePopupHolder.height() / 2);
        }

        public Update(gameTime: eg.GameTime): void {
            var ship: Ship = this._shipManager.GetShip(this._myShipId);

            if (ship) {
                this._shipStatMonitor.Update(ship);
                this._shipHealthMonitor.Update(ship);
                this._shipExperienceMonitor.Update(ship);
            }
        }
    }

}