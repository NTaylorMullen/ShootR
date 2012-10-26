function HealthMonitor(MyShip) {
    var that = this,
        maxHealth = MyShip.START_LIFE,
        lastHealth = MyShip.Health,
        currentHealthBar = $("#Health"),
        currentHealthHeart = $("#HealthHeart"),
        whiteHeartIndicator = $("#WhiteHealthHeart"),
        healthHolder = $("#HealthHolder"),
        healthText = $("#HealthText"),
        healthAnimateSpeed = 500,
        gameWrapper = $("#gameWrapper"),
        halfHeartWidth = .5 * currentHealthHeart.width(),
        whiteHeartVisible = true;

    that.Update = function () {
        if (MyShip.LifeController.Health !== lastHealth) {
            maxHealth = MyShip.MaxLife;
            // If we're taking damage
            if (MyShip.LifeController.Health < lastHealth) {
                gameWrapper.effect("shake", { distance: 3, direction: "up" }, 100);
                if (MyShip.LifeController.Health <= 0) {
                    whiteHeartIndicator.fadeOut(healthAnimateSpeed);
                    whiteHeartVisible = false;
                }
            }
            else {
                if (!whiteHeartVisible) {
                    whiteHeartVisible = true;
                    whiteHeartIndicator.fadeIn(healthAnimateSpeed);
                }
                else {
                    var healthIncrease = (MyShip.LifeController.Health - lastHealth);
                    if(healthIncrease >= 0) {
                        GAME_GLOBALS.AnimationManager.Add(new TextAnimation("+" + healthIncrease, MyShip.MovementController.Position.X + .5* MyShip.WIDTH, MyShip.MovementController.Position.Y - 1.5 * MyShip.HEIGHT, { duration: 2000, color: [122, 201, 67], fontSize: "36px verdana" }));
                    }
                }
            }

            lastHealth = MyShip.LifeController.Health;
            healthText.html(lastHealth + "/" + maxHealth);
            currentHealthBar.stop(true);
            currentHealthHeart.stop(true);

            var lifePercentage = (lastHealth / maxHealth),
                holderWidth = healthHolder.width(),
                heartLeft = Math.min(Math.max((holderWidth * lifePercentage) - halfHeartWidth, 0), holderWidth - 2 * halfHeartWidth),
                barColor;

            currentHealthHeart.removeClass("good hurt bad")
            if (lifePercentage <= .3) {
                currentHealthHeart.addClass("bad");
                barColor = GAME_GLOBALS.Colors.ShipBad;
            }
            else if (lifePercentage <= .6) {
                currentHealthHeart.addClass("hurt");
                barColor = GAME_GLOBALS.Colors.ShipHurt;
            }
            else {
                currentHealthHeart.addClass("good");
                barColor = GAME_GLOBALS.Colors.ShipGood;
            }

            currentHealthHeart.animate({ left: heartLeft }, healthAnimateSpeed, "easeOutExpo");
            currentHealthBar.animate({ width: (lifePercentage * 100) + '%', backgroundColor: barColor }, healthAnimateSpeed, "easeOutExpo");
        }
    }
}