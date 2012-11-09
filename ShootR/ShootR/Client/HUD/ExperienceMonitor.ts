/// <reference path="../Ship/ShipController.ts" />

class ExperienceMonitor {
    static ANIMATE_SPEED: number = 500;

    private _lastExperience: number;
    private _lastLevel: number;
    private _lastExperienceToNextLevel: number;
    private _currentExperience: any = $("#Experience");
    private _experienceBar: any = $("#ExperienceBar");
    private _currentLevel: any = $("#Level");
    private _levelNotification: any = $("#levelNotification");
    private _currentLevelNotification: any = $("#CurrentLevel_Notification");
    private _popupHolder: any = $("#popUpHolder");

    constructor (private _gameHUD: any, private _myShip: ShipController) {
        this._lastExperience = this._myShip.Experience,
        this._lastLevel = 1,
        this._lastExperienceToNextLevel = this._myShip.ExperienceToNextLevel,
        this._currentExperience = $("#Experience"),
        this._experienceBar = $("#ExperienceBar"),
        this._currentLevel = $("#Level"),
        this._levelNotification = $("#levelNotification"),
        this._currentLevelNotification = $("#CurrentLevel_Notification"),
        this._popupHolder = $("#popUpHolder");
    }
        

    public Update(): void {
        var that = this;

        if (this._myShip.Experience !== this._lastExperience || this._myShip.Level !== this._lastLevel ) {
            var experienceIncrease,
                experiencePercentage;

            // If the level has changed we need to animate a full bar to then re-fill
            if (this._myShip.Level !== this._lastLevel) {
                experienceIncrease = this._lastExperienceToNextLevel - this._lastExperience + this._myShip.Experience;
               
                this._myShip.ResetTouchController();
                this._experienceBar.css('width', '0%'); // Reset to 0 so when we animate we're animating forward, not backward
                this._popupHolder.css("display", "block");
                this._currentLevelNotification.html(this._myShip.Level);
                this._levelNotification.animate({top:0},1000).delay(3000).animate({top:-234},1000, function () {
                    that._popupHolder.css("display", "none");
                });
            }
            else {
                experienceIncrease = this._myShip.Experience - this._lastExperience;
            }

            this._currentExperience.html(this._myShip.Experience + "/" + this._myShip.ExperienceToNextLevel);

            experiencePercentage = (this._myShip.Experience / this._myShip.ExperienceToNextLevel) * 100;

            if (experienceIncrease !== 0 && !isNaN(experienceIncrease)) {
                GAME_GLOBALS.AnimationManager.Add(new TextAnimation((experienceIncrease > 0) ? "+"+experienceIncrease : experienceIncrease, this._myShip.MovementController.Position, { duration: 2000, color: [250, 182, 250] }));
            }

            this._currentExperience.stop(true);
            this._currentExperience.animate({ color: "#FFFFFF" }, ExperienceMonitor.ANIMATE_SPEED).animate({ color: "#7F7F7F" }, ExperienceMonitor.ANIMATE_SPEED);
            
            this._experienceBar.animate({ width: (experiencePercentage) + '%' }, ExperienceMonitor.ANIMATE_SPEED, "easeOutExpo");

            this._lastLevel = this._myShip.Level;
            this._lastExperience = this._myShip.Experience;
            this._lastExperienceToNextLevel = this._myShip.ExperienceToNextLevel;           

            this._currentLevel.html(this._myShip.Level);
        }
    }
}