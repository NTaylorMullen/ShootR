/// <reference path="../Collidable/Collidable.ts" />
/// <reference path="ShipAnimationHandler.ts" />
/// <reference path="ShipMovementController.ts" />
/// <reference path="../Abilities/AbilityHandlers/ShipAbilityHandler.ts" />
/// <reference path="../Utilities/GameTime.ts" />
/// <reference path="../GameGlobals.ts" />
/// <reference path="../Managers/spritify.ts" />
/// <reference path="../Utilities/ImageAssets.ts" />
/// <reference path="ShipAnimationHandler.ts" />
/// <reference path="../HUD/HealthMonitor.ts" />
/// <reference path="../Space/CanvasRenderer.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship(properties) {
        _super.call(this);
        this.MovementController = new ShipMovementController(Vector2.Zero());

        this.UpdateProperties(properties);

        this.WIDTH = Ship.WIDTH;
        this.HEIGHT = Ship.HEIGHT;
        this._maxWidth = this.WIDTH * .8;
        this._xOffset = (this.WIDTH - this._maxWidth) * .5;

        this.AnimationHandler = new ShipAnimationHandler(this);
        this.ShipAbilityHandler = new ShipAbilityHandler(this);
    }
    Ship.prototype.Destroy = function () {
        if (!this.LifeController.Alive) {
            // We want to explode
            GAME_GLOBALS.AnimationManager.Add(new spritify({
                image: IMAGE_ASSETS.BigExplosion,
                centerOn: { X: this.MovementController.Position.X + Ship.HALF_WIDTH, Y: this.MovementController.Position.Y + Ship.HALF_HEIGHT },
                frameCount: 30,
                fps: 25,
                spriteSheetSize: new Size(768, 640),
                frameSize: new Size(128, 128),
                Rotation: this.MovementController.Rotation
            }));
        }

        this.Visible = false;
    };

    Ship.prototype.Update = function (gameTime) {
        var PercentOfSecond = CalculatePOS(this.LastUpdated);
        this.UpdateFromSecond(PercentOfSecond);
    };

    Ship.prototype.UpdateFromSecond = function (percentOfSecond) {
        var now = new Date();

        this.MovementController.Update(percentOfSecond, now);
        this.AnimationHandler.Update(now);
        this.AnimationHandler.DrawDamage();
        this.ShipAbilityHandler.Update(now);
        this.LastUpdated = now;
    };

    Ship.prototype.DrawHealthBar = function () {
        if (this._lastHealth !== this.LifeController.Health) {
            this._currentHealthPercentage = this.LifeController.Health / this.MaxLife, this._currentHealth = this._maxWidth * this._currentHealthPercentage;
            this._lastHealth = this.LifeController.Health;

            if (this._currentHealthPercentage <= HealthMonitor.BadThreshold) {
                this._miniHealthBarColor = GAME_GLOBALS.Colors.ShipBad;
            } else if (this._currentHealthPercentage <= HealthMonitor.HurtThreshold) {
                this._miniHealthBarColor = GAME_GLOBALS.Colors.ShipHurt;
            } else {
                this._miniHealthBarColor = GAME_GLOBALS.Colors.ShipGood;
            }
        }

        CanvasContext.drawRectangle(this.MovementController.Position.X + this._xOffset, this.MovementController.Position.Y + this.HEIGHT + 15, this._maxWidth, 5, "#7F767D");
        CanvasContext.drawRectangle(this.MovementController.Position.X + this._xOffset, this.MovementController.Position.Y + this.HEIGHT + 15, this._currentHealth, 5, this._miniHealthBarColor);
    };

    Ship.prototype.DrawName = function (healthOffset) {
        CanvasContext.drawText(this.Name, this.MovementController.Position.X + Ship.HALF_WIDTH, this.MovementController.Position.Y + this.HEIGHT + 30 + healthOffset);
    };
    return Ship;
})(Collidable);
//# sourceMappingURL=Ship.js.map
