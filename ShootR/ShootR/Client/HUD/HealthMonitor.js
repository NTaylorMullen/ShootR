var HealthMonitor = (function () {
    function HealthMonitor(_myShip) {
        this._myShip = _myShip;
        this._maxHealth = Ship.START_LIFE;
        this._currentHealthBar = $("#Health");
        this._currentHealthHeart = $("#HealthHeart");
        this._whiteHeartIndicator = $("#WhiteHealthHeart");
        this._healthHolder = $("#HealthHolder");
        this._healthText = $("#HealthText");
        this._gameWrapper = $("#gameWrapper");
        this._whiteHeartVisible = true;
        this._lastHealth = this._myShip.LifeController.Health;
        this._halfHeartWidth = 0.5 * this._currentHealthHeart.width();
    }
    HealthMonitor.ANIMATE_SPEED = 500;
    HealthMonitor.BadThreshold = 0.3;
    HealthMonitor.HurtThreshold = 0.6;
    HealthMonitor.prototype.OnScreenResize = function () {
        this._lastHealth = -1;
        this.Update(true);
    };
    HealthMonitor.prototype.Update = function (supress) {
        if(this._myShip.LifeController.Health !== this._lastHealth) {
            this._maxHealth = this._myShip.MaxLife;
            if(this._myShip.LifeController.Health < this._lastHealth) {
                var healthDecrease = this._myShip.LifeController.Health - this._lastHealth;
                if(healthDecrease !== 0 && !supress) {
                    GAME_GLOBALS.AnimationManager.Add(new TextAnimation(healthDecrease.toString(), new Vector2(this._myShip.MovementController.Position.X + 0.5 * this._myShip.WIDTH, this._myShip.MovementController.Position.Y - 1.5 * this._myShip.HEIGHT), {
                        duration: 2000,
                        color: [
                            237, 
                            30, 
                            121
                        ],
                        fontSize: "36px SegoeUISemibold"
                    }));
                }
                if(this._myShip.LifeController.Health <= 0) {
                    this._whiteHeartIndicator.fadeOut(HealthMonitor.ANIMATE_SPEED);
                    this._whiteHeartVisible = false;
                }
            } else {
                if(!this._whiteHeartVisible) {
                    this._whiteHeartVisible = true;
                    this._whiteHeartIndicator.fadeIn(HealthMonitor.ANIMATE_SPEED);
                } else {
                    var healthIncrease = (this._myShip.LifeController.Health - this._lastHealth);
                    if(healthIncrease > 0 && !supress) {
                        GAME_GLOBALS.AnimationManager.Add(new TextAnimation("+" + healthIncrease, new Vector2(this._myShip.MovementController.Position.X + 0.5 * this._myShip.WIDTH, this._myShip.MovementController.Position.Y - 1.5 * this._myShip.HEIGHT), {
                            duration: 2000,
                            color: [
                                122, 
                                201, 
                                67
                            ],
                            fontSize: "36px SegoeUISemibold"
                        }));
                    }
                }
            }
            this._lastHealth = this._myShip.LifeController.Health;
            this._healthText.html(this._lastHealth + "/" + this._maxHealth);
            this._currentHealthBar.stop(true);
            this._currentHealthHeart.stop(true);
            var lifePercentage = (this._lastHealth / this._maxHealth);
            var holderWidth = this._healthHolder.width();
            var heartLeft = Math.min(Math.max((holderWidth * lifePercentage) - this._halfHeartWidth, 0), holderWidth - 2 * this._halfHeartWidth);
            var barColor;

            this._currentHealthHeart.removeClass("good hurt bad");
            if(lifePercentage <= HealthMonitor.BadThreshold) {
                this._currentHealthHeart.addClass("bad");
                barColor = GAME_GLOBALS.Colors.ShipBad;
            } else {
                if(lifePercentage <= HealthMonitor.HurtThreshold) {
                    this._currentHealthHeart.addClass("hurt");
                    barColor = GAME_GLOBALS.Colors.ShipHurt;
                } else {
                    this._currentHealthHeart.addClass("good");
                    barColor = GAME_GLOBALS.Colors.ShipGood;
                }
            }
            this._currentHealthHeart.animate({
                left: heartLeft
            }, HealthMonitor.ANIMATE_SPEED, "easeOutExpo");
            this._currentHealthBar.animate({
                width: (lifePercentage * 100) + '%',
                backgroundColor: barColor
            }, HealthMonitor.ANIMATE_SPEED, "easeOutExpo");
        }
    };
    return HealthMonitor;
})();
//@ sourceMappingURL=HealthMonitor.js.map
