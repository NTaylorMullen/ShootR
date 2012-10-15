function HealthMonitor(MyShip) {
    var that = this,
        maxHealth = MyShip.START_LIFE,
        lastHealth = MyShip.Health,
        currentHealthBar = $("#Health"),
        healthHolder = $("#HealthHolder"),
        healthAnimateSpeed = 500,
        gameWrapper = $("#gameWrapper");

    that.Update = function () {
        if (MyShip.LifeController.Health !== lastHealth) {
            maxHealth = MyShip.MaxLife;
            // If we're taking damage
            if (MyShip.LifeController.Health < lastHealth) {
                gameWrapper.effect("shake", { distance: 3, direction: "up" }, 100);
            }

            lastHealth = MyShip.LifeController.Health;
            currentHealthBar.html(lastHealth + "/" + maxHealth);
            currentHealthBar.stop(true);

            var lifePercentage = (lastHealth / maxHealth) * 100;
            currentHealthBar.animate({ width: lifePercentage + '%' }, healthAnimateSpeed, "easeOutExpo");

            healthHolder.stop(true);
            if (lifePercentage <= 20) {
                healthHolder.animate({ borderColor: "#FFF700", borderWidth: 3 }, 700);
            }
            else if (lifePercentage <= 40) {
                healthHolder.animate({ borderColor: "#FF5900", borderWidth: 2 }, 700);
            }
            else if (lifePercentage <= 70) {
                healthHolder.animate({ borderColor: "#3BA7FF", borderWidth: 1 }, 700);
            }
            else {
                healthHolder.animate({ borderColor: "#FFFFFF", borderWidth: 1 }, 700);
            }
        }
    }
}