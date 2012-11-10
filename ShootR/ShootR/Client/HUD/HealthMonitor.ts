/// <reference path="../Ship/ShipController.ts" />
/// <reference path="Animation/TextAnimation.ts" />

class HealthMonitor {
    static ANIMATE_SPEED: number = 500;
    static BadThreshold: number = .3;
    static HurtThreshold: number = .6;

    private _maxHealth: number = Ship.START_LIFE;
    private _lastHealth: number;
    private _currentHealthBar: JQuery = $("#Health");
    private _currentHealthHeart: JQuery = $("#HealthHeart");
    private _whiteHeartIndicator: JQuery = $("#WhiteHealthHeart");
    private _healthHolder: JQuery = $("#HealthHolder");
    private _healthText: JQuery = $("#HealthText");
    private _gameWrapper: JQuery = $("#gameWrapper");
    private _halfHeartWidth: number;
    private _whiteHeartVisible: bool = true;

    constructor (private _myShip: ShipController) {
        this._lastHealth = this._myShip.LifeController.Health;
        this._halfHeartWidth = .5 * this._currentHealthHeart.width();
    }

    public OnScreenResize(): void {
        this._lastHealth = -1;
        this.Update(true);
    }

    public Update(supress?: bool): void {
        if (this._myShip.LifeController.Health !== this._lastHealth) {
            this._maxHealth = this._myShip.MaxLife;
            // If we're taking damage
            if (this._myShip.LifeController.Health < this._lastHealth) {
                var healthDecrease = this._myShip.LifeController.Health - this._lastHealth;

                if (healthDecrease !== 0 && !supress) {
                    GAME_GLOBALS.AnimationManager.Add(new TextAnimation(healthDecrease.toString(), new Vector2(this._myShip.MovementController.Position.X + .5 * this._myShip.WIDTH, this._myShip.MovementController.Position.Y - 1.5 * this._myShip.HEIGHT), { duration: 2000, color: [237, 30, 121], fontSize: "36px SegoeUISemibold" }));
                }

                if (this._myShip.LifeController.Health <= 0) {
                    this._whiteHeartIndicator.fadeOut(HealthMonitor.ANIMATE_SPEED);
                    this._whiteHeartVisible = false;
                }
            }
            else {
                if (!this._whiteHeartVisible) {
                    this._whiteHeartVisible = true;
                    this._whiteHeartIndicator.fadeIn(HealthMonitor.ANIMATE_SPEED);
                }
                else {
                    var healthIncrease = (this._myShip.LifeController.Health - this._lastHealth);
                    if (healthIncrease > 0 && !supress) {
                        GAME_GLOBALS.AnimationManager.Add(new TextAnimation("+" + healthIncrease, new Vector2(this._myShip.MovementController.Position.X + .5 * this._myShip.WIDTH, this._myShip.MovementController.Position.Y - 1.5 * this._myShip.HEIGHT), { duration: 2000, color: [122, 201, 67], fontSize: "36px SegoeUISemibold" }));
                    }
                }
            }

            this._lastHealth = this._myShip.LifeController.Health;
            this._healthText.html(this._lastHealth + "/" + this._maxHealth);
            this._currentHealthBar.stop(true);
            this._currentHealthHeart.stop(true);

            var lifePercentage: number = (this._lastHealth / this._maxHealth),
            holderWidth: number = this._healthHolder.width(),
            heartLeft: number = Math.min(Math.max((holderWidth * lifePercentage) - this._halfHeartWidth, 0), holderWidth - 2 * this._halfHeartWidth),
            barColor: string;

            this._currentHealthHeart.removeClass("good hurt bad")
            if (lifePercentage <= HealthMonitor.BadThreshold) {
                this._currentHealthHeart.addClass("bad");
                barColor = GAME_GLOBALS.Colors.ShipBad;
            }
            else if (lifePercentage <= HealthMonitor.HurtThreshold) {
                this._currentHealthHeart.addClass("hurt");
                barColor = GAME_GLOBALS.Colors.ShipHurt;
            }
            else {
                this._currentHealthHeart.addClass("good");
                barColor = GAME_GLOBALS.Colors.ShipGood;
            }

            this._currentHealthHeart.animate({ left: heartLeft }, HealthMonitor.ANIMATE_SPEED, "easeOutExpo");
            this._currentHealthBar.animate({ width: (lifePercentage * 100) + '%', backgroundColor: barColor }, HealthMonitor.ANIMATE_SPEED, "easeOutExpo");
        }
    }
}

