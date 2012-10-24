function ExperienceMonitor(gameHUD, MyShip) {
    var that = this,
        lastExperience = MyShip.Experience,
        lastLevel = 1,
        lastExperienceToNextLevel = MyShip.ExperienceToNextLevel,
        currentExperience = $("#Experience"),
        experienceAnimateSpeed = 500,
        currentLevel = $("#Level"),
        levelNotification = $("#levelNotification");

    that.Update = function () {
        if (MyShip.Experience !== lastExperience || MyShip.Level !== lastLevel ) {
            var experienceIncrease,
                experiencePercentage;

            // If the level has changed we need to animate a full bar to then re-fill
            if (MyShip.Level !== lastLevel) {
                experienceIncrease = lastExperienceToNextLevel - lastExperience + MyShip.Experience;
               
                levelNotification.css("display", "block");
                $("#CurrentLevel_Notification").html(MyShip.Level);
                $("#popUpHolder").fadeIn(1000).fadeOut(1000, function () {
                    levelNotification.css("display", "none");
                });
            }
            else {
                experienceIncrease = MyShip.Experience - lastExperience;
            }

            currentExperience.html(MyShip.Experience + "/" + MyShip.ExperienceToNextLevel);

            experiencePercentage = (MyShip.Experience / MyShip.ExperienceToNextLevel) * 100;

            if (experienceIncrease !== 0 && !isNaN(experienceIncrease)) {
                GAME_GLOBALS.AnimationManager.Add(new TextAnimation((experienceIncrease > 0) ? "+"+experienceIncrease : experienceIncrease, MyShip.MovementController.Position.X, MyShip.MovementController.Position.Y, { duration: 2000, color: [250, 182, 250] }));
            }

            currentExperience.stop(true);
            currentExperience.animate({ color: "#FFFFFF" }, experienceAnimateSpeed).animate({ color: "#7F7F7F" }, experienceAnimateSpeed);

            lastLevel = MyShip.Level;
            lastExperience = MyShip.Experience;
            lastExperienceToNextLevel = MyShip.ExperienceToNextLevel;           

            currentLevel.html(MyShip.Level);
        }
    }
}