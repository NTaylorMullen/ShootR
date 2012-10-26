function PowerupManager() {
    var that = this;

    that.Powerups = {};

    that.UpdatePowerups = function (powerupList, gameTime) {
        var powerupsCount = powerupList.length;

        for (var i = 0; i < powerupsCount; i++) {
            var currentPowerup = powerupList[i],
                id = currentPowerup.ID;

            // If bullet exists then we need to move it, aka update it.
            if (that.Powerups[id]) {
                that.Powerups[id].UpdateProperties(currentPowerup);
            }
            else {
                if (currentPowerup.Type === 1) {
                    that.Powerups[id] = new HealthPack(currentPowerup);
                }
            }

            // Ensure that the bullet has not yet been disposed
            if (that.Powerups[id].Disposed) {
                that.Powerups[id].Destroy();
                delete that.Powerups[id];
            }
            else {
                that.Powerups[id].Update(gameTime);
                that.Powerups[id].Draw();
            }
        }        
    }

    that.Update = function (gameTime) {
        for (var key in that.Powerups) {
            // Ensure that the Ship is in view
            if (CanvasContext.Camera.InView(that.Powerups[key]) && !that.Powerups[key].Disposed) {
                that.Powerups[key].Update(gameTime);
                that.Powerups[key].Draw();
            }
            else { // Bullet is not in view
                that.Powerups[key].Destroy();
                delete that.Powerups[key];
            }
        }
    }
}