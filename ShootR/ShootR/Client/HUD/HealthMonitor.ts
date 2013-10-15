/// <reference path="../../Scripts/endgate-0.2.0.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Ships/ShipLifeController.ts" />
/// <reference path="../Ships/Ship.ts" />

module ShootR {

    export class HealthMonitor {
        public static ANIMATE_SPEED: number = 500;

        private _maxHealth: number = ShipLifeController.START_LIFE;
        private _lastHealth: number;
        private _currentHealthBar: JQuery = $("#Health");
        private _currentHealthHeart: JQuery = $("#HealthHeart");
        private _whiteHeartIndicator: JQuery = $("#WhiteHealthHeart");
        private _healthHolder: JQuery = $("#HealthHolder");
        private _healthText: JQuery = $("#HealthText");
        private _gameWrapper: JQuery = $("#gameWrapper");
        private _halfHeartWidth: number;
        private _whiteHeartVisible: boolean = true;

        constructor() {
            this._lastHealth = 0;
            this._halfHeartWidth = .5 * this._currentHealthHeart.width();
        }

        public OnScreenResize(): void {
            this._lastHealth = -1;
        }

        public Update(ship: Ship): void {
            if (ship.LifeController.Health !== this._lastHealth) {
                this._maxHealth = ship.LifeController.MaxHealth;
                // If we're taking damage
                if (ship.LifeController.Health < this._lastHealth) {
                    if (ship.LifeController.Health <= 0) {
                        this._whiteHeartIndicator.fadeOut(HealthMonitor.ANIMATE_SPEED);
                        this._whiteHeartVisible = false;
                    }
                }
                else {
                    if (!this._whiteHeartVisible) {
                        this._whiteHeartVisible = true;
                        this._whiteHeartIndicator.fadeIn(HealthMonitor.ANIMATE_SPEED);
                    }
                }

                this._lastHealth = ship.LifeController.Health;
                this._healthText[0].innerHTML = this._lastHealth + "/" + this._maxHealth;
                this._currentHealthBar.stop(true);
                this._currentHealthHeart.stop(true);

                var lifePercentage: number = ship.LifeController.HealthPercent,
                    holderWidth: number = this._healthHolder.width(),
                    heartLeft: number = Math.min(Math.max((holderWidth * lifePercentage) - this._halfHeartWidth, 0), holderWidth - 2 * this._halfHeartWidth),
                    barColor: eg.Graphics.Color;

                this._currentHealthHeart.removeClass("good hurt bad");

                if (lifePercentage <= ShipLifeController.BAD_THRESHOLD) {
                    this._currentHealthHeart.addClass("bad");
                    barColor = ShipLifeController.BAD_COLOR;
                }
                else if (lifePercentage <= ShipLifeController.HURT_THRESHOLD) {
                    this._currentHealthHeart.addClass("hurt");
                    barColor = ShipLifeController.HURT_COLOR;
                }
                else {
                    this._currentHealthHeart.addClass("good");
                    barColor = ShipLifeController.GOOD_COLOR;
                }

                this._currentHealthHeart.animate({ left: heartLeft }, HealthMonitor.ANIMATE_SPEED, "easeOutExpo");
                this._currentHealthBar.animate({ width: (lifePercentage * 100) + '%', backgroundColor: barColor }, HealthMonitor.ANIMATE_SPEED, "easeOutExpo");
            }
        }
    }


}