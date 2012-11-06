function ExperienceMonitor(gameHUD, MyShip) {
    var that = this,
        lastExperience = MyShip.Experience,
        lastLevel = 1,
        lastExperienceToNextLevel = MyShip.ExperienceToNextLevel,
        currentExperience = $("#Experience"),
        experienceBar = $("#ExperienceBar"),
        experienceAnimateSpeed = 500,
        currentLevel = $("#Level"),
        levelNotification = $("#levelNotification"),
        currentLevelNotification = $("#CurrentLevel_Notification"),
        popupHolder = $("#popUpHolder");

    that.Update = function () {
        if (MyShip.Experience !== lastExperience || MyShip.Level !== lastLevel ) {
            var experienceIncrease,
                experiencePercentage;

            // If the level has changed we need to animate a full bar to then re-fill
            if (MyShip.Level !== lastLevel) {
                experienceIncrease = lastExperienceToNextLevel - lastExperience + MyShip.Experience;
               
                MyShip.ResetTouchController();
                experienceBar.css('width', '0%'); // Reset to 0 so when we animate we're animating forward, not backward
                popupHolder.css("display", "block");
                currentLevelNotification.html(MyShip.Level);
                levelNotification.animate({top:0},1000).delay(3000).animate({top:-234},1000, function () {
                    popupHolder.css("display", "none");
                });
            }
            else {
                experienceIncrease = MyShip.Experience - lastExperience;
            }

            currentExperience.html(MyShip.Experience + "/" + MyShip.ExperienceToNextLevel);

            experiencePercentage = (MyShip.Experience / MyShip.ExperienceToNextLevel) * 100;

            if (experienceIncrease !== 0 && !isNaN(experienceIncrease)) {
                GAME_GLOBALS.AnimationManager.Add(new TextAnimation((experienceIncrease > 0) ? "+"+experienceIncrease : experienceIncrease, MyShip.MovementController.Position, { duration: 2000, color: [250, 182, 250] }));
            }

            currentExperience.stop(true);
            currentExperience.animate({ color: "#FFFFFF" }, experienceAnimateSpeed).animate({ color: "#7F7F7F" }, experienceAnimateSpeed);
            
            experienceBar.animate({ width: (experiencePercentage) + '%' }, experienceAnimateSpeed, "easeOutExpo");

            lastLevel = MyShip.Level;
            lastExperience = MyShip.Experience;
            lastExperienceToNextLevel = MyShip.ExperienceToNextLevel;           

            currentLevel.html(MyShip.Level);
        }
    }
}