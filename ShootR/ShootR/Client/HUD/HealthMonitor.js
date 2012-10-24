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
                    whiteHeartIndicator.fadeIn(healthAnimateSpeed);
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
                barColor = "#ED1E79";
            }
            else if (lifePercentage <= .6) {
                currentHealthHeart.addClass("hurt");
                barColor = "#FF931E";
            }
            else {
                currentHealthHeart.addClass("good");
                barColor = "#7AC943";
            }

            currentHealthHeart.animate({ left: heartLeft }, healthAnimateSpeed, "easeOutExpo");
            currentHealthBar.animate({ width: (lifePercentage * 100) + '%', backgroundColor: barColor }, healthAnimateSpeed, "easeOutExpo");
        }
    }
}