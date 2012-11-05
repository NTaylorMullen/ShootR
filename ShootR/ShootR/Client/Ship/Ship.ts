/// <reference path="../Collidable/Collidable.ts" />
/// <reference path="ShipAnimationHandler.js" />
/// <reference path="ShipMovementController.js" />
/// <reference path="../Abilities/AbilityHandlers/ShipAbilityHandler.ts" />
/// <reference path="../Utilities/GameTime.ts" />
/// <reference path="../GameGlobals.ts" />
/// <reference path="../Managers/spritify.ts" />

declare var IMAGE_ASSETS, HealthMonitor;

class Ship extends Collidable {
    static WIDTH: number = 0;
    static HEIGHT: number = 0;
    static HALF_WIDTH: number = 0;
    static HALF_HEIGHT: number = 0;    
    public Name: string = "";
    public MaxLife: number = 0;
    public AnimationHandler: any;
    public ShipAbilityHandler: ShipAbilityHandler;

    private _maxWidth: number;
    private _xOffset: number;
    private _currentHealth: number;
    private _lastHealth: number;
    private _currentHealthPercentage: number;
    private _miniHealthBarColor: string;

    constructor (properties: any) {
        super();        
        this.MovementController = new ShipMovementController(Vector2.Zero());        

        this.UpdateProperties(properties);

        this.WIDTH = Ship.WIDTH;
        this.HEIGHT = Ship.HEIGHT;
        this._maxWidth = this.WIDTH * .8;
        this._xOffset = (this.WIDTH - this._maxWidth) * .5;

        this.AnimationHandler = new ShipAnimationHandler(this);
        this.ShipAbilityHandler = new ShipAbilityHandler(this);
    }

    public Destroy(): void {
        // Ship has died
        if (!this.LifeController.Alive) {
            // We want to explode
            GAME_GLOBALS.AnimationManager.Add(new spritify({
                image: IMAGE_ASSETS.BigExplosion,
                centerOn: { X: this.MovementController.Position.X + Ship.HALF_WIDTH, Y: this.MovementController.Position.Y + Ship.HALF_HEIGHT },
                frameCount: 30,
                fps: 25,
                spriteSheetSize: {
                    width: 768,
                    height: 640
                },
                frameSize: {
                    width: 128,
                    height: 128,
                },
                Rotation: this.MovementController.Rotation
            }));
        }

        this.Visible = false;
    }

    public Update (gameTime): void {
        var PercentOfSecond = CalculatePOS(this.LastUpdated);
        this.UpdateFromSecond(PercentOfSecond);
    }

    public UpdateFromSecond (PercentOfSecond: number): void {
        var now = new Date();
        
        this.MovementController.Update(PercentOfSecond, now);
        this.AnimationHandler.Update(now);
        this.AnimationHandler.DrawDamage();
        this.ShipAbilityHandler.Update(now);        
        this.LastUpdated = now;
    }

    public DrawHealthBar(): void {
        if (this._lastHealth !== this.LifeController.Health) {
            this._currentHealthPercentage = this.LifeController.Health / this.MaxLife,
            this._currentHealth = this._maxWidth * this._currentHealthPercentage;
            this._lastHealth = this.LifeController.Health;

            if (this._currentHealthPercentage <= HealthMonitor.prototype.BadThreshold) {
                this._miniHealthBarColor = GAME_GLOBALS.Colors.ShipBad;
            }
            else if (this._currentHealthPercentage <= HealthMonitor.prototype.HurtThreshold) {
                this._miniHealthBarColor = GAME_GLOBALS.Colors.ShipHurt;
            }
            else {
                this._miniHealthBarColor = GAME_GLOBALS.Colors.ShipGood;
            }
        }

        CanvasContext.drawRectangle(this.MovementController.Position.X + this._xOffset, this.MovementController.Position.Y + this.HEIGHT + 15, this._maxWidth, 5, "#7F767D");
        CanvasContext.drawRectangle(this.MovementController.Position.X + this._xOffset, this.MovementController.Position.Y + this.HEIGHT + 15, this._currentHealth, 5, this._miniHealthBarColor);
    }

    public DrawName (healthOffset: number): void {
        CanvasContext.drawText(this.Name, this.MovementController.Position.X + Ship.HALF_WIDTH, this.MovementController.Position.Y + this.HEIGHT + 30 + healthOffset);
    }
}