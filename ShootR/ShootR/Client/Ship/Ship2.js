function Ship(properties) {
    Collidable.call(this);
    var that = this;

    that.AnimationHandler = new ShipAnimationHandler(that);
    that.MovementController = new ShipMovementController(new Vector2());

    that.Vehicle = IMAGE_ASSETS.Ship1;

    that.Destroy = function () {
        // Ship has died
        if (!that.LifeController.Alive) {
            // We want to explode
            GAME_GLOBALS.AnimationManager.Add(new spritify({
                image: IMAGE_ASSETS.BigExplosion,
                centerOn: { X: that.MovementController.Position.X + that.HALF_WIDTH, Y: that.MovementController.Position.Y + that.HALF_HEIGHT },
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
                Rotation: that.MovementController.Rotation
            }));
        }

        that.Visible = false;
    }    

    that.Update = function (gameTime) {
        var PercentOfSecond = CalculatePOS(that.LastUpdated);
        that.UpdateFromSecond(PercentOfSecond);
    }

    that.UpdateFromSecond = function (PercentOfSecond) {
        var now = new Date();
        
        that.MovementController.Update(PercentOfSecond, now);
        that.AnimationHandler.Update(now);
        that.AnimationHandler.DrawDamage();
        that.ShipAbilityHandler.Update(now);        
        that.LastUpdated = now;
    }

    // Declaring these outside so we can reduce calculations
    var maxWidth = that.WIDTH * .8,
        xOffset = (that.WIDTH - maxWidth) * .5,
        currentHealth,
        lastHealth,
        currentHealthPercentage,
        miniHealthBarColor;

    that.DrawHealthBar = function () {
        if (lastHealth !== that.LifeController.Health) {
            currentHealthPercentage = that.LifeController.Health / that.MaxLife,
            currentHealth = maxWidth * currentHealthPercentage;
            lastHealth = that.LifeController.Health;

            if (currentHealthPercentage <= HealthMonitor.prototype.BadThreshold) {
                miniHealthBarColor = GAME_GLOBALS.Colors.ShipBad;
            }
            else if (currentHealthPercentage <= HealthMonitor.prototype.HurtThreshold) {
                miniHealthBarColor = GAME_GLOBALS.Colors.ShipHurt;
            }
            else {
                miniHealthBarColor = GAME_GLOBALS.Colors.ShipGood;
            }
        }

        CanvasContext.drawRectangle(that.MovementController.Position.X + xOffset, that.MovementController.Position.Y + that.HEIGHT + 15, maxWidth, 5, "#7F767D");
        CanvasContext.drawRectangle(that.MovementController.Position.X + xOffset, that.MovementController.Position.Y + that.HEIGHT + 15, currentHealth, 5, miniHealthBarColor);
    }

    that.DrawName = function (healthOffset) {
        CanvasContext.drawText(that.Name, that.MovementController.Position.X + that.HALF_WIDTH, that.MovementController.Position.Y + that.HEIGHT + 30 + healthOffset);
    }

    that.DrawBoundary = function () {
        CanvasContext.strokeSquare(that.MovementController.Position.X, that.MovementController.Position.Y, that.WIDTH, that.HEIGHT);
    }

    that.UpdateProperties(properties);

    that.ShipAbilityHandler = new ShipAbilityHandler(this);
}

Ship.prototype = new Collidable();