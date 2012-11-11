/// <reference path="../Powerups/HealthPack.ts" />
/// <reference path="../Utilities/GameTime.ts" />

class PowerupManager {
    public Powerups: { [s: any]: Powerup; };

    constructor () {
        this.Powerups = {};
    }

    public UpdatePowerups (powerupList: IPowerupData[], gameTime: GameTime): void {
        var powerupsCount = powerupList.length;

        for (var i = 0; i < powerupsCount; i++) {
            var currentPowerup: any = powerupList[i],
                id: number = currentPowerup.ID;

            var movementController = currentPowerup.MovementController;

            delete currentPowerup.MovementController;

            // If bullet exists then we need to move it, aka update it.
            if (this.Powerups[id]) {
                this.Powerups[id].UpdateProperties(currentPowerup);
            }
            else {
                if (currentPowerup.Type === 1) {
                    this.Powerups[id] = new HealthPack(currentPowerup, movementController.Position);
                }
            }

            this.Powerups[id].MovementController.UpdateMovementController(movementController);

            // Ensure that the bullet has not yet been disposed
            if (this.Powerups[id].Disposed) {
                this.Powerups[id].Destroy();
                delete this.Powerups[id];
            }
            else {
                this.Powerups[id].Update(gameTime);
            }
        }        
    }

    public Update(gameTime: GameTime): void {
        for (var key in this.Powerups) {
            // Ensure that the Ship is in view
            if (CanvasContext.Camera.InView(this.Powerups[key]) && !this.Powerups[key].Disposed) {
                this.Powerups[key].Update(gameTime);
                this.Powerups[key].Draw();
            }
            else { // Bullet is not in view
                this.Powerups[key].Destroy();
                delete this.Powerups[key];
            }
        }
    }
}