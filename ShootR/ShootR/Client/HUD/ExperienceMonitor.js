function ExperienceMonitor(gameHUD, MyShip) {
    var that = this,
        lastExperience = MyShip.Experience,
        lastLevel = 1,
        lastExperienceToNextLevel = MyShip.ExperienceToNextLevel,
        experienceHUD = $("#ExperienceHUD"),
        currentExperienceBar = $("#Experience"),
        experienceHolder = $("#ExperienceHolder"),
        experienceAnimateSpeed = 500,
        experienceHUDHeight = experienceHUD.height(),
        currentLevel = $("#CurrentLevel"),
        levelNotification = $("#levelNotification");

    that.OnScreenResize = function (newViewport) {
        experienceHUD.css("left", newViewport.Width / 2 - experienceHUD.width() / 2 - 1);
        experienceHUD.css("top", newViewport.Height - experienceHUDHeight - 2);
    }

    that.Update = function () {
        if (MyShip.Experience !== lastExperience || MyShip.Level !== lastLevel ) {
            var experienceIncrease,
                experiencePercentage;

            currentExperienceBar.stop(true);
            // If the level has changed we need to animate a full bar to then re-fill
            if (MyShip.Level !== lastLevel) {
                experienceIncrease = lastExperienceToNextLevel - lastExperience + MyShip.Experience;
               
                levelNotification.css("display", "block");
                $("#CurrentLevel_Notification").html(MyShip.Level);
                $("#popUpHolder").fadeIn(1000).fadeOut(1000, function () {
                    levelNotification.css("display", "none");
                });

                $(experienceHUD).fadeOut(1000).fadeIn(1000);

                currentExperienceBar.html(lastExperienceToNextLevel + "/" + lastExperienceToNextLevel);
                currentExperienceBar.animate({ width: '100%' }, experienceAnimateSpeed, "easeOutExpo",function () {
                    currentExperienceBar.html(MyShip.Experience + "/" + MyShip.ExperienceToNextLevel);
                    currentExperienceBar.css("width", "0%");
                });
            }
            else {
                currentExperienceBar.html(MyShip.Experience + "/" + MyShip.ExperienceToNextLevel);
                experienceIncrease = MyShip.Experience - lastExperience;
            }            

            experiencePercentage = (MyShip.Experience / MyShip.ExperienceToNextLevel) * 100;
            currentExperienceBar.animate({ width: experiencePercentage + '%' }, experienceAnimateSpeed, "easeOutExpo");

            if (experienceIncrease !== 0 && !isNaN(experienceIncrease)) {
                GAME_GLOBALS.AnimationManager.Add(new TextAnimation((experienceIncrease > 0) ? "+"+experienceIncrease : experienceIncrease, MyShip.MovementController.Position.X, MyShip.MovementController.Position.Y, { duration: 2000, color: [250, 182, 250] }));
            }

            lastLevel = MyShip.Level;
            lastExperience = MyShip.Experience;
            lastExperienceToNextLevel = MyShip.ExperienceToNextLevel;           

            currentLevel.html(MyShip.Level);
        }
    }
}