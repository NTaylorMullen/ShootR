/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Ships/ShipLifeController.ts" />
/// <reference path="../Ships/Ship.ts" />
var ShootR;
(function (ShootR) {
    var HealthMonitor = (function () {
        function HealthMonitor() {
            this._maxHealth = ShootR.ShipLifeController.START_LIFE;
            this._currentHealthBar = $("#Health");
            this._currentHealthHeart = $("#HealthHeart");
            this._whiteHeartIndicator = $("#WhiteHealthHeart");
            this._healthHolder = $("#HealthHolder");
            this._healthText = $("#HealthText");
            this._gameWrapper = $("#gameWrapper");
            this._whiteHeartVisible = true;
            this._lastHealth = 0;
            this._halfHeartWidth = .5 * this._currentHealthHeart.width();
        }
        HealthMonitor.prototype.OnScreenResize = function () {
            this._lastHealth = -1;
        };

        HealthMonitor.prototype.Update = function (ship) {
            if (ship.LifeController.Health !== this._lastHealth) {
                this._maxHealth = ship.LifeController.MaxHealth;

                if (ship.LifeController.Health < this._lastHealth) {
                    if (ship.LifeController.Health <= 0) {
                        this._whiteHeartIndicator.fadeOut(HealthMonitor.ANIMATE_SPEED);
                        this._whiteHeartVisible = false;
                    }
                } else {
                    if (!this._whiteHeartVisible) {
                        this._whiteHeartVisible = true;
                        this._whiteHeartIndicator.fadeIn(HealthMonitor.ANIMATE_SPEED);
                    }
                }

                this._lastHealth = ship.LifeController.Health;
                this._healthText[0].innerHTML = this._lastHealth + "/" + this._maxHealth;
                this._currentHealthBar.stop(true);
                this._currentHealthHeart.stop(true);

                var lifePercentage = ship.LifeController.HealthPercent, holderWidth = this._healthHolder.width(), heartLeft = Math.min(Math.max((holderWidth * lifePercentage) - this._halfHeartWidth, 0), holderWidth - 2 * this._halfHeartWidth), barColor;

                this._currentHealthHeart.removeClass("good hurt bad");

                if (lifePercentage <= ShootR.ShipLifeController.BAD_THRESHOLD) {
                    this._currentHealthHeart.addClass("bad");
                    barColor = ShootR.ShipLifeController.BAD_COLOR;
                } else if (lifePercentage <= ShootR.ShipLifeController.HURT_THRESHOLD) {
                    this._currentHealthHeart.addClass("hurt");
                    barColor = ShootR.ShipLifeController.HURT_COLOR;
                } else {
                    this._currentHealthHeart.addClass("good");
                    barColor = ShootR.ShipLifeController.GOOD_COLOR;
                }

                this._currentHealthHeart.animate({ left: heartLeft }, HealthMonitor.ANIMATE_SPEED, "easeOutExpo");
                this._currentHealthBar.animate({ width: (lifePercentage * 100) + '%', backgroundColor: barColor }, HealthMonitor.ANIMATE_SPEED, "easeOutExpo");
            }
        };
        HealthMonitor.ANIMATE_SPEED = 500;
        return HealthMonitor;
    })();
    ShootR.HealthMonitor = HealthMonitor;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=HealthMonitor.js.map
