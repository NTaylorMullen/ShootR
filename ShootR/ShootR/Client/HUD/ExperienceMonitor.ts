/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Ships/Ship.ts" />

module ShootR {

    export class ExperienceMonitor {
        public static ANIMATE_SPEED: number = 500;

        private _lastExperience: number;
        private _lastLevel: number;
        private _lastExperienceToNextLevel: number;
        private _currentExperience: JQuery = $("#Experience");
        private _experienceBar: JQuery = $("#ExperienceBar");
        private _currentLevel: JQuery = $("#Level");
        private _levelNotification: JQuery = $("#levelNotification");
        private _currentLevelNotification: JQuery = $("#CurrentLevel_Notification");
        private _popupHolder: JQuery = $("#popUpHolder");

        constructor() {
            this._lastExperience = 0;
            this._lastLevel = -1;
            this._lastExperienceToNextLevel = 0;
        }

        public Update(ship: Ship): void {
            var that: ExperienceMonitor = this;

            if (ship.LevelManager.Experience !== this._lastExperience || ship.LevelManager.Level !== this._lastLevel) {
                var experienceIncrease, experiencePercentage;

                // If the level has changed we need to animate a full bar to then re-fill
                if (ship.LevelManager.Level !== this._lastLevel) {
                    experienceIncrease = this._lastExperienceToNextLevel - this._lastExperience + ship.LevelManager.Experience;

                    this._experienceBar.css('width', '0%'); // Reset to 0 so when we animate we're animating forward, not backward
                    this._popupHolder.css("display", "block");
                    this._currentLevelNotification[0].innerHTML = ship.LevelManager.Level.toString();
                    this._levelNotification.animate({ top: 0 }, 1000).delay(3000).animate({ top: -234 }, 1000, function () {
                        that._popupHolder.css("display", "none");
                    });
                }
                else {
                    experienceIncrease = ship.LevelManager.Experience - this._lastExperience;
                }

                this._currentExperience[0].innerHTML = ship.LevelManager.Experience + "/" + ship.LevelManager.ExperienceToNextLevel;

                experiencePercentage = (ship.LevelManager.Experience / ship.LevelManager.ExperienceToNextLevel) * 100;                

                this._currentExperience.stop(true);
                this._currentExperience.animate({ color: "#FFFFFF" }, ExperienceMonitor.ANIMATE_SPEED).animate({ color: "#7F7F7F" }, ExperienceMonitor.ANIMATE_SPEED);

                this._experienceBar.animate({ width: (experiencePercentage) + '%' }, ExperienceMonitor.ANIMATE_SPEED, "easeOutExpo");

                this._lastLevel = ship.LevelManager.Level;
                this._lastExperience = ship.LevelManager.Experience;
                this._lastExperienceToNextLevel = ship.LevelManager.ExperienceToNextLevel;

                this._currentLevel[0].innerHTML = ship.LevelManager.Level.toString();
            }
        }
    }

}